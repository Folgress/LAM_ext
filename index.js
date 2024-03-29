/* How to import script in https://lostarkmap.com/:
let s = document.createElement("script"); s.src = "https://folgress.github.io/LAM_ext/index.js?t=" + (new Date()).getTime(); s.type = "module"; document.head.appendChild(s);
*/

const url = "https://raw.githubusercontent.com/Folgress/LAM_ext/develope/";
const timer = 10000;
let currentHashCode = null;

fetch(url + "data.json").then(res => res.json()).then(json => {
    console.info("Running " + json.name + " v" + json.version.major + "." + json.version.minor);

    getJS();
})

function getJS() {
    console.log("Fetching getMerchant ...")

    fetch(url + "getMerchant.js").then(res => res.text()).then(js => {
        console.log("... file fetched, compute hash ...")

        const newHash = js.hashCode();

        if (currentHashCode !== newHash) {
            console.log("... hash unequal, pushing new script ...");

            currentHashCode = newHash;

            // TODO: push new script and remove old one, if exitst!
        } else {
            console.log("... hash equal, do nothing!")
        }


        setTimeout(getJS, timer);
    })
}

String.prototype.hashCode = function () {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};