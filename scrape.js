import playwright from 'playwright';
import fs from 'fs';
const browser = await await playwright.chromium.launch();
const context = await browser.newContext({ acceptDownloads: true });
const page = await context.newPage();
await page.goto('https://www.puc-rio.br/microhorario');
await page.viewportSize({width: 1080, height: 1024});
//await page.getByRole('button', { name: 'Ok' }).click()
await page.locator('#btnBuscar').click()
await page.locator('#pnlBaixarInfo').click()
await page.locator('#ddlExtensao').selectOption("Texto");
const downloadPromise = page.waitForEvent('download');
await page.locator('#btnDownload').click()
const download = await downloadPromise;
const readable = await download.createReadStream();
readable.setEncoding('utf16le');
const writableStream = fs.createWriteStream('HORARIO_DAS_DISCIPLINAS.csv', {encoding: 'utf8'});
readable.pipe(writableStream);
writableStream.on('finish', () => {
    process.exit(0);

});


