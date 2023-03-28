// Dependencies.
const puppeteer = require("puppeteer");

// Helpers.
const getCookie = require("./getCookie");

/**
 * @async
 * @name getContent
 * @description Function to get the content of the website using puppeteer.
 * @returns {string} HTML string of the website.
 */
module.exports = async function getContent() {
  try {
    // URL.
    const url = "https://super.walmart.com.mx/content/abarrotes/120005";
    const domain = "super.walmart.com.mx";

    // Get cookie.
    const cookie = await getCookie(domain, url);

    // Launch a new browser instance.
    const browser = await puppeteer.launch({
      // executablePath: '/usr/bin/chromium-browser',
      headless: false,
      cookie,
      args: ["--start-maximized"],
    });

    // Create a new page.
    const page = await browser.newPage();

    // Navigate to the URL.
    await page.goto(url);

    // Get the HTML content.
    const content = await page.content();

    // Return the content.
    return content;
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};
