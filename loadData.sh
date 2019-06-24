curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.example.dbt.Beneficiary",  
   "aadhaarNo": "123456789112",  
   "beneficiaryPhoneNumber": "8850949073",  
   "beneficiaryState": "Maharashtra",  
   "beneficiaryDistrict": "Panvel",  
   "beneficiaryLocation": "Panvel",  
   "beneficiaryPincode": "400608",  
   "beneficiaryFirstName": "S",  
   "beneficiaryLastName": "P",  
   "beneficiaryAddress": "A,12",  
   "subsidyEntitlement": "12",  
   "lastSubsidyClaim": "2019-03-21T08:21:48.150Z",  
   "beneficiaryOrderHistory": [],  
   "firstOTP": [],  
   "hashArray": [],  
   "orderStatus": "string"  
 }' 'http://localhost:3000/api/Beneficiary'
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.example.dbt.GasAgency",  
   "gasAgencyRegistrationId": "123456789112",  
   "gasAgencyPassword":"AzainIsDyatlov"
   "gasAgencyOwner": "A",  
   "gasAgencyState": "J",  
   "gasAgencyDistrict": "Panvel",  
   "gasAgencyLocation": "Panvel",  
   "gasAgencyPincode": "400608",  
   "gasAgencyPhoneNumber": "8879113063",  
   "gasAgencyAccountNumber": "1234567890",  
   "gasAgencyDeficitIncurred": "0.0",  
   "gasAgencyLastPaid": "2019-05-21T08:21:48.226Z",  
   "gasAgencyInventory": "50000",  
   "gasAgencyOrdersPlaced": [],  
   "gasAgencyOrdersServed": []  
 }' 'http://localhost:3000/api/GasAgency'
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.example.dbt.GovAuthority",  
   "govAuthorityId": "123456789112",  
   "govAuthorityTitle": "Ministry of Oil and Natural Gas", 
   "govAuhtorityPassword": "suckMyBalls", 
   "govAuthorityJurisdicition": "National",  
   "govAuhtorityDomain": ["LPG"],  
   "govAuthorityOrdersPlaced": []  
 }' 'http://localhost:3000/api/GovAuthority'
