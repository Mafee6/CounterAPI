const fs = require("fs");
const root = "./modules/widget";
let widgets = require("./widgets/widgets.json");

widgets.map((w) => {
  w.path = `/widgets/${w.color}.svg`;
  const wd = fs.readFileSync(root + w.path);
  w.svg = wd.toString() + "<!-- Mafee7/CounterAPI-->";
});

module.exports = (app, db) => {
  require("./add.js")(app, db, widgets);

  app.get("/api/widget/:id/:color", async (req, res) => {
    const counter = (await db.get("counters")).find(
      (c) => c.id === req.params.id,
    );
    if (counter) {
      if (
        widgets.map((w) => w.color).includes(req.params.color.toLowerCase())
      ) {
        if (req.query.format === "json") {
          res.send({
            widget: widgets
              .find((w) => w.color === req.params.color.toLowerCase())
              .svg.replace(
                /\{\{COUNT\}\}/,
                counter.count.toString().slice(0, 7),
              ),
            timestamp: Date.now(),
          });
        } else {
          res.send(
            widgets
              .find((w) => w.color === req.params.color.toLowerCase())
              .svg.replace(
                /\{\{COUNT\}\}/,
                counter.count.toString().slice(0, 7),
              ),
          );
        }
      } else {
        res.send({
          status: 404,
          error: "Requested Widget Color not found.",
        });
      }
    } else {
      res.send({
        status: 404,
        error: "The requested counter was not found.",
      });
    }
  });
};
