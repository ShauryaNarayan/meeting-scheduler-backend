// Note the "../" to go back up one level
const meetingRoutes = require('../routes/meeting.routes');
const meetingService = require('../service/meeting.service');
const meetingController = require('../interface/meeting.controller');

module.exports = {
    routes: meetingRoutes,
    service: meetingService,
    controller: meetingController
};