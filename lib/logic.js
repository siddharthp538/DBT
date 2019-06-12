/**
 * Function that will place the order
 * @param {org.example.dbt.PlaceOrder} tx  
 * @transaction 
 */
async function placeOrder(tx) {
    const aadhar = tx.beneficiaryAadhaarNo;
    const entity = tx.subsidyEntitlement;
    const gasAgencyInventory = tx.gasAgencyInventory;
    const currDate = new Date().getFullYear;
    const prevDate = tx.lastSubsidyClaim.getFullYear();
    months = (currDate.getFullYear() - prevDate.getFullYear()) * 12;
    months -= prevDate.getMonth() + 1;
    months += currDate.getMonth();
    const participantRegistery =    await getParticipantRegistry('org.example.dbt.Beneficiary');
    const user = await participantRegistery.get(aadhar);
    if (months <= 0 || entity <= 0) {
        throw new Error("Subsidy expired!, Please try again after few days");
    }
    let gasAgencyOrdersPlaced = tx.gasAgencyOrdersPlaced;
    const obj = {
        aadhar : aadhar,
        time : currDate
    }
    const data = JSON.stringify(obj);
    if(tx.gasAgencyOrdersPlaced){
        tx.gasAgencyOrdersPlaced.push(data);
    }
    else{
        tx.gasAgencyOrdersPlaced = [data];
    }
    user.lastSubsidyClaim  = currDate;
    if(user.beneficiaryOrderHistory){
        user.beneficiaryOrderHistory.push(currDate);
    }    
    else{
        user.beneficiaryOrderHistory = [currDate];
    }
    const participantRegistery =  await getParticipantRegistry('org.example.dbt.Beneficiary');
    await participantRegistery.update(user);
}
