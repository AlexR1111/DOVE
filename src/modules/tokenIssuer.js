import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export function tokenIssuer(payload) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '5m',
        issuer: 'dove-auth',
        audience: 'dove_users'
    });
}