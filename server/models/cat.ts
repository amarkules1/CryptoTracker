import * as mongoose from 'mongoose';

const catSchema = new mongoose.Schema({
  coin: String,
  amount: Number,
  type: String,
  user: String,
  date: { type: Date, default: Date.now }
});

const Cat = mongoose.model('Cat', catSchema);

export default Cat;
