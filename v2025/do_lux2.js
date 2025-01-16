// const mysql = require('mysql2/promise');
// const { exec } = require('child_process');
// const util = require('util');
// const path = require('path');
// const fs = require('fs');

// const execPromise = util.promisify(exec);
// const dirPath = path.join(__dirname);
import mysql from 'mysql2/promise.js';
import { exec } from 'child_process';
import util from 'util';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execPromise = util.promisify(exec);
const dirPath = path.join(__dirname);


(async () => {
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        database: 'ttpool'
    });

    var results = await connection.query('SELECT * FROM `ttpool`.`default0` WHERE `mp3` IS NULL LIMIT 100');
    for (const row of results[0]) {
        const url = row.url;
        try {
            const files = fs.readdirSync(dirPath);
            process.chdir(__dirname);
            const { stdout, stderr } = await execPromise(`lux2.exe "${url}"`);
            await connection.query('UPDATE `ttpool`.`default0` SET `lux2log` = ? WHERE `url` = ?', [stdout, url]);
            await connection.query('UPDATE `ttpool`.`default0` SET `lux2err` = ? WHERE `url` = ?', [stderr, url]);
            const files_after_download = fs.readdirSync(dirPath);
            const new_files = files_after_download.filter(x => !files.includes(x));
            if (new_files.length !== 1 || !new_files[0].includes('.mp4')) {
                throw new Error('Unexpected number of new files downloaded');
            } else {
                await connection.query('UPDATE `ttpool`.`default0` SET `name` = ? WHERE `url` = ?', [new_files[0], url]);
                try {
                    const { stdout_ffmpeg, stderr_ffmpeg } = await execPromise(`ffmpeg -i "${new_files[0]}" ${row.index}.mp3`);
                    await connection.query('UPDATE `ttpool`.`default0` SET `ffmpegLog` = ? WHERE `url` = ?', [stdout_ffmpeg, url]);
                    await connection.query('UPDATE `ttpool`.`default0` SET `ffmpegErr` = ? WHERE `url` = ?', [stderr_ffmpeg, url]);
                    await connection.query('UPDATE `ttpool`.`default0` SET `mp3` = ? WHERE `url` = ?', [1, url]);
                    fs.unlinkSync(new_files[0]);
                } catch (error_ffmpeg) {
                    console.error(`Error executing ffmpeg: ${error_ffmpeg}`);
                }
            }
        } catch (err) {
            console.error(`Error executing command: ${err}`);
        }
    }
    await connection.end();
})();