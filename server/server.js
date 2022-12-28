const express = require("express")
const app = express()
const Router = require("./Routes/index")
const utils = require("./utils/db_utils")
const path = require("path")
const cors = require("cors")

const MONGO_URI = () => {
    return `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_USER_PWD}@127.0.0.1:${process.env.DB_PORT}/${process.env.MONGO_DB_NAME}`
}

const runDB = async () => {
    await utils.connectToDB(MONGO_URI())
}

const configureServer = async () => {
    await runDB()
    app.use(cors())
    app.use(express.json())

    app.use("/api/v1", Router)

    app.use(express.static(path.join(__dirname, "..", "dist")))

    app.get("/", (req, res, next) => {
        res.sendFile(path.join(__dirname, "..", "dist", "index.html"))
    })
}

const startServer = port =>
    app.listen(port, () => {
        console.log(`server listening on port ${port}...`)
    })

module.exports = { startServer, configureServer, app, MONGO_URI }
