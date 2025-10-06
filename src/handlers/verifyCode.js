import { retrieveCode } from "../modules/codeStore.js";
import { tokenIssuer } from "../modules/tokenIssuer.js";
import { logger } from "../utils/logger.js";

export async function verifyCode(req, res) {
    const { phone } = req.body;

    try {
        const stored = await retrieveCode(phone);

        if (!stored) {
            logger.warn("Kein Code gefunden", { phone });
            return res.status(401).json({ status: 'invalid_or_expired' });
        }

        const now = Math.floor(Date.now() / 1000);
        if (stored.ttl < now) {
            logger.warn("Code abgelaufen", { phone, ttl: stored.ttl });
            return res.status(401).json({ status: "invalid_or_expired" };)
        }

        if (stored.code !== code) {
            logger.warn("Falscher Code", { phone, input: code, expected: stored.code });
            return res.status(401).json({ status: "invalid_or_expired" });
        }

        const token = tokenIssuer({ phone });
        logger.info("Code erfolgreich verifiziert", { phone });
        return res.status(200).json({ status: "verified", token });
    } catch (err) {
        logger.error("Fehler bei /verify-code", { error: err, phone });
        return res.status(500).json({ status: "error", message: "Interner Fehler bei Verifizierung" });
    }
}
