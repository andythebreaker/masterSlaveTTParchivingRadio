import RSS from 'rss';
import mysql from 'mysql2/promise.js';
import util from 'util';
import hhmmss from 'hhmmss';
import fs from 'fs';
import { parseFile } from 'music-metadata';
import path from 'path';

const feed = new RSS({
    title: 'TTPOOL',
    description: '某種數值',
    feed_url: 'http://example.com/rss.xml',
    site_url: 'http://example.com',
    image_url: 'http://example.com/icon.png',
    docs: 'http://example.com/rss/docs.html',
    managingEditor: '某種數值',
    webMaster: '某種數值',
    copyright: '某種數值',
    language: 'zh-tw',
    categories: ['某種數值'],
    pubDate: 'Feb 4, 2018 04:08:00 GMT',
    ttl: '5',//可被快取的分鐘數
    custom_namespaces: {
      'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
    },
    custom_elements: [
      {'itunes:subtitle': 'TTPOOL'},
      {'itunes:author': '某種數值'},
      {'itunes:summary': '某種數值'},
      {'itunes:owner': [
        {'itunes:name': '某種數值'},
        {'itunes:email': 'example@example.com'}
      ]},
      {'itunes:image': {
        _attr: {
          href: 'http://i0.hdslb.com/bfs/archive/cf09dee9a9f6010acdce644bb06d349230f8cc1d.png'
        }
      }},
      {'itunes:category': [
        {_attr: {
          text: 'Arts'
        }}
      ]}
    ]
});

(async () => {
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        database: 'ttpool'
    });

    var results = await connection.query('SELECT * FROM `ttpool`.`default0` WHERE `mp3` IS NOT NULL LIMIT 100');
    for (const row of results[0]) {
        var sec = await parseFile(`./${row.index}.mp3`);
        feed.item({
            title: row.name, // sql name
            description: '某種數值',
            url: `http://192.168.0.102:48489/${row.index}.mp3`, // URL to the mp3 file
            guid: row.index, // sql index
            categories: ['某種數值'],
            author: '某種數值',
            date: new Date(), // today
            lat: 25.044444,
            long: 121.529444,
            enclosure : {url:`http://192.168.0.102:48489/${row.index}.mp3`, file:`./${row.index}.mp3`},
            custom_elements: [
                {'itunes:author': '某種數值'},
                {'itunes:subtitle': '某種數值'},
                {'itunes:image': {
                    _attr: {
                        href: 'http://i0.hdslb.com/bfs/archive/cf09dee9a9f6010acdce644bb06d349230f8cc1d.png'
                    }
                }},
                {'itunes:duration': `${hhmmss(sec.format.duration)}`} // mp3Duration('./index.mp3', function (err, duration) { seconed to hh:mm:ss
            ]
        });
    }

    await connection.end();

    // save to ./rss.xml
    var xml = feed.xml();
    fs.writeFileSync('./rss.xml', xml);
})();