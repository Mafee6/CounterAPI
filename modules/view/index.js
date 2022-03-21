const { count } = require("console");

const style = require("fs").readFileSync("./global/global.html");

module.exports = (app, db) => {
    app.get("/view/", (req, res) => res.send(`${style} Please Specify a Counter To View!`))
    app.get("/view/:id", (req, res) => {
        let view = require("fs").readFileSync("./modules/view/html/index.html");
        const counter = db.get("counters").find(c => c.id === req.params.id);
        if(counter) {
            res.send(
                view.toString()
                    .replace(/\{\{NAME\}\}/g, counter.name)
                    .replace(/\{\{COUNT\}\}/g, counter.count)
                    .replace(/\{\{TIME\}\}/g, new Date(counter.timestamp))
                    .replace(/\{\{LASTINCREMENT\}\}/g, new Date(counter.lastIncrement))
                    .replace(/\{\{COLOR\}\}/g, counter.randomColor)
                    .replace(/\{\{WIDGET\}\}/g, counter.widget)
                );
        } else {
            res.send(`${style} 404 Counter Not Found`)
        }
    });
}