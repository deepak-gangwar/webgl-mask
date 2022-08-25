import webgl from "./components/webgl"

class App {
    constructor() {
        this.init()
    }

    init() {
        new webgl()
    }
}

new App()