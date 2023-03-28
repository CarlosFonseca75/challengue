// Dependencies.
const tough = require("tough-cookie");

// Create cookieJar.
const cookieJar = new tough.CookieJar();

/**
 * @async
 * @name getCookie
 * @description Function to generate a random cookie to make HTTP requests.
 * @returns {string} Cookie to be used.
 */
module.exports = async function getCookie(domain, url) {
  try {
    // Create random cookie.
    const newCookie = new tough.Cookie({
      key: "mycookie",
      value: Math.random().toString(36).substring(2),
      httpOnly: true,
      domain,
    });

    // Add the new cookie to the CookieJar.
    await cookieJar.setCookie(newCookie.toString(), url);

    // Get cookie from CookieJar.
    const cookies = await cookieJar.getCookies(url);

    // Return cookie as a string.
    return cookies.map((cookie) => cookie.toString()).join("; ");
  } catch (e) {
    console.error(`Error:  ${e.message}`);
  }
};
