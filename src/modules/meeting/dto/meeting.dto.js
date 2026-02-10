const validateCreateMeeting = (data) => {
    const { userId, title, startTime, endTime } = data;
    const errors = [];

    // 1. Check for missing fields
    if (!userId) errors.push("User ID is required");
    if (!title) errors.push("Title is required");
    if (!startTime) errors.push("Start Time is required");
    if (!endTime) errors.push("End Time is required");

    // 2. Validate Data Types
    if (userId && typeof userId !== 'number') {
        errors.push("User ID must be a number");
    }

    // 3. Validate Date Logic
    if (startTime && endTime) {
        const start = new Date(startTime);
        const end = new Date(endTime);

        if (isNaN(start.getTime())) {
            errors.push("Invalid Start Time format");
        }
        if (isNaN(end.getTime())) {
            errors.push("Invalid End Time format");
        }
        if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && start >= end) {
            errors.push("Start time must be strictly before end time");
        }
    }

    // If there are errors, return them. Otherwise return null.
    return errors.length > 0 ? errors : null;
};

const validateUpdateMeeting = (data) => {
    const { startTime, endTime } = data;
    const errors = [];

    // Only validate dates if they are provided
    if (startTime && endTime) {
        const start = new Date(startTime);
        const end = new Date(endTime);

        if (isNaN(start.getTime())) errors.push("Invalid Start Time format");
        if (isNaN(end.getTime())) errors.push("Invalid End Time format");

        if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && start >= end) {
            errors.push("Start time must be strictly before end time");
        }
    }

    return errors.length > 0 ? errors : null;
};

module.exports = {
    validateCreateMeeting,
    validateUpdateMeeting
};