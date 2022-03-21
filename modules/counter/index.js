module.exports = (app, db) => {

    app.get("/api/counter", (req, res) => {
        res.send({
            status: 400,
            error: "Please Specify a counter ID!"
        })
    });

    app.get("/api/counter/:id", (req, res) => {
        const counter = db.get("counters").find(c => c.id === req.params.id);
        if(counter) {
            res.send(counter)
        } else {
            res.status(404).send({
                status: 404,
                error: "Not Found"
            })
        }
    });

    app.get("/api/counter/:id/add", (req, res) => {
        let counters = db.get("counters");
        let counter = counters.find(c => c.id === req.params.id);
        if(counter) {
            counter.count++;
            counter.lastIncrement = Date.now();
            counters[counters.find(c => c.id === req.params.id)] = counter;
            db.set("counters", counters)
            res.send({
                counter: counter,
                status: 200,
                incrementedBy: 1,
                timestamp: Date.now()
            });
        } else {
            res.status(400).send({
                status: 400,
                error: "Not Found"
            })
        }
    });

    app.get("/counters/name/:name", (req, res) => {
        const cntrs = db.get("counters").filter(c => c.name === req.params.name);
        res.send(
            cntrs != [] || !cntrs ? cntrs : {
                status: 404,
                error: "No Counter Found"
            }
        )
    });
};