const { Schema, model, Types } = require('mongoose');

const betSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    codeBeat: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: '',
    },
    amount: {
      type: Number,
      required: true,
    },
    user: { type: Types.ObjectId, ref: 'User' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Product = model('bets', betSchema);
module.exports = Product;
