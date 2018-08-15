import Champion from "../models/Champion.js";
import Dragon from "../models/Dragon.js";

const championsAPI = axios.create({
    baseURL: `https://dragon-duel.herokuapp.com/api/champions/`,
    timeout: 3000 //throw error after 3 seconds with no response
})
const dragonsAPI = axios.create({
    baseURL: `https://dragon-duel.herokuapp.com/api/dragons/`,
    timeout: 3000 //throw error after 3 seconds with no response
})
const gamesAPI = axios.create({
    baseURL: `https://dragon-duel.herokuapp.com/api/games`,
    timeout: 3000
})
let championsArr
let dragonsArr
let yourChampion
let yourDragon

export default class DuelService {
    constructor() {

    }
    getChampions(callback) {
        championsAPI.get()
            .then(res => {
                championsArr = res.data.map(c => {
                    return new Champion(c)
                })
                callback(championsArr)
            })
    }
    getDragons(callback) {
        dragonsAPI.get()
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
    startDuel() {
        gamesAPI.post('', {
            dragonId: yourDragon.id,
            championId: yourChampion.id
        })
        .then(res => console.log(res))
    }
}
