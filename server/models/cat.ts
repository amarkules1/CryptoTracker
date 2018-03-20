import * as mongoose from 'mongoose';

const catSchema = new mongoose.Schema({
  name: String,
  pass: String,
  site: String,
  user: String,
  show: {type : Boolean, default: false},
  showAll: {type : Boolean, default: false}
});

const Cat = mongoose.model('Cat', catSchema);

export default Cat;
