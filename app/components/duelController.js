import DuelService from "./duelService.js";

let duelService = new DuelService

export default class DuelController {
    constructor(){
        duelService.getChampions(drawChampions)
        duelService.getDragons(drawDragons)
    }
    selectChampion(id) {
        document.getElementById(`${id.id}`).style.boxShadow = "0 0 5px 10px green"
        duelService.selectChampion(id.id, showButton)
                
    }
    selectDragon(id) {
        document.getElementById(`${id.id}`).style.boxShadow = "0 0 5px 10px red"
        duelService.selectDragon(id.id, showButton)
    }
    startDuel() {
        duelService.startDuel()
    }
}
function drawChampions(arr) {
    let template = ''
    arr.forEach(champion => {
        // console.log(champion)
        template += `
        <div id="champ${champion.id}" class="card champion-card" onclick="app.controllers.duelController.selectChampion(champ${champion.id})">
            <img class="card-img-top" src="${champion.imgUrl}" />
            <div class="card-body">
                <h2 class="card-title">${champion.name}</h2>
            </div>
        </div>
        `
    })
    document.querySelector(".champions").innerHTML = template
}
function drawDragons(arr) {
    let template = ''
    arr.forEach(dragon => {
        // console.log(dragon)
        template += `
        <div id="dragon${dragon.id}" class="card dragon-card" onclick="app.controllers.duelController.selectDragon(dragon${dragon.id})">
            <img class="card-img-top" src="${dragon.imgUrl}" />
            <div class="card-body">
                <h2 class="card-title">${dragon.name}</h2>
            </div>
        </div>
        `
    })
    document.querySelector(".dragons").innerHTML = template
}
function showButton(champion, dragon) {
    if (champion && dragon){
        document.querySelector(".btn-danger").style.visibility = "visible"
    }
}