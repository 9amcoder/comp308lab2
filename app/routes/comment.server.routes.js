var comments = require('../../app/controllers/comments.server.controller'),
    passport = require('passport');

    module.exports = function (app) {
        app.route('/comments')
            .get(comments.commentsByStudent);
        //     .post(users.signup);
        
        //     app.route('/signin')
        //     .get(users.renderSignin)
        //     .post(passport.authenticate('local', {
        //         successRedirect: '/',
        //         failureRedirect: '/signin',
        //         failureFlash: true
        //     }));
        // app.get('/signout', users.signout);
    };