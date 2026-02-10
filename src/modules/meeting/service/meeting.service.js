const Meeting = require('../model/meeting.model');
const { Op } = require('sequelize');

// 1. Check for Conflicts (Internal Helper)
const checkConflict = async (startTime, endTime, excludeId = null) => {
  const whereClause = {
    [Op.or]: [
      {
        startTime: { [Op.lt]: endTime }, // Existing Start < New End
        endTime: { [Op.gt]: startTime }, // Existing End > New Start
      },
    ],
  };

  // If we are updating, ignore the meeting's own ID
  if (excludeId) {
    whereClause.id = { [Op.ne]: excludeId };
  }

  const conflict = await Meeting.findOne({
    where: whereClause,
  });
  return conflict;
};

// 2. Create Meeting
const createMeeting = async (data) => {
  const { userId, title, startTime, endTime } = data;

  if (new Date(startTime) >= new Date(endTime)) {
    throw new Error('Start time must be before end time');
  }

  const conflict = await checkConflict(startTime, endTime);
  if (conflict) {
    throw new Error('Time slot already booked');
  }

  return await Meeting.create({ userId, title, startTime, endTime });
};

// 3. Update Meeting
const updateMeeting = async (id, data) => {
  const { startTime, endTime } = data;
  const meeting = await Meeting.findByPk(id);

  if (!meeting) throw new Error('Meeting not found');

  // If time is changing, check for conflicts
  if (startTime && endTime) {
    if (new Date(startTime) >= new Date(endTime)) {
      throw new Error('Start time must be before end time');
    }
    const conflict = await checkConflict(startTime, endTime, id);
    if (conflict) {
      throw new Error('Time slot already booked');
    }
  }

  return await meeting.update(data);
};

// 4. Delete Meeting
const deleteMeeting = async (id) => {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) throw new Error('Meeting not found');
  return await meeting.destroy();
};

// 5. Get Meeting By ID
const getMeetingById = async (id) => {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) throw new Error('Meeting not found');
  return meeting;
};

// 6. Get All Meetings (UPDATED WITH FILTERS)
const getAllMeetings = async (filters = {}) => {
  const whereClause = {};

  // Filter by specific User
  if (filters.userId) {
    whereClause.userId = filters.userId;
  }

  // Filter by Date Range
  if (filters.startDate && filters.endDate) {
    whereClause.startTime = {
      [Op.between]: [filters.startDate, filters.endDate],
    };
  }

  return await Meeting.findAll({
    where: whereClause,
    order: [['startTime', 'ASC']], // Sorts meetings by start time
  });
};

module.exports = {
  createMeeting,
  updateMeeting,
  deleteMeeting,
  getAllMeetings,
  getMeetingById,
};