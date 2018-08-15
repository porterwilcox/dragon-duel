import DuelController from "./components/duelController.js";

class App {
    constructor() {
        this.controllers = {
            duelController: new DuelController
        }
    }
}
window.app = new App