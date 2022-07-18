const url = "https://raw.githubusercontent.com/Folgress/LAM_ext/develope/";
fetch(url + "data.json").then(res => res.json()).then(json => {
    console.log("Running " + json.name + " v." + json.version);
})