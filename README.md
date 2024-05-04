# ChatGPT-crawler-new
为补充GPT-crawler被某些网站拒绝访问所开发的新爬虫项目。
这是一个用于爬取网页内容并保存为JSON文件的工具。它使用了Playwright来模拟浏览器，并提供了一些配置选项以定制爬取行为。
- [Get started](#get-started)
  - [Running locally](#running-locally)
    - [Clone the repository](#clone-the-repository)
    - [Install dependencies](#install-dependencies)
    - [Configure the crawler](#configure-the-crawler)
    - [Run your crawler](#run-your-crawler)
  - [Upload your data to OpenAI](#upload-your-data-to-openai)
    - [Create a custom GPT](#create-a-custom-gpt)
    - [Create a custom assistant](#create-a-custom-assistant)
## Get started

### Running locally

#### Clone the repository

Be sure you have Node.js >= 16 installed.
Be sure you have Google Chrome.

```sh
git clone https://github.com/Anonymous0632/ChatGPT-crawler-new
```

#### Install dependencies

```sh
npm install playwright
npm install
npm install minimatch
```

#### Configure the crawler
Open [crawler.js](crawler.js) and edit the `startUrl` and `matchPattern` properties to match your needs.
startUrl: The starting URL for the scraper.
matchPattern: The matching pattern for pages to be scraped.
outputFileName: The name of the output JSON file.
maxTokens: Maximum tokens limit.

E.g. to crawl the Builder.io docs to make our custom GPT you can use:

```ts
const config = {
    startUrl: 'https://www.builder.io/c/docs/developers',
    matchPattern: 'https://www.builder.io/c/docs/**',
    outputFileName: 'output',
    maxTokens: 2000000,
};
```

#### Run your crawler

```sh
npm start
```
### Upload your data to OpenAI

The crawl will generate a file called `output.json` at the root of this project. Upload that [to OpenAI](https://platform.openai.com/docs/assistants/overview) to create your custom assistant or custom GPT.

#### Create a custom GPT

Use this option for UI access to your generated knowledge that you can easily share with others

> Note: you may need a paid ChatGPT plan to create and use custom GPTs right now

1. Go to [https://chat.openai.com/](https://chat.openai.com/)
2. Click your name in the bottom left corner
3. Choose "My GPTs" in the menu
4. Choose "Create a GPT"
5. Choose "Configure"
6. Under "Knowledge" choose "Upload a file" and upload the file you generated
7. if you get an error about the file being too large, you can try to split it into multiple files and upload them separately using the option maxFileSize in the config.ts file or also use tokenization to reduce the size of the file with the option maxTokens in the config.ts file![Gif of how to upload a custom GPT](https://github.com/BuilderIO/gpt-crawler/assets/844291/22f27fb5-6ca5-4748-9edd-6bcf00b408cf)

#### Create a custom assistant

Use this option for API access to your generated knowledge that you can integrate into your product.

1. Go to [https://platform.openai.com/assistants](https://platform.openai.com/assistants)
2. Click "+ Create"
3. Choose "upload" and upload the file you generated



