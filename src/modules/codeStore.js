import { DynamoDBClient, PutItemCommand, GetItemCommand} from '@aws-sdk/client-dynamodb';
import {logger} from '../utils/logger.js';

const client = new DynamoDBClient({ region: process.env.AWS_REGION});
const TABLE_NAME = process.env.DYNAMODB_TABLE;

export async function storeCode(phone, code) {
    const ttl = Math.floor(Date.now()/1000) +300;

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            phone: { S: phone },
            code: { S: code },
            ttl: { N: ttl.toString() }
        }
    };

    try {
        await client.send(new PutItemCommand(params));
        logger.info(`Code gespeichert`, {phone, code, ttl});
    }   catch (err) {
        logger.error(`Fehler beim Speichern des Codes`, {err});
        throw err;
    }
}

export async function retrieveCode(phone) {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            phone: {S: phone }
        }
    };

    const result = await client.send(new GetItemCommand(params));
    if (!result.Item) return null;

    const code = result.Item.code?.S;
    const ttl = parseInt(result.Item.ttl?.N, 10);
    const now = Math.floor(Date.now() / 1000);

    if (ttl < now) return null;

    return {code, ttl};
}