



/**
 * Function that will place the order
 * @param {org.example.dbt.PlaceOrder} tx  
 * @transaction 
 */
async function placeOrder(tx) {
    const aadhar = tx.beneficiaryAadhaarNo;
    const entity = tx.subsidyEntitlement;
    let to = new Date();
    let  from = tx.lastSubsidyClaim;
    var months = to.getMonth() - from.getMonth() + (12 * (to.getFullYear() - from.getFullYear()));

    if(to.getDate() < from.getDate()){
        months--;
    }
    let currDate = new Date();
    const participantRegistery =    await getParticipantRegistry('org.example.dbt.Beneficiary');
    const user = await participantRegistery.get(aadhar);
    if (months <= 0 || entity <= 0) {
        throw new Error("Subsidy expired!, Please try again after few days");
    }
   // let gasAgencyOrdersPlaced = tx.gasAgencyOrdersPlaced;
    const obj = {
        aadhar,
        currDate
    }
    const data = JSON.stringify(obj);
    //if(tx.gasAgencyOrdersPlaced){
     //   tx.gasAgencyOrdersPlaced.push(data);
   // }
   // else{
    //    tx.gasAgencyOrdersPlaced = [data];
   // }
    user.lastSubsidyClaim  = currDate;
    if(user.beneficiaryOrderHistory){
        user.beneficiaryOrderHistory.push(currDate);
    }    
    else{
        user.beneficiaryOrderHistory = [currDate];
    }
    // const participantRegistery =  await getParticipantRegistry('org.example.dbt.Beneficiary');
    await participantRegistery.update(user);
}

/**
 * Function that will place the order
 * @param {org.example.dbt.CalculateToken} tx  
 * @transaction 
 */

 async function CalculateToken(tx){
    const aadhar = tx.beneficiaryAadhaarNo;
    const participantRegistery =  await getParticipantRegistry('org.example.dbt.Beneficiary');
    const user = await participantRegistery.get(aadhar); 
    if(user.hashArray){
        user.hashArray = [tx.tokenHash];
    }
    else{
        user.hashArray.push(tx.tokenHash);
    }
    await participantRegistery.update(user);   
}

