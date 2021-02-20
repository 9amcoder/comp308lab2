// Load the module dependencies
const User = require('mongoose').model('User');
const Comment = require('mongoose').model('Comment');
const passport = require('passport');


exports.commentsByStudent = function (req, res, next) {
    var email = req.session.email;
    //find the student then its comments using Promise mechanism of Mongoose
    User.findOne({ email: email }, (err, user) => {
            if (err) { return getErrorMessage(err); }
            //
            req.id = user._id;
            console.log(req.id);
        }).then(function () {
            //find the posts from this author
            Comment.
                find({
                    user: req.id
                }, (err, comments) => {
                    if (err) { return getErrorMessage(err); }
                    //res.json(comments);
                    res.render('comments', {
                        title: "Comments by student",
                        comments: comments, 
                        email: email
                    });
                });
        });
};
