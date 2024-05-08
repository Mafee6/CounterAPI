/*
* Mafee CounterAPI SDK
* Author: Mafee7 (https://github.com/mafee6)
* Rev. 22 Mar. 2022
* Desc: To Load Counter Widgets on your webpage  
*/

const CounterSDK = {
    refresh: () => { },
    cache: []
};

(async () => {
    const $root = "http://localhost:2492/api/widget/";
    const $viewroot = "http://localhost:2492/view";
    const counterLoad = () => {
        const q = document.querySelectorAll(".counter");
        const c = Array.from(q ? q : []);
        c.map(async k => {
            k.innerHTML = await (await fetch(`${$root}${k.getAttribute("counter")}/${k.getAttribute("counter-color")}/${k.getAttribute("counter-add") || k.getAttribute("counter-add") == "" ? "add" : ""}`)).text();
            k.querySelector("text").setAttribute("font-size", "1rem");
            k.style.setProperty("display", "inline-flex", "important");
            k.style.setProperty("vertical-align", "middle");
            k.addEventListener("click", () => {
                location.href = `${$viewroot}/${k.getAttribute("counter")}`
            });

            CounterSDK.cache.push(k.innerHTML);

            k.title = "Powered By CounterAPI | Click to view details";
        });
    };

    CounterSDK.refresh = counterLoad;
    CounterSDK.refresh();

    console.log("%c[CounterSDK]%c Loaded", "color: orange", "color: lightgrey");
})();
