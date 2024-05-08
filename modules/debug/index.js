const fs = require("fs");
const style = fs.readFileSync("./global/global.html");
const admin = fs.readFileSync("./counter.config");

module.exports = (app, db) => {
  const getCounters = async () => await db.get("counters");

  app.get("/debug", async (req, res) => {
    if (admin) {
      console.log("Database: ");
      console.table(await getCounters());
      res.send(`${style} Printed Messages In Console`);
    } else {
      res.redirect("/404");
    }
  });

  app.get("/admin/wipedb", async (req, res) => {
    if (admin.includes("ADMIN_MODE")) {
      console.table(await getCounters());
      db.set("counters", []);
      console.table(await getCounters());
      res.send(`Check Console ${style}`);
    } else {
      res.redirect("/404");
    }
  });
};
