import { requestCode } from './src/handlers/requestCode.js';
import { verifyCode } from './src/handlers/verifyCode.js';
import express from 'express';

const app = express();
app.use(express.json());

app.post('/request-code', requestCode);
app.post('/verify-code', verifyCode);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log( `🕊️ Dove fliegt auf Port ${PORT}`);
});