
import puppeteer from "puppeteer"


export default async function getSiteStatic(url: string, outputType: "img" | "pdf") {
    try {
        const browser = await puppeteer.launch({ defaultViewport: null })
        const page = await browser.newPage()
        page.setDefaultTimeout(40000)
        await page.goto(url)
        if (outputType === "img") {
            await page.screenshot({ path: `public/uploads/site-image.jpeg` })
        } else {
            await page.pdf({
                path: `public/uploads/site-pdf.pdf`,
                margin: {
                    top: "70px",
                    bottom: "70px"
                },
                displayHeaderFooter: true,
                footerTemplate: `<span style="width:100%;text-align:center;  height:20px;display:block;color:#FF00FF;background: #06061B;font-size:16px;">
                <span class="pageNumber"></span> of <span class="totalPages"> </span>
                </span>`,
            })
        }

        await browser.close()
        return "site static downloaded"
    } catch (error) {
        console.log("FROM GETSITESTATICS", error)
    }

}