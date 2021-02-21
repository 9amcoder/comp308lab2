// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define a new CommentSchema
const CommentSchema = new Schema({
    //
    courseCode: String,
    courseName: String,
    program: String,
    semester: String,
    comment: String,
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
CommentSchema.set('toJSON', {
	getters: true,
	virtuals: true
});
//
mongoose.model('Comment', CommentSchema);