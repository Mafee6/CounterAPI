(async () => {

    const endpoints = await (await fetch("html/topics.json")).json()
    const sidenav = document.querySelector(".side-nav");
    let topics = [];
    sidenav.innerHTML = "";

    await endpoints.map(async p => {
        if(p.body) {
            p.fetchedBody = await (await fetch(p.body)).text()
        }
    });

    
    const topicview = document.querySelector(".topic-view");
    const refreshTopicView = async () => {
        const t = topics.find(c => c.classList.contains("selected"));
        if(t) {
            topicview.innerHTML = t.data.fetchedBody;
            const next = document.createElement("div"), back = document.createElement("div");
            next.className = "next";
            next.textContent = "Next >";
            
            topicview.appendChild(next);
            if(topics.indexOf(t) != -1 && !topics[topics.indexOf(t) + 1]) { next.style.setProperty("display","none") }
            next.addEventListener("click",()=>{if(topics.indexOf(t)!=-1){if(topics[topics.indexOf(t)+1]){topics.map(x=>x.classList.remove("selected"))
            topics[topics.indexOf(t)+1].click();topics[topics.indexOf(t)+1].classList.add("selected");refreshTopicView()}else{next.style.setProperty("display","none")}}else{next.style.setProperty("display","none")}})
            
            back.className="back";back.textContent="Back <";topicview.appendChild(back);if(topics.indexOf(t)!=-1&&!topics[topics.indexOf(t)-1]){back.style.setProperty("display","none")}
            back.addEventListener("click",()=>{if(topics.indexOf(t)!=-1){if(topics[topics.indexOf(t)-1]){topics.map(x=>x.classList.remove("selected"))
            topics[topics.indexOf(t)-1].click();topics[topics.indexOf(t)-1].classList.add("selected");refreshTopicView()}else{back.style.setProperty("display","none")}}else{back.style.setProperty("display","none")}})
            
            localStorage.setItem("selected", t.data.name)
        }
        
        CounterSDK.refresh();
    };

    // Just some time to load the bodies (Fixing bug #Dev:03: Undefined Body)
    setTimeout(async () => {
        await endpoints.map(async e => {
            const div = document.createElement("div");
            div.textContent = e.name;
            div.title = e.desc;
            div.className = "topic";
            if(localStorage.getItem("selected") ) {
                const sel = localStorage.getItem("selected");
                e.name == sel ? div.classList.add("selected") : null
            } else {
                div.classList.add("selected");
            }

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
        window.addEventListener("keydown", (e) => {
            if(e.key == "ArrowRight") {
                const nxt = document.querySelector(".next");
                if(nxt) {
                    nxt.click();
                    e.preventDefault();
                }
            }
            
            if(e.key == "ArrowLeft") {
                const bck = document.querySelector(".back");
                if(bck) {
                    bck.click();
                    e.preventDefault();
                }
            }
        });
    }, 1000);
})();
