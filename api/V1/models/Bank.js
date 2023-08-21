const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BankSchema = new mongoose.Schema({
  name: { 
    type: String 
  },
	logo: {
    type: String
  },
	account_holder: {
    type: String
  },
	account_number: {
    type: String
  },
	account_type: {
    type: String
  },
	status: { 
    type: Number, default: 1 
  },
	country_code:{
    type: String
  },
	city: {
    type: String
  }
});

const Bank = mongoose.model('Bank', BankSchema);

module.exports = Bank;