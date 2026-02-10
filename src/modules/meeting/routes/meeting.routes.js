const express = require('express');
const router = express.Router();
const meetingController = require('../interface/meeting.controller');

// Define the routes
router.post('/', meetingController.createMeeting);        // Create Meeting
router.get('/', meetingController.getAllMeetings);        // List All Meetings

router.get('/:id', meetingController.getMeeting);         // Get Single Meeting

router.put('/:id', meetingController.updateMeeting);      // Update Meeting
router.delete('/:id', meetingController.deleteMeeting);   // Delete Meeting

module.exports = router;