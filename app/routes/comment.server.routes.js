const comments = require('../controllers/comment.server.controller'),
    passport = require('passport');

module.exports = function (app) {
        app.route('/submit_comment')
            .get(comments.renderSubmitComment)
            .post(comments.saveComment);
        app.route('/thankyou')
            .get(comments.renderTankyou);
        app.route('/comments:id')
             .get(comments.commentsByStudent);
        //     .post(passport.authenticate('local', {
        //         successRedirect: '/',
        //         failureRedirect: '/signin',
        //         failureFlash: true
        //     }));
        // app.get('/signout', users.signout);
    
        // app.get('/students',users.display);
    
    };