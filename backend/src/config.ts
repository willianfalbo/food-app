import * as dotenv from 'dotenv';
dotenv.config();

export const APP_SECRET_KEY = checkConfigValue(process.env.APP_SECRET_KEY);
export const JSON_SERVER_URI = checkConfigValue(process.env.JSON_SERVER_URI);
export const JSON_SERVER_DBPATH = 'db.json';

function checkConfigValue(config) {
    if (!config) {
        throw new Error('YOU MUST SET ALL ENVIRONMENT CONFIGURATIONS');
    }
    return config;
}
