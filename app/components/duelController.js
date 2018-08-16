import DuelService from "./duelService.js";

let duelService = new DuelService

export default class DuelController {
    constructor() {
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
        Array.from(document.getElementsByClassName("selection")).forEach(e => {
            e.style.display = "none"
        })
        document.querySelector(".btn-danger").style.pointerEvents = "none"
        duelService.startDuel(drawGame)
    }
    attack(attack) {
        duelService.attack(attack, drawGame)
    }
    playAgain() {
        window.location.reload()
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
    if (champion && dragon) {
        document.querySelector(".btn-danger").style.visibility = "visible"
    }
}
function drawGame(game) {
    let champion = game._champion
    let dragon = game._dragon
    let template = ''
    if (dragon.currentHP == 0){
        template = `
        <div class="col-sm-12 end">
            <p class="win">you win!<p>
            <button class="btn-primary" onclick="app.controllers.duelController.playAgain()">play again</button>
        </div>
        `
    return document.querySelector(".duel").innerHTML = template
    }
    if (champion.hp == 0){
        template = `
        <div class="col-sm-12 end">
            <p class="lose">you lose<p>
            <button class="btn-primary" onclick="app.controllers.duelController.playAgain()">play again</button>
        </div>
        `
    return document.querySelector(".duel").innerHTML = template
    }
    template = `
    <div class="col-sm-6">
        <div class="card">
            <div class="card-title">
                <h1>${champion.name}</h1>
                <h3>Health Points: ${champion.hp}</h3>
            </div>
            <img src="${champion.imgUrl}" alt="your champion" />
            <div class="card-body">
                <button onclick="app.controllers.duelController.attack('${Object.keys(champion.attacks)[0]}')" class="btn-success">${Object.keys(champion.attacks)[0]}</button>
                <button onclick="app.controllers.duelController.attack('${Object.keys(champion.attacks)[1]}')" class="btn-success">${Object.keys(champion.attacks)[1]}</button>
                <button onclick="app.controllers.duelController.attack('${Object.keys(champion.attacks)[2]}')" class="btn-success">${Object.keys(champion.attacks)[2]}</button>
            </div>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="card">
            <div class="card-title">
                <h2>${dragon.name}</h2>
                <h3>Health Points: ${dragon.currentHP}</h3>
            </div>
            <img src="${dragon.imgUrl}" alt="the dragon" />
        </div>
    </div>
    `
    document.querySelector(".duel").innerHTML = template
}