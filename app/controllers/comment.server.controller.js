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
exports.renderComments = function (req, res, next){
    let session = req.session;
    res.render('comments', {
        title: 'Welcome to comments Page',
        error: false,
        session: session,
        error_msg: ''
    });
}


//display student by email
exports.viewAllComments = function (req, res) {
    const userSession = req.session.user;
    // Use the 'response' object to render the 'read_user' view with a 'title' property
    Comment.find({}, (err, obj) => {
      console.log(obj);
      res.render("comments", {
        title: "Read user by username",
        email: userSession?.email || "User Not Logged in.",
        comments: obj,
      });
    });
  
    // const userSession = req.session.user;
  };