// document.getElementById("imgFvD").src = "https://staging.followthemoney.nl/uploads/media/600012280d7bd/50plus-fb.png"
// document.getElementById("imgPvdA").src = "https://i.gyazo.com/0e4233465a7277830a16f7dfc37274e4.png"
// document.getElementById("imgCDA").src = "https://i.gyazo.com/8496ad59756cb594ac77e71653e85c33.png"
// document.getElementById("img50").src = "https://staging.followthemoney.nl/uploads/media/600012280d7bd/50plus-fb.png"
// document.getElementById("imgCU").src = "https://i.gyazo.com/0e4233465a7277830a16f7dfc37274e4.png"
// document.getElementById("imgSP").src = "https://i.gyazo.com/8496ad59756cb594ac77e71653e85c33.png"
// document.getElementById("imgSGP").src = "https://staging.followthemoney.nl/uploads/media/600012280d7bd/50plus-fb.png"
// document.getElementById("imgGroenlinks").src = "https://i.gyazo.com/0e4233465a7277830a16f7dfc37274e4.png"
// document.getElementById("imgDenk").src = "https://i.gyazo.com/8496ad59756cb594ac77e71653e85c33.png"


const data = d3.csv('./Screen.csv')
async function fetch(url) {
    return url
}

make()

async function make() {

    const dat = await fetch(data)
    const face = dat.map(d => d.ad_snapshot_url) 
    const weergaven = dat.map(d => d["Weergaven mid"])

    document.getElementById("imgFvD").src = face[5]
    document.getElementById("imgPvdA").src = face[7]
    document.getElementById("imgCDA").src = face[1]
    document.getElementById("img50").src = face[0]
    document.getElementById("imgCU").src = face[2]
    document.getElementById("imgSP").src = face[9]
    document.getElementById("imgSGP").src = face[8]
    document.getElementById("imgGroen").src = face[6] 
    document.getElementById("imgDenk").src = face[4]

    document.getElementById("weergavenFvD").textContent = "FvD: " + weergaven[5] + " weergaven"
    document.getElementById("weergavenPvdA").textContent = "PvdA: " + weergaven[7] + " weergaven"
    document.getElementById("weergavenCDA").textContent = "CDA: " + weergaven[1] + " weergaven"
    document.getElementById("weergaven50").textContent = "50Plus: " + weergaven[0] + " weergaven"
    document.getElementById("weergavenCU").textContent = "CU: " + weergaven[2] + " weergaven"
    document.getElementById("weergavenSP").textContent = "SP: " + weergaven[9] + " weergaven"
    document.getElementById("weergavenSGP").textContent = "SGP: " + weergaven[8] + " weergaven"
    document.getElementById("weergavenGroen").textContent = "Groenlinks: " + weergaven[6] + " weergaven"
    document.getElementById("weergavenDenk").textContent = "Denk: " + weergaven[4] + " weergaven"

}
