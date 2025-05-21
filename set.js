const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0lucUNHK0F2cHFwd3dLUmtjVFhxbUM4ZzI3dHZ4NDJ6MzdBTUVVM0VGQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQnhtaFg3T3llZmxhNHJkSnIzQ0x3QVRTZFJEVC8zRU55WlV4WTgvWGFpND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjSXlZeGtzOEZKVU5SQzRpRHJyak5tN2dZdGluWCt0eXJ5eDRtRy83M0dZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIveDc0QlVvNlVnZTFDSlRFczBPUXNtK2NNUk9QTWFPYjRsMGwxbURmNWpZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVINVJCZjdWdjJ0RHdUZHZtVmFYMjhBbU5TWFgrc3hEK3FtVTRqdyt3Rm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdjYmozcFM4LzVFYVBSQUkvTVRFeHNNTHp6U1BvTHlLYTZ4LzVDWDFUQjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0VsOWx6dXZabmxDWW1ESnVIem10OUUwd3dWK2ptVGhoZDljSmJndGJsND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0VvOEdnemk1TUY3aDZNZjcrSkJQWnBBNzNacTMxWTIwYzM3Z3F2ZVh5QT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpRRDVFQkU0QzEvSlpRc0JyNzJzVlRNazBwTGFmMTlPTG8xeHFCT0xYckl3dUw0L3hxSS9iYmVVUzZqajl6MWdEZEtYanp0ZFhyUDRVZXRJSWlLUGdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI0LCJhZHZTZWNyZXRLZXkiOiJKNXJodE4xRUk2NWkwT2tVR2c5TVh4WUJVMW1EZzdIdWVpeENFRFhmbjlrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc5NTUxMzcxNUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI4M0QxODI3Q0MwNDMyQTJBODk1MDVFM0M5RkI4QURFNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3NzkyNDkzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3OTU1MTM3MTVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOEJDNjA2MTUwQTU5ODI3MTVDNEYyRTRCQUIyOTAxQTQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0Nzc5MjQ5M30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0Nzk1NTEzNzE1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjVCQjUyMDMyNzkwNTE0NjlBRUM4RUQ3QzkyMjMxQjg5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDc3OTI0OTV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkhBMjc0WlM4IiwibWUiOnsiaWQiOiIyNTQ3OTU1MTM3MTU6NDlAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI5MDQwOTY0ODgxMjIxOTo0OUBsaWQiLCJuYW1lIjoiVMOLUk3Dj8ORw4RUw5hSIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLV2VtL1lERU4za3RNRUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJRSnlha2ZHclU1aUZiV2k0TFpvSTBmUk5pRlFyTEI1ZWF5WkthT1kxeFI4PSIsImFjY291bnRTaWduYXR1cmUiOiJ5MUNrOWdoN1dWeWw1bjFpWXk1ZzhWSTB4Mm1VMm5ydkJ0K1lrY1pFVkw1TXpOSXFBRWI3dEFrZHU0TlNUT3RQYUpOUlZCVVlEd281d0pRdHFGd3VDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWHlnV3FZR2R0dW1uUE9xa3BxUzVsL0t6a1hLQUVsQS9ZSnk2RmpCdjNDVk9lZVVJaG56UXFiblNWTVZrTy8xVElKbk9OYnZ6YXUvS3RSb1YvWCtHaFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3OTU1MTM3MTU6NDlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVUNjbXBIeHExT1loVzFvdUMyYUNOSDBUWWhVS3l3ZVhtc21TbWptTmNVZiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ3NzkyNDkwLCJsYXN0UHJvcEhhc2giOiIxSzRoSDQiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUM1VSJ9',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "B.M.B-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 𝙱.𝙼.𝙱-𝚇𝙼𝙳 ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

