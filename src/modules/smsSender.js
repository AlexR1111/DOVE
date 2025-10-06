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
  console.log(`📨 Simulierte SMS an ${phone}: 🕊️ Dein Dove-Code lautet ${code}`);
  return { status: 'sent', messageId: 'mocked-id-123456' };
}
