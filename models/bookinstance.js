const { DateTime } = require("luxon");

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated book
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
  }
);

// Virtual for bookinstance's URL
BookInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/bookinstance/' + this._id;
});

// Virtual for bookinstance's due_back_formatted
BookInstanceSchema
.virtual('due_back_formatted')
.get(function () {
  //return DateTime.fromJSDate(this.due_back).setLocale('it').toLocaleString(DateTime.DATE_SHORT);
  //var dt = DateTime.fromJSDate(this.due_back)
  //var newFormat = { day:'numeric' };
  //return dt.toLocaleString(newFormat);
  return DateTime.fromJSDate(this.due_back).toFormat('LLL dd yyyy');
});



//Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);