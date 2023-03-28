// Dependencies.
const axios = require("axios");

// Headers.
const defaultHeaders = {
  Accept: "*/*",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
};

/**
 * @async
 * @name makeRequest
 * @description Function to make an API request using axios.
 * @param {string} method - HTTP method used for the request (GET, POST, PUT, DELETE)
 * @param {string} url - URL of the API.
 * @param {Object|null} data - Data to be sent in a POST or PUT request.
 * @param {Object} headers - Custom headers for each request.
 * @returns {JSON} JSON API's response in JSON format.
 */
module.exports = async function makeRequest(
  method,
  url,
  data = null,
  headers = {}
) {
  try {
    const response = await axios.request({
      method,
      url,
      data,
      headers: {
        ...headers,
        ...defaultHeaders,
      },
    });

    return response.data;
  } catch (e) {
    console.error(`Error:  ${e.message}`);
  }
};
