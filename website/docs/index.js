(async () => {

    const topicview = document.querySelector(".topic-view");
    const refreshTopicView = async () => {
        const t = topics.find(c => c.classList.contains("selected"));
        if(t) {
            topicview.innerHTML = await (await fetch(t.data.body)).text();
        }
    };

    const endpoints = await (await fetch("html/topics.json")).json()
    const sidenav = document.querySelector(".side-nav");
    let topics = [];
    sidenav.innerHTML = ""
    endpoints.map(e => {
        const div = document.createElement("div");
        div.textContent = e.name;
        div.title = e.desc;
        div.className = "topic";
        if(e.selected) div.classList.add("selected")
        div.data = e;

        sidenav.appendChild(div);
        topics.push(div);

        div.addEventListener("click", () => {
            topics.map(t => t.classList.remove("selected"));
            div.classList.add("selected");
            refreshTopicView()
        });

    });

    refreshTopicView();
})();