
// Utility Helper for Mobile Number and Email Validation

/**
 * Validates an email address.
 * Use a regex that covers most standard email formats.
 * @param email - The email string to text.
 * @returns true if valid, false otherwise.
 */
export const isValidEmail = (email: string): boolean => {
    if (!email) return false;
    // Standard email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates a mobile number.
 * Assumes a general format or specific if needed (e.g., Sri Lankan numbers).
 * For now, we'll use a generic international format check (10-15 digits, optional +).
 * @param mobile - The mobile number string to test.
 * @returns true if valid, false otherwise.
 */
export const isValidMobile = (mobile: string): boolean => {
    if (!mobile) return false;
    // Removing spaces, dashes, parentheses for validation
    const cleanMobile = mobile.replace(/[\s\-\(\)]/g, '');
    // Check if it contains only digits (and optional leading +) and length is reasonable (e.g., 9-15 digits)
    const mobileRegex = /^(\+|00)?[0-9]{9,15}$/;
    return mobileRegex.test(cleanMobile);
};
