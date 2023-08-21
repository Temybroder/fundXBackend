
/**
 * @param TO-do  Write an Algorithm to determine if the request will be processed or not
 * ALGORITHM NAME -- processRequestApproval
 */

// processRequestApproval should use factors including 
// what time the request is made, 
// what the delivery location is (based on index from geo-characterization)
// in-app-activity index, 
// user's security clearance, to calculate 
// and return a boolean determining whether the request should be processed or not

// ALL RATING SCALES ARE BETWEEN 1 and 10
// 7 to 10 are healthy to very healthy, 
// 4 to 6 are approaching health (5) to averagely healthy, 
// 1 to 3 are terrible to not healthy

// Required Benchmark for approving any request is 7
// Required Benchmark for considering any request is 6
// If any index in a request is less than 4, decline the request immediately


   // If time is between 8am and 5pm, assign a timeIndex between 9 and 10
   // If time is between 7am and 8am, assign a timeIndex of 7
   // If time is between 5pm and 6pm, assign a timeIndex of 7
   // If time is between 6pm and 7pm, assign a timeIndex of 6

   // Formula for calculating Boolean is 
   const processRequestApproval = (decisionParams) => {
    // actual call on algorithm to handle request
    // first split decisionParams into array of strings of individual params
    
    // if any one of the resulting array's strings is less than 6, return false
    // ${userClearIndex}.${inAppIndex}.${delLocClearIndex}.${timeIndex}
    const checkParamBoundary = (paramsArray) => {
       if (Number(paramsArray[0]) < 6 || Number(paramsArray[1]) < 6 || Number(paramsArray[2]) < 6 || Number(paramsArray[3]) < 6 ){
           return false;
           } else {
               return true;
           }
  
        }

    const resolveDecision = (paramsArray) => {
    if (checkParamBoundary(paramsArray)){
        const indexSum = paramsArray.reduce((acc, cur) => {
            return acc + cur;
        }, 0)
        if(indexSum() >= 24){
            return true;
        } else {
            return false;
           }
        } else {
         return false;
        }
    }
    resolveDecision()
   }

module.exports = processRequestApproval;