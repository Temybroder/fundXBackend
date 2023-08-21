##   JOTTER/ NOTES FILE FOR API

Tasks
Authentication
Authorization
Withdraw (in-mobile-app)
Deposit (in-mobile-app)
Search for Near-By Drivers (in-mobile-app)  
Admin 
Agent Transactions 
Transaction Accounting (Computation) (in-mobile-app ==> Fed through API)
Transaction Processing is handled in-mobile-app
However, Verifying Account details is done through API

DIFFERENT OBJECT TYPES WE ARE DEALING WITH IN-APP:
earnings
fundingOrder
funderActivity
userActivity
funder
user

When User needs one service (e.g withdrawal);
1. He selects service
2. FundingOrder is created
3. His location is taken,
4. Server searches for Funders that can fulfill this fundingOrder
5. Server saves the data (location, socket, & other params) of nearby funders
6. FundingOrder is broadcasted to every funder in subsequence
7. If one funder rejects, the order is updated and sent to the next Funder
8.


 
Characterizing certain areas in states of countries based on how secure they are:
On a 1 to 5 scale

We noticed you are now very close to your Customer.
Ensure the following precautions:
I => Do not carry out an Exchange Transaction for an amount higher than you requested in the app. 
II => Do not carry out the Exchange Transaction in a dark place, but in a lighted place 
III => Do not carry out the Exchange Transaction in an isolated place 
IV => If the place your customer is located looks suspicious, please click here to cancel the transaction

CONSIDERATIONS

**SYSTEM SECURITY
**DATA SECURITY
SPEED
STABILITY
FAULT TOLERANCE
SCALABILITY