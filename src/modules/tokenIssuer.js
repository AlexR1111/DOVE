import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export function tokenIssuer(payload) {
    try {
        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: '5m',
            issuer: 'dove-auth',
            audience: 'dove_users'
        });

        logger.info('JWT erfolgreich erstellt', { phone: payload.phone });
        logger.debug('JWT-Token', { token });

        return token;
    } catch (err) {
        logger.error('Fehler bei JWT-Erstellung', { error: err });
        throw err;
    }
}