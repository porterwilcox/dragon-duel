import Champion from "../models/Champion.js";
import Dragon from "../models/Dragon.js";

const duelAPI = axios.create({
    baseURL: `https://dragon-duel.herokuapp.com/api/`,
    timeout: 3000 //throw error after 3 seconds with no response
})
let championsArr
let dragonsArr
let yourChampion
let yourDragon
let game
let gameID

export default class DuelService {
    constructor() {

    }
    getChampions(callback) {
        duelAPI.get('champions/')
            .then(res => {
                championsArr = res.data.map(c => {
                    return new Champion(c)
                })
                callback(championsArr)
            })
    }
    getDragons(callback) {
        duelAPI.get('dragons/')
            .then(res => {
                dragonsArr = res.data.map(d => {
                    return new Dragon(d)
                })
                callback(dragonsArr)
            })
    }
    selectChampion(id, callback) {
        let championID = parseInt(id.split('').pop())
        championsArr.find(c => {
            if (c.id == championID) {
                yourChampion = new Champion(c)
            }
        })
        callback(yourChampion, yourDragon)
    }
    selectDragon(id, callback) {
        let dragonID = parseInt(id.split('').pop())
        dragonsArr.find(d => {
            if (d.id == dragonID) {
                yourDragon = new Dragon(d)
            }
        })
        callback(yourChampion, yourDragon)
    }
    startDuel(callback) {
        duelAPI.post('games/', {
            dragonId: yourDragon.id,
            championId: yourChampion.id
        })
            .then(res => {
                game = res.data.game
                gameID = game._id
                callback(game)
            })
    }
    attack(attack, callback) {
        duelAPI.put(`games/${gameID}`, {
            attack: attack
        })
            .then(res => {
                game = res.data
            })
            .then(callback(game))
    }
}
