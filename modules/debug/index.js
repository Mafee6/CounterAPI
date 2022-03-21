const fs = require("fs");
const style = fs.readFileSync("./global/global.html");
const admin = fs.readFileSync("./counter.config");

module.exports = (app, db) => {
    app.get("/debug", (req, res) => {
        if(admin) {
            console.log ("Database: ");
            console.table (db.get("counters"));
            res.send(`${style} Printed Messages In Console`);
        } else {
            res.redirect("/404");
        }
    });
    
    app.get("/admin/wipedb", (req, res) => {
        if(admin.includes("ADMIN_MODE")) {
            console.table(db.get("counters"));
            db.set("counters", []);
            console.table(db.get("counters"));
            res.send(`Check Console ${style}`);
        } else {
            res.redirect("/404");
        }
    });
};