const timeStringToSeconds = (timeString: string) => {
    const regex = /^(\d+)([dhms])$/;
    const match = timeString.match(regex);

    if (!match) {
        throw new Error(
            `Invalid time format: ${timeString}. Expected format like '30d', '1h', '15m', '30s'`,
        );
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
        case 'd':
            return value * 24 * 60 * 60; // days to seconds
        case 'h':
            return value * 60 * 60; // hours to seconds
        case 'm':
            return value * 60; // minutes to seconds
        case 's':
            return value; // seconds
        default:
            return value;
    }
};

export default timeStringToSeconds;
