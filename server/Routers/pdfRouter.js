

const express = require("express")
const pdfCtrl = require("../Controllers/pdfCtrl")

const pdfRouter = express.Router()
pdfCtrl.forEach(({ url, method, action }) => {
    pdfRouter[method](url,action)
})

module.exports = pdfRouter