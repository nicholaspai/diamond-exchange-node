import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * @param direction "buy" or "sell"
 * @param market quote currency/base currency, for example 'BTC/CUSD' means BTC = quote currency, CUSD = base currency
 * @param price price in quote currency
 * @param amount amount of base currency
 * @param expirationDate expiration date and time of order in ISO 8601 format
 */
const orderModel = new Schema({
    market: { type: String },
    direction: { type: String },
    price: { type: Number },
    amount: { type: Number },
})
export default mongoose.model('orders', orderModel)