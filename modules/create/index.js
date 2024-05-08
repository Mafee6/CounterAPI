const fs = require("fs");
const style = fs.readFileSync("./global/global.html");

let wids = JSON.parse(fs.readFileSync("./modules/widget/widgets/widgets.json"));
const root = "http://localhost:2492";

module.exports = function (app, db) {
  app.get("/api/create", async (req, res) => {
    if (req.query.name) {
      if (req.query.name.length < 50) {
        const id = Array.apply(0, new Array(10))
          .map(() => {
            const c = Math.floor(Math.random() * 2);
            if (c == 0) {
              return Math.floor(Math.random() * 10);
            } else {
              return "abcdefghijklmnopqrstuvwxyz".split("")[
                Math.floor(Math.random() * 27)
              ];
            }
          })
          .join("");

        let rc = wids[Math.floor(Math.random() * wids.length)].color;

        let reg = {
          name: req.query.name.replace(/ /g, "-"),
          id: id,
          url: `${root}/api/counter/${id}`,
          increment: `${root}/api/counter/${id}/add`,
          widget: `${root}/api/widget/${id}/${rc}`,
          widgetAdd: `${root}/api/widget/${id}/${rc}/add`,
          randomColor: rc,
          timestamp: Date.now(),
          count: 0,
          lastIncrement: Date.now(),
          schemaver: 1.26,
        };

        await db.push("counters", reg);
        if (req.query.debug) console.table(reg);

        res.send({
          status: 200,
          reg: reg,
        });
      } else {
        res.status(400).send(`
                    <h3>Bad Request ${style}</h3>
                    Request Query Too Long<br>
                    Supplied: ${req.query.name.length}
                `);
      }
    } else {
      res
        .status(400)
        .send(`Bad Request ${style}: Request Query Doesn't Contain a name`);
    }
  });
};
