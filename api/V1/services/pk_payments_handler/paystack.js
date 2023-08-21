

const paystack = (request) => {

    const MySecretKey = process.env.paystack_key;

    //replace the secret key with that from your paystack account
    const initializePayment = (form, mycallback) => {
        const options = {
            url : 'https://api.paystack.co/transaction/initialize',
            headers : {
                authorization: MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            },
            form
        }
        const callback = (error, response, body) => {
            return mycallback(error, body)
        }
        request.post(options, callback)
    }

    const verifyPayment = (ref, mycallback) => {
        const options = {
            url : 'https://api.paystack.co/transaction/verify/'+encodeURIComponent(ref),
            headers : {
                authorization: MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'    
            }
        }
        const callback = (error, response, body) => {
            return mycallback(error, body)
        }
        request(options, callback)
    }


    const fetchPayment = (pid, mycallback) => {
        const options = {
            url : 'https://api.paystack.co/transaction/'+pid,
            headers : {
                authorization: MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'    
            }
        }
        const callback = (error, response, body) => {
            return mycallback(error, body)
        }
        request(options, callback)
    }


        // To make transfer, steps are: verify account number, Create recipient, 
        // then, Initiate transfer, and finally listen for transfer status.

// VERIFY RECIPIENT ACCOUNT DETAILS
    const verifyAccount = (account_number, bank_code, mycallback) => {
        var acnum = account_number;
        var bcode = bank_code;
        const msg = "There was a probilem with Your Account details";
        
            const options = {
                url : 'https://api.paystack.co/bank/resolve?account_number=' + acnum + '&bank_code=' + bcode,
                headers : {
                    authorization: MySecretKey,
                    'content-type': 'application/json',
                    'cache-control': 'no-cache'    
                }
            }
            const callback = (error, response, body) => {
                return mycallback(error, body)
            }
            request(options, callback)
        }



// CREATE TRANSFER RECIPIENT
const createRecipient = (form, mycallback) => {
    const options = {
        url : 'https://api.paystack.co/transferrecipient',
        headers : {
            authorization: MySecretKey,
            'content-type': 'application/json',
            'cache-control': 'no-cache'    
        },
        form
    }
    const callback = (error, response, body) => {
        return mycallback(error, body)
    }
    request.post(options, callback)
}


// VERIFY RECIPIENT BVN
const verifybvn = (form, mycallback) => {
    const options = {
        url : 'https://api.paystack.co/bvn/match',
        headers : {
            authorization: MySecretKey,
            'content-type': 'application/json',
            'cache-control': 'no-cache'    
        },
        form
    }
    const callback = (error, response, body) => {
        return mycallback(error, body)
    }
    request.post(options, callback)
}


const initializePayout = (form, mycallback) => {
    const options = {
        url : 'https://api.paystack.co/transfer',
        headers : {
            authorization: MySecretKey,
            'content-type': 'application/json',
            'cache-control': 'no-cache'    
        },
        form
    }
    const callback = (error, response, body) => {
        return mycallback(error, body)
    }
    request.post(options, callback)
}



    return {initializePayment, fetchPayment, verifyPayment, verifyAccount, createRecipient, initializePayout, verifybvn};
}
module.exports = paystack;