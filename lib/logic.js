
/**
 * Function that will place the order
 * @param {org.example.dbt.StoreOTP} tx  
 * @transaction 
 */

 async function StoreOTP(tx){
     const participantRegistery =   await getParticipantRegistry('org.example.dbt.Beneficiary');
     const user = await participantRegistery.get(tx.beneficiaryAadhaarNo);
     if(user){
        if(user.firstOTP){
            user.firstOTP.push(tx.OTP);
        }
        else{
            user.firstOTP = [tx.OTP];
        }
        await participantRegistery.update(user);
     }
     else{
         throw new Error("No Such User!");
     }
}


/**
 * Function that will place the order
 * @param {org.example.dbt.VerifyOTP} tx  
 * @transaction 
 */

async function VerifyOTP(tx){
    const participantRegistery =   await getParticipantRegistry('org.example.dbt.Beneficiary');
    const user = await participantRegistery.get(tx.beneficiaryAadhaarNo);
    if(user.firstOTP){
        const otp = user.firstOTP[user.firstOTP.length - 1];
        if(otp === tx.OTP){
            user.orderStatus = 'ACCEPTED';
            await participantRegistery.update(user);

        }
        else{
            user.orderStatus = 'REJECTED';
            throw new Error("Wrong OTP");
        }
    }
    else{
        throw new Error("First OTP wasn't sent.");
    }
}




/**
 * Function that will place the order
 * @param {org.example.dbt.PlaceOrder} tx  
 * @transaction 
 */
async function placeOrder(tx) {
    const aadhar = tx.beneficiaryAadhaarNo;

    const participantRegistery =   await getParticipantRegistry('org.example.dbt.Beneficiary');
    const user = await participantRegistery.get(aadhar);
    let to = new Date();
    let  from = user.lastSubsidyClaim;
    var months = to.getMonth() - from.getMonth() + (12 * (to.getFullYear() - from.getFullYear()));

    if(to.getDate() < from.getDate()){
        months--;
    }
    let currDate = new Date();
   
    const entitlement = user.subsidyEntitlement;
    if (months <= 0 || entitlement <= 0) {
        throw new Error("Subsidy expired!, Please try again after few days");
    }

    let factory = getFactory();
    let r = Math.random().toString(36).substring(10);
    let subsidyRegistry = await getAssetRegistry('org.example.dbt.LPGCylinder');
    let cylinder = factory.newResource('org.example.dbt', 'LPGCylinder', r);
    cylinder.beneficiaryAadhaarNo  = tx.beneficiaryAadhaarNo;
    cylinder.lpgCylinderUid = r;
    const gasAgencyRegistery = await getParticipantRegistry('org.example.dbt.GasAgency');
    const gasAgency = await gasAgencyRegistery.get(tx.gasAgencyRegistrationId);

    const obj = {
        aadhar,
        currDate
    }
    const data = JSON.stringify(obj);
    console.log('place order data: ' + data);
    if(gasAgency.gasAgencyOrdersPlaced){
        gasAgency.gasAgencyOrdersPlaced.push(data);
    }
    else{
        gasAgency.gasAgencyOrdersPlaced=[data];
    }
    user.lastSubsidyClaim  = currDate;
    if(user.beneficiaryOrderHistory){
        user.beneficiaryOrderHistory.push(currDate);
    }    
    else{
        user.beneficiaryOrderHistory = [currDate];
    }
    await subsidyRegistry.add(cylinder);
    await participantRegistery.update(user);
    await gasAgencyRegistery.update(gasAgency);
}

/**
 * Function which calculates token and stores in blockchain
 * @param {org.example.dbt.CalculateToken} tx  
 * @transaction 
 */

 async function CalculateToken(tx){
    const aadhar = tx.beneficiaryAadhaarNo;
    const participantRegistery =  await getParticipantRegistry('org.example.dbt.Beneficiary');
    const user = await participantRegistery.get(aadhar); 
    if(user.hashArray){
        user.hashArray.push(tx.tokenHash);
    }
    else{
        user.hashArray = [tx.tokenHash];

    }
    await participantRegistery.update(user);   
}

/**
 * Function which verifies if user is eligible for Subsidy
 * @param {org.example.dbt.VerifyToken} tx  
 * @transaction 
 */

 
 async function VerifyToken(tx){
    const aadhar = tx.beneficiaryAadhaarNo;
    const participantRegistery =  await getParticipantRegistry('org.example.dbt.Beneficiary');
    const user = await participantRegistery.get(aadhar); 
    if(!user.hashArray){
        throw new Error("Not a subsidised user.");
    }
    const lastHash = user.hashArray[user.hashArray.length-1];
    let message = aadhar + '$' + tx.OTP;
    let  genHash = sha256(message);
    const gasAgencyRegistery =  await getParticipantRegistry('org.example.dbt.GasAgency');
    const gasAgency = await gasAgencyRegistery.get(tx.gasAgencyRegistrationId);
    let to = new Date();
    let  from = user.lastSubsidyClaim;
    var months = to.getMonth() - from.getMonth() + (12 * (to.getFullYear() - from.getFullYear()));

    if(to.getDate() < from.getDate()){
        months--;
    }
    if(months <= 0 ){
        throw new Error("Try after a month!");
    }
    if(genHash === lastHash){
        user.subsidyEntitlement = user.subsidyEntitlement - 1;
        gasAgency.gasAgencyDeficitIncurred += tx.marketPrice - (tx.marketPrice*tx.subsidyRate);
        if(gasAgency.gasAgencyOrdersServed){
            gasAgency.gasAgencyOrdersServed.push(aadhar);
        }
        else{
            gasAgency.gasAgencyOrdersServed=[aadhar];
        }
        gasAgency.gasAgencyInventory = gasAgency.gasAgencyInventory - 1;
        user.firstOTP =  [];
        await gasAgencyRegistery.update(gasAgency);
        await participantRegistery.update(user);
    }
    else{
        throw new Error("LPG Cannot be provided.");
    }
 }

 /**
 * Function which verifies if user is eligible for Subsidy
 * @param {org.example.dbt.NotifyGovAuthority} tx  
 * @transaction 
 */

 async function NotifyGovAuthority(tx){
     let time = tx.orderPlaced;
     let aadhar = tx.beneficiaryAadhaarNo;
     let id = tx.gasAgencyRegistrationId;
     const obj = {
         time,
         aadhar,
         id 
     }
     const data = JSON.stringify(obj);
     console.log('notify gov auth' + data);
     const govAuthRegistery =  await getParticipantRegistry('org.example.dbt.GovAuthority');
     const govAuth  = await govAuthRegistery.get(tx.govAuthorityId);
     if(govAuth.govAuthorityOrdersPlaced){
         govAuth.govAuthorityOrdersPlaced.push(data);
     }
     else{
         govAuth.govAuthorityOrdersPlaced = [data];
     }
     await govAuthRegistery.update(govAuth);
 }


/**
 * Function which verifies if user is eligible for Subsidy
 * @param {org.example.dbt.RelaseFunds} tx  
 * @transaction 
 */

 async function RelaseFunds(tx){
     let factory = getFactory();
     let subsidyRegistry = await getAssetRegistry('org.example.dbt.SubsidyAmount');
     let r = Math.random().toString(36).substring(10);
     let subsidy = factory.newResource('org.example.dbt', 'SubsidyAmount', r);
     const gasAgencyRegistery =  await getParticipantRegistry('org.example.dbt.GasAgency');
     const gasAgency = await gasAgencyRegistery.get(tx.gasAgencyRegistrationId);
     subsidy.subsidyAmount = gasAgency.gasAgencyDeficitIncurred;
     gasAgency.gasAgencyDeficitIncurred = 0.0;
     
     subsidy.subsidyId = r;
     subsidy.gasAgencyRegistrationId = gasAgency.gasAgencyRegistrationId;
     subsidy.issuedAt = new Date();
     subsidy.payedBy = tx.govAuthorityTitle;
     subsidy.payedTo = tx.gasAgencyRegistrationId;
     await subsidyRegistry.add(subsidy);
 }

 /**
 * Function which verifies if user is eligible for Subsidy
 * @param {org.example.dbt.RequestFunds} tx  
 * @transaction     
 */

 async function RequestFunds(tx){
    const gasAgencyRegistery =  await getParticipantRegistry('org.example.dbt.GasAgency');
    const gasAgency = await gasAgencyRegistery.get(tx.gasAgencyRegistrationId);
    let dt2 = new Date();
    let dt1 = gasAgency.gasAgencyLastPaid;
    dt1 = gasAgency.gasAgencyLastPaid;
    dt2 = new Date();
    let days = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    if(days>=7){
        gasAgency.gasAgencyLastPaid = dt2;
        gasAgencyRegistery.update(gasAgency);
    }
    else{
        throw new Error("Claim Money after some time");
    }
}
 


 // sha256 function to calculate hash of OTP + Aadhar Number

 function sha256(ascii) {
	function rightRotate(value, amount) {
		return (value>>>amount) | (value<<(32 - amount));
	};
	
	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length'
	var i, j;
	var result = ''

	var words = [];
	var asciiBitLength = ascii[lengthProperty]*8;
	
	
	var hash = sha256.h = sha256.h || [];
	var k = sha256.k = sha256.k || [];
	var primeCounter = k[lengthProperty];


	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
			k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
		}
	}
	
	ascii += '\x80' 
	while (ascii[lengthProperty]%64 - 56) ascii += '\x00' 
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j>>8) return; 
		words[i>>2] |= j << ((3 - i)%4)*8;
	}
	words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
	words[words[lengthProperty]] = (asciiBitLength)
	
	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16); 
		var oldHash = hash;

		hash = hash.slice(0, 8);
		
		for (i = 0; i < 64; i++) {
			var i2 = i + j;

			var w15 = w[i - 15], w2 = w[i - 2];

			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
				+ ((e&hash[5])^((~e)&hash[6])) // ch
				+ k[i]
				+ (w[i] = (i < 16) ? w[i] : (
						w[i - 16]
						+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
						+ w[i - 7]
						+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
					)|0
				);
			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
				+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
			
            hash = [(temp1 + temp2)|0].concat(hash); 
            hash[4] = (hash[4] + temp1)|0;
		}
		
		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i])|0;
		}
	}
	
	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i]>>(j*8))&255;
			result += ((b < 16) ? 0 : '') + b.toString(16);
		}
	}
	return result;
}

function validateOTP(){

}