import { jwt } from "jsonwebtoken";
import { logger } from "../utils/logger.js";

export function generatedJWT(phone) {
    try {
        const token = jwt.sign({ phone }, process.env.JWT_SECRET, { expiresIn: "5m" });
        logger.debug("JWT generiert", { phone, token });
        return token;
    } catch (err) {
        logger.error("Fehler bei JWT-Erstellung", { error: err });
        throw err;
    }
}