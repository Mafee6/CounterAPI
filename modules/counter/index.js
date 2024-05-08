module.exports = (app, db) => {
  const getCounters = async () => await db.get("counters");

  app.get("/api/counter", (req, res) => {
    res.send({
      status: 400,
      error: "Please Specify a counter ID!",
    });
  });

  app.get("/api/counter/:id", async (req, res) => {
    const counter = (await getCounters()).find((c) => c.id === req.params.id);
    if (counter) {
      res.send(counter);
    } else {
      res.status(404).send({
        status: 404,
        error: "Not Found",
      });
    }
  });

  app.get("/api/counter/:id/add", async (req, res) => {
    let counters = await getCounters();
    let counter = counters.find((c) => c.id === req.params.id);
    if (counter) {
      counter.count++;
      counter.lastIncrement = Date.now();
      counters[counters.find((c) => c.id === req.params.id)] = counter;

      await db.set("counters", counters);

      res.send({
        counter: counter,
        status: 200,
        incrementedBy: 1,
        timestamp: Date.now(),
      });
    } else {
      res.status(400).send({
        status: 400,
        error: "Not Found",
      });
    }
  });

  app.get("/api/counters/name/:name", async (req, res) => {
    const cntrs = await (
      await getCounters()
    ).filter((c) => c.name === req.params.name.replace(/ /g, "-"));
    res.send(
      cntrs != [] || !cntrs
        ? cntrs
        : {
            status: 404,
            error: "No Counter Found",
          },
    );
  });

  app.get("/api/counters/count", async (req, res) => {
    res.send({
      count: (await getCounters()).length,
    });
  });
};
