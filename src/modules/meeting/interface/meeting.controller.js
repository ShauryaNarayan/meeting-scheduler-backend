const meetingService = require('../service/meeting.service');
const { validateCreateMeeting, validateUpdateMeeting } = require('../dto/meeting.dto');

const createMeeting = async (req, res) => {
  try {
    // 1. USE DTO VALIDATION HERE
    const validationErrors = validateCreateMeeting(req.body);
    if (validationErrors) {
        return res.status(400).json({ message: "Validation Failed", errors: validationErrors });
    }

    // 2. Proceed if validation passes
    const meeting = await meetingService.createMeeting(req.body);
    res.status(201).json(meeting);
  } catch (error) {
    if (error.message === 'Time slot already booked' || error.message === 'Start time must be before end time') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

const getAllMeetings = async (req, res) => {
  try {
    const filters = {
      userId: req.query.userId,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
    };
    const meetings = await meetingService.getAllMeetings(filters);
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMeeting = async (req, res) => {
  try {
    const meeting = await meetingService.getMeetingById(req.params.id);
    res.status(200).json(meeting);
  } catch (error) {
    if (error.message === 'Meeting not found') return res.status(404).json({ message: error.message });
    res.status(500).json({ error: error.message });
  }
};

const updateMeeting = async (req, res) => {
  try {
    // 1. USE DTO VALIDATION HERE
    const validationErrors = validateUpdateMeeting(req.body);
    if (validationErrors) {
        return res.status(400).json({ message: "Validation Failed", errors: validationErrors });
    }

    const meeting = await meetingService.updateMeeting(req.params.id, req.body);
    res.status(200).json(meeting);
  } catch (error) {
    if (error.message === 'Meeting not found') return res.status(404).json({ message: error.message });
    if (error.message === 'Time slot already booked') return res.status(400).json({ message: error.message });
    res.status(500).json({ error: error.message });
  }
};

const deleteMeeting = async (req, res) => {
  try {
    await meetingService.deleteMeeting(req.params.id);
    res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    if (error.message === 'Meeting not found') return res.status(404).json({ message: error.message });
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMeeting,
  getAllMeetings,
  getMeeting,
  updateMeeting,
  deleteMeeting,
};