// Note the "../" here too
const userRoutes = require('../routes/user.routes');
const userService = require('../service/user.service');
const userController = require('../interface/user.controller');

module.exports = {
    routes: userRoutes,
    service: userService,
    controller: userController
};