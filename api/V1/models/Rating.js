const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RatingSchema = new mongoose.Schema({
  rating: {
    type: String
  },
  comment: {
    type: String
  },
  rating_to: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'users' 
  },
  funder: { 
    type: Schema.Types.ObjectId, ref: 'funders'
  },
  fundingOrder: { 
    type: Schema.Types.ObjectId, ref: 'fundingOrders'
  },
  status: { 
    type: Number, default: 1 
  },
  rating_options:[]
});

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;