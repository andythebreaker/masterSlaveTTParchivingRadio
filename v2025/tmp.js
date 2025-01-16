import { Podcast } from 'podcast';

/* lets create an rss feed */
const feed = new Podcast({
    title: 'title',
    description: 'description',
    feedUrl: 'http://example.com/rss.xml',
    siteUrl: 'http://example.com',
    imageUrl: 'http://example.com/icon.png',
    docs: 'http://example.com/rss/docs.html',
    author: 'Dylan Greene',
    managingEditor: 'Dylan Greene',
    webMaster: 'Dylan Greene',
    copyright: '2013 Dylan Greene',
    language: 'en',
    categories: ['Category 1','Category 2','Category 3'],
    pubDate: 'May 20, 2012 04:00:00 GMT',
    ttl: 60,
    itunesAuthor: 'Max Nowack',
    itunesSubtitle: 'I am a sub title',
    itunesSummary: 'I am a summary',
    itunesOwner: { name: 'Max Nowack', email: 'max@unsou.de' },
    itunesExplicit: false,
    itunesCategory: [{
        text: 'Entertainment',
        subcats: [{
          text: 'Television'
        }]
    }],
    itunesImage: 'http://example.com/image.png'
});

/* loop over data and add to feed */
feed.addItem({
    title:  'item title',
    description: 'use this for the content. It can include html.',
    url: 'http://example.com/article4?this&that', // link to the item
    guid: '1123', // optional - defaults to url
    categories: ['Category 1','Category 2','Category 3','Category 4'], // optional - array of item categories
    author: 'Guest Author', // optional - defaults to feed author property
    date: 'May 27, 2012', // any format that js Date can parse.
    lat: 33.417974, //optional latitude field for GeoRSS
    long: -111.933231, //optional longitude field for GeoRSS
    //enclosure : {url:'...', file:'path-to-file'}, // optional enclosure
    itunesAuthor: 'Max Nowack',
    itunesExplicit: false,
    itunesSubtitle: 'I am a sub title',
    itunesSummary: 'I am a summary',
    itunesDuration: 12345,
    itunesNewFeedUrl: 'https://newlocation.com/example.rss',
});

// cache the xml to send to clients
const xml = feed.buildXml();
console.log(xml);