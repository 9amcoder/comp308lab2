// Load the module dependencies
const User = require('mongoose').model('User');
const Comment = require('mongoose').model('Comment');
const passport = require('passport');


exports.renderSubmitComment = function (req, res, next){
    if (req.user) {
		// Use the 'response' object to render the signin page
		res.render('submit_comment', {
			// Set the page title variable
			title: 'Comment Form',
            userFullName: req.user ? req.user.fullName : '',
			// Set the flash message variable
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/signin');
	}
}


exports.saveComment = function (req, res, next) {

        let newComment = Comment({
            courseCode: req.body.coursecode,
            courseName: req.body.coursename,
            program: req.body.program,
            semester: req.body.semester,
            comment: req.body.comment
        });

        Comment.create(newComment, (err, Comment) => {
            if (err) {
                console.log(err);
                return err;
            }else{
                return true;
            }
        });
        res.redirect("/thankyou");
}
    


exports.renderTankyou = function (req, res, next){
    if (req.user) {
		// Use the 'response' object to render the signin page
		res.render('thankyou', {
			// Set the page title variable
			title: 'Thank you',
            userEmail : req.user ? req.user.email : '',
			// Set the flash message variable
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/signin');
	} 
}

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
