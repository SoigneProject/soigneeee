module.exports = function (app) {

    var user_controller = require('../controllers/userController');

    app.route('/users').get(user_controller.get_all_users);
    app.route('/users').post(user_controller.create_a_user);
    app.route('/users/:username').get(user_controller.get_a_user);
};