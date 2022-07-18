fetch("data.json").then(res => res.json()).then(json => {
    console.log("Running " + json.name + " v." + json.version);
})