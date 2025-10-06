import { retrieveCode } from "../modules/codeStore";
import { tokenIssuer } from "../modules/tokenIssuer";

export async function requestCode(req,res) {
    const {phone} = req.body;
    const stored = await retrieveCode(phone);

    if (!stored || stored.code !== code) {
        return res.status(401).json({ status: 'invalid_or_expired' });
    }

    const token = tokenIssuer({ phone });
    res.status(200).json({ status: 'verified', token });
}