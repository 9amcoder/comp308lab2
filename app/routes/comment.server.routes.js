const comments = require('../controllers/comment.server.controller'),
    passport = require('passport');

module.exports = function (app) {
        app.route('/submit_comment')
            .get(comments.renderSubmitComment)
            .post(comments.saveComment);
        app.route('/thankyou')
            .get(comments.renderTankyou);
        
        app.route('/comments')
             .get(comments.viewAllComments)
             
        
};