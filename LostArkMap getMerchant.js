let traders = new Array();
let re = /\d+:\d+/g

document.querySelectorAll(".wandering-merchant-section").forEach(merchant => {
    // get merchant name
    let name = merchant.querySelector(".text-center").textContent;

    // get merchant spawn times
    let timesText = merchant.querySelector(".wandering-merchant-section-schedule-text").textContent;
    let timeMatch = Array.from(timesText.matchAll(re), m => m[0].split(":"))

    // if merchant have no spawn times, drop entry and continue with next one
    if (timeMatch.length === 0) return;

    // get merchant spawn locations
    let locationName = merchant.querySelector(".wandering-merchant-section-content").querySelectorAll(".media-body")[0].textContent;
    let locationsArea = new Array();
    merchant.querySelector(".wandering-merchant-section-content").querySelectorAll(".db-marker-ref-entry").forEach(location =>
        locationsArea.push(location.querySelectorAll(".media-body")[2].textContent)
    )

    //get merchant selling items
    let items = new Array();
    merchant.querySelectorAll(".db-small-item-entry").forEach(item => {
        let price = item.querySelector(".db-cost-value").textContent;
        let image = item.querySelector(".db-icon-small").src;
        let text = item.getAttribute("data-original-title").match(/<h6>(.+)<\/h6>/)[1]

        items.push({ name: text, img: image, cost: price })
    })

    // push all merchant data into collection
    traders.push({ name: name, times: timeMatch, locations: { name: locationName, area: locationsArea }, items: items })
})

// setup timer for merchant warning
function checkupTimer() {
    // get server timer
    let serverTimeH = Number(document.querySelector("#time-server-hours").textContent);
    let serverTimeM = Number(document.querySelector("#time-server-min").textContent)
    let is12H = document.querySelector("#time-server-sec").textContent.match(/am|pm/) !== null

    // if server time is displayed in 24H format, convert to 12H
    if (!is12H) {
        serverTimeH = serverTimeH > 12 ? serverTimeH - 12 : serverTimeH;
        serverTimeH = serverTimeH === 0 ? 12 : serverTimeH;
    }

    // check if an merchant spawn in the next 10 minutes
    traders.forEach(merchant => {
        merchant.times.filter(time => time )
    })

    // setTimeout(checkupTimer, 1000);
}
checkupTimer();