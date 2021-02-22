//require mongoose
const mongoose = require("mongoose");
//create a schema
const PaymentSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  CompanyName: {
    type: String,
    required: true,
  },
  gateway: {
    type: String,
    required: true,
  },
  paymentID: {
    type: String,
    required: true,
  },
  payerID: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Completed",
  },
  lasUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("payment", PaymentSchema);
