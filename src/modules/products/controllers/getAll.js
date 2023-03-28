// Dependencies.
const cheerio = require("cheerio");

// Helpers.
const getContent = require("../../../helpers/getContent");

/**
 * @async
 * @name getAll
 * @description Function to get the food list from "Wallmart" web site.
 * @returns {JSON} JSON with all the food from "Wallmart".
 */
module.exports = async function getAll() {
  try {
    // Get website content.
    const content = await getContent();

    // Cheerio.
    const $ = cheerio.load(content);

    // Search reference element.
    const main = $("main");

    // Move to the next element (container).
    const container = main
      .children()
      .eq(0)
      .children()
      .eq(0)
      .children()
      .eq(0)
      .children()
      .eq(0); // h-100 relative, full.

    // Move to the next element (we actually get the UL list).
    const list = container
      .children()
      .eq(2)
      .children()
      .eq(0)
      .children()
      .eq(0)
      .children()
      .eq(1)
      .children()
      .eq(1);

    // Built products list.
    const products = [];

    list
      .children()
      .toArray()
      .forEach((item) => {
        // Item to built.
        const product = {
          category: "Abarrotes",
          name: "",
          url: "",
          price: "",
        };

        // Get div element.
        const divElement = $(item).children().eq(0);

        // Get and set product name.
        const name = divElement.children().eq(0).text();
        product.name = name;

        // Get and set image src.
        const imgAttr = divElement
          .children()
          .nextAll()
          .eq(1)
          .children()
          .eq(0)
          .children()
          .eq(1)
          .attr();
        product.url = imgAttr.src;

        // Get and set price.
        const price = divElement
          .children()
          .nextAll()
          .eq(3)
          .children()
          .eq(0)
          .text();
        product.price = price;

        // Add product.
        products.push(product);
      });

    // Return.
    return {
      error: false,
      status: 200,
      data: products,
    };
  } catch (e) {
    console.log(`Error: ${e.message}`);
    return {
      error: true,
      status: 500,
      message: e.message,
    };
  }
};
