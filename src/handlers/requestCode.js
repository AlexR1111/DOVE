import { generateCode } from "../modules/codeGenerator.js";
import { sendSMS } from "../modules/smsSender.js"; // Umbau: sendSMS ist jetzt generisch
import { storeCode } from "../modules/codeStore.js";
import { validatePhone } from "../utils/validatePhone.js";
import { logger } from "../utils/logger.js";

export async function requestCode(req, res) {
  const { phone } = req.body;
  const code = generateCode();

  if (!validatePhone(phone)) {
    logger.warn("Ungültige Telefonnummer", { phone });
    return res.status(400).json({ status: "error", message: "Ungültige Telefonnummer" });
  }

  try {
    await storeCode(phone, code);
    const result = await sendSMS(phone, code); // sendSMS kann intern SNS oder Sinch nutzen

    if (result.status === "sent") {
      logger.info("Code erfolgreich versendet", { phone, code });
      return res.status(200).json({ status: "send", expires_in: 300 });
    } else {
      logger.warn("SMS-Versand fehlgeschlagen", { phone, message: result.message });
      return res.status(500).json({ status: "error", message: result.message });
    }
  } catch (err) {
    logger.error("Fehler bei /request-code", { error: err, phone });
    return res.status(500).json({ status: "error", message: "Interner Fehler beim Codeversand" });
  }
}
