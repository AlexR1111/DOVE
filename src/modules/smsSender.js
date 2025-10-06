import got from 'got';
import dotenv from 'dotenv';
dotenv.config()

const {
    SINCH_SERVICE_PLAN_ID,
    SINCH_API_TOKEN,
    SINCH_SENDER,
    SINCH_REGION
} = process.env;

const SINCH_URL =`https://${SINCH_REGION}.sms.api.sinch.com/xms/v1/${SINCH_SERVICE_PLAN_ID}/batches`;

export async function sendCodeWithSinch(phone, code) {
  console.log(`📨 Simulierte SMS an ${phone}: Dein Dove-Code lautet ${code}`);
  return { status: 'sent', messageId: 'mocked-id-123456' };
}

/*export async function sendCodeWithSinch(phone, code) {
    try {
        const response = await got.post(SINCH_URL, {
            json: {
                from:SINCH_SENDER,
                to: [phone],
                body:` 🕊️ Dein Dove-Code lautet: ${code}`
            },
            headers: {
                Authorizantion: `Bearer ${SINCH_API_TOKEN}`
            },
            responseType: 'json'
            });
            
            return {status: 'send', messageId: response.body.id };
        }   catch (error) {
            console.error('SMS-Fehler:', error.response?.body || error.message);
            return {status: 'error', message: 'DOVE konnte die SMS leider nicht versenden'};
        }
    }*/

