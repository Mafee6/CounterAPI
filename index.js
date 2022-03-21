const express = require("express");
const fs = require("fs");
const app = express();
const db = require("quick.db");

app.use(require("cors")({
    origin: "*",
    optionsSuccessStatus: 200
}))

app.use(express.static("website"));

const style = fs.readFileSync("./global/global.html");

const moduleconf = JSON.parse(fs.readFileSync("./modules/modules.json"));
console.log("[!] Loading Modules");
moduleconf.paths.map(p => {
    const r = require(`./modules${p}/${moduleconf.main}`);
    r(app, db);
    console.log(`[!] Loaded Module ${p}/${moduleconf.main}`);   
});

app.get("/api", (req, res) => {
    res.send(`
        <a href="/docs">See our API Docs</a>
        ${style}
    `);
});

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/website/404/index.html");
});

const server = app.listen(2492, () => {
    console.log (`[!] Started API Server! @Port ${server.address(). port}`);
    fs.appendFileSync("./logs/startTime.log", `[Start] Started Server @${new Date().toString()}\n`);
});
