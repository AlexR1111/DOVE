export function validatePhone(phone) {
    const regex = /^\+[1-9]\d{1,14}$/;
    return regex.test(phone);
}