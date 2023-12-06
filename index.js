const puppeteer = require('puppeteer');
const fs = require('fs');
// const bodyParser = require('body-parser');

// var jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

const storeNames = ["Nekkocare", "New App Indiegogo", "NextEvo Naturals", "NFHS Network", "Nightfox Audio", "NKASIOBI", "Norton LifeLock", "Novica.de", "Noxgear", "Nucla Studio", "Old Navy", "Olivers Affiliate Program", "Olynvolt", "ON1 Sales", "Onda Wellness", "One For All Social", "OneTravel", "OneTravel", "OneTravel", "Online Fabric Store", "Ooma Residential", "Ooma Residential", "Orant Neon", "Organic Erotic", "Otaku Realms", "Otantica Home", "Otter.ai", "Otter.ai", "Outdoor Heights", "Oxiline", "Ozarke", "Packasport", "Paltalk", "Parallel Learning", "Parallel Learning", "parisrhone.com", "Park Candy", "Parker Davis", "Parker Davis", "Patrick Ta Beauty", "Patrick Ta Beauty", "Patrick Ta Beauty", "Patriot RED", "Pawrade", "pdfFiller", "Peak Revival-X", "Pegasus Robotic", "Perfect Cases", "Perfect Practice", "Performix", "Perpay", "pH-D Feminine Health"
];

async function getURL(storeName) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    });

    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    try {
        await page.goto('https://www.google.com/search?q=' + storeName, {
            waitUntil: 'networkidle0',
        });
    }
    catch (err) {

        console.log("Can't reach site: " + storeName);

        reportWriter.writeReport(storeName, "Can't reach site: ");
    }
    try {

        var codes = await page.evaluate(() => {

            return Array.from(document.querySelectorAll('#main div#search>div>div>div a')).map((x) => x.href);

        });

    } catch (err) {

        

        console.log('Navigation problem on: ' + storeName);

    }
    console.log(codes[0]);
    await writeReport(codes[0]);

    await browser.close();
}

async function writeReport(storeURL){

    await fs.appendFileSync("report.txt", storeURL + '\r\n', "UTF-8",{'flags': 'a+'});
    
}

async function runIt() {
    for (var i = 0; i < storeNames.length; i++) {
        await getURL(storeNames[i]);
    }
}
runIt();
