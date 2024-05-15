const { launch } = require("puppeteer");

module.exports = async (briefId) => {
  try {
    const url = `${process.env.SERVER_URL}/pdf/brief?id=${briefId}`;
    const browser = await launch({ defaultViewport: null, timeout: 40000 });
    const page = await browser.newPage();
    await page.goto(url);
    await page.pdf({
      landscape: false,
      format: "letter",
      path: "public/uploads/brief.pdf",
      printBackground: true,
    });
    return "pdf created";
  } catch (error) {
    console.log(error);
  }
};
