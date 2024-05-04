import { chromium } from 'playwright';
import fs from 'fs';
import { minimatch } from 'minimatch';

const visited = new Set();
const allPagesData = []; // 保存所有页面的数据
let fileCount = 0; // 文件计数器
const maxPagesPerFile = 65; // 每个文件的最大页面数

const config = {
    startUrl: 'https://guide.v2fly.org/',
    matchPattern: 'https://guide.v2fly.org/**',
    outputFileName: 'output',
    maxTokens: 2000000,
};

async function crawl(page, url) {
    if (visited.has(url) || !minimatch(url, config.matchPattern)) return;
    visited.add(url);

    try {
        const response = await page.goto(url, { waitUntil: 'networkidle' });
        console.log(`Visiting: ${url}`);
        const title = await page.title(); // 获取页面标题
        const content = await page.content(); // 获取页面内容
        allPagesData.push({ title, url, html: content }); // 保存标题、URL 和 HTML 内容

        // 当达到指定的最大页面数时，保存并清空当前数据，准备新文件
        if (allPagesData.length >= maxPagesPerFile) {
            savePagesDataToFile();
        }

        const links = await page.$$eval('a', links => links.map(link => link.href));
        for (let link of links) {
            if (link.startsWith('http') && minimatch(link, config.matchPattern)) {
                await crawl(page, link);
            }
        }
    } catch (error) {
        console.error(`Error visiting ${url}:`, error);
    }
}

function savePagesDataToFile() {
    const fileName = `${config.outputFileName}-${fileCount}.json`;
    fs.writeFileSync(fileName, JSON.stringify(allPagesData, null, 2));
    console.log(`Saved data to ${fileName}`);
    allPagesData.length = 0; // 清空数组
    fileCount++; // 文件计数器增加
}

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await crawl(page, config.startUrl);

    // 确保最后剩余的数据也被保存
    if (allPagesData.length > 0) {
        savePagesDataToFile();
    }

    await browser.close();
    console.log('Crawling finished.');
})();
