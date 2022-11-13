const express = require("express")
const cors = require("cors")
const app = express()

const whitelist = new Set(["http://example.com"])
const corsMiddleware = cors({
    origin: function (origin, callback) {
        if (whitelist.has(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"), false)
        }
    },
    methods: "GET"
})

app.get("/single", function (req, res, next) {
    res.send("Works")
})

const errHandler = (err, req, res, next) => {
    res.status(403).send(err.message)
}

app.get("/example", corsMiddleware, errHandler, function (req, res, next) {
    res.send("Hello")
})

app.use(express.static("public"))

app.listen(80, function () {
    console.log("CORS-enabled web server listening on port 80")
})