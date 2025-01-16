//const puppeteer = require('puppeteer-core');
//const mysql = require('mysql2/promise');
import mysql from 'mysql2/promise.js';
import puppeteer from 'puppeteer-core';

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized'],
        userDataDir: 'C:\\Users\\ai\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1',
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    });
    const page = await browser.newPage();
    //await page.goto('https://space.bilibili.com/13837532/video');
    await page.goto('https://space.bilibili.com/13837532/video?tid=0&pn=2&keyword=&order=pubdate');

    await page.waitForSelector('.small-item.fakeDanmu-item', { timeout: 60000 });
    await autoScroll(page);

    const videoUrls = await page.evaluate(() => {
        const videos = Array.from(document.querySelectorAll('.small-item.fakeDanmu-item'));
        return videos
            .filter(video => {
                const durationText = video.querySelector('.length').innerText;
                if ((durationText.match(/:/g) || []).length === 1) {
                    const duration = video.querySelector('.length').innerText;
                    const [minutes, seconds] = duration.split(':').map(Number);
                    return minutes > 30 || (minutes === 30 && seconds > 0);
                } else if ((durationText.match(/:/g) || []).length === 2) {
                    const duration = video.querySelector('.length').innerText;
                    const [hours, minutes, seconds] = duration.split(':').map(Number);
                    return hours > 0 || minutes > 30 || (minutes === 30 && seconds > 0);
                } else {
                    return false;
                }
            })
            .map(video => video.querySelector('a').href);
    });

    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        database: 'ttpool'
    });

    for (const videoUrl of videoUrls) {
        await connection.query("INSERT INTO `ttpool`.`default0` (`url`) VALUES (?)", [videoUrl]);
    }

    await connection.end();

    await browser.close();
})();

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}