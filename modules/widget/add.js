module.exports = (app, db, widgets) => {
    app.get("/api/widget/:id/:color/add", (req, res) => {
        let counters = db.get("counters");
        const counter = counters.find(c => c.id === req.params.id);
        if(counter) {
            if(widgets.map(w => w.color).includes(req.params.color.toLowerCase())) {
                if(req.query.format === "json") {
                    res.send({
                        widget: widgets.find(w => w.color === req.params.color.toLowerCase()).svg.replace(/\{\{COUNT\}\}/, counter.count.toString().slice(0, 7)),
                        timestamp: Date.now()
                    });

                    counter.count++;
                    counter.lastIncrement = Date.now();
                    counters[counters.find(c => c.id === req.params.id)] = counter;
                    db.set("counters", counters)
                } else {
                    res.send(widgets.find(w => w.color === req.params.color.toLowerCase()).svg.replace(/\{\{COUNT\}\}/, counter.count.toString().slice(0, 7)));

                    counter.count++;
                    counter.lastIncrement = Date.now();
                    counters[counters.find(c => c.id === req.params.id)] = counter;
                    db.set("counters", counters);
                }
            } else {
                res.send({
                    status: 404,
                    error: "Requested Widget Color not found."
                })
            }
        } else {
            res.send({
                status: 404,
                error: "The requested counter was not found."
            })
        }
    });

    console.log("[!] Loaded Sub-Module of widgets: /add.js")
}