const validateCreateUser = (data) => {
    const { name, email } = data;
    const errors = [];

    // 1. Check for missing fields
    if (!name) {
        errors.push("Name is required");
    }
    if (!email) {
        errors.push("Email is required");
    }

    // 2. Validate Data Types
    if (name && typeof name !== 'string') {
        errors.push("Name must be a string");
    }

    // 3. Simple Email Validation (Regex)
    // This checks for the pattern: characters@characters.characters
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        errors.push("Invalid email format");
    }

    // If there are errors, return them. Otherwise return null.
    return errors.length > 0 ? errors : null;
};

module.exports = {
    validateCreateUser
};