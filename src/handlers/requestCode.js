import { generateCode } from "../modules/codeGenerator";
import { sendCodeWithSinch } from "../modules/smsSender";
import { storeCode } from "../modules/codeStore";
import { validatePhone } from "../utils/validatePhone";

export async function requestCode(req, res) {
    const { phone } = req.body;

    if (!validatePhone(phone)) {
        return res.status(400).json({ status: 'error', message: 'Ungültige Telefonnummer'});
    }

    const code = generateCode();
    await storeCode(phone, code);
    const result = await sendCodeWithSinch(phone, code);

    if(result.status === 'sent') {
        return res.status(200).json({ status: 'send' , expires_in: 300 });
    } else {
        return res.status(500).json({ status: 'error', message: result.message });
    }
}