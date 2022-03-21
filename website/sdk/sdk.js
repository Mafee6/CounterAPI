// Mafee / CounterAPI / SDK
(async () => {
    const $root = "http://localhost:2492/api/widget/";
    const $viewroot = "http://localhost:2492/view";
    const q = document.querySelectorAll(".counter");
    const c = Array.from(q ? q : []);
    c.map(async k => { 
        k.innerHTML = await (await fetch(`${$root}${k.getAttribute("counter")}/${k.getAttribute("counter-color")}/`)).text();
        k.querySelector("text").setAttribute("font-size", "1rem");
        k.style.setProperty("display", "inline-flex", "important");
        k.style.setProperty("vertical-align", "middle");
        k.addEventListener("click", () => {
            location.href = `${$viewroot}/${k.getAttribute("counter")}`
        });

        k.title = "Powered By CounterAPI | Click to view details";
    });

    console.log("%c[CounterSDK]%c Loaded", "color: orange", "color: lightgrey");
})();