class Dino{
    constructor() {
        this.x = 0;
        this.y = 0;
        this.gas = 0.1;
        this.maxGas = 5;
    }
    jump() {
        if (this.y >= 0){
            console.log("jump!")
            let a = 5;
            this.gas = -this.maxGas;
        }
    }
    gravity() {
        if (this.y < 0){
            this.y = 0;
            this.gas = 0;
        }
        if (this.gas < 0){
            this.gas += 0.07
            this.y -= this.gas
        }else if (this.y > 0) {
            if (this.y >= 176) this.gas = this.maxGas
            this.gas -= 0.07
            this.y -= this.maxGas-this.gas
        }else{
            this.gas = 0
            // this.y = 0
        }
    }
    down() {
        if (this.y <= 0){
            this.y = 0;
            this.gas = 0;
        }else{
            if (this.gas <= 0) this.gas = -this.gas
            this.y -= 10
        }
    }
}

class Cactus{
    constructor() {
        this.x = 1000;
        this.y = 0;
        this.h = 100;
        this.w = 30;
        this.speed = 2;
    }
    run(){
        this.x -= this.speed
    }
}


/** @type {HTMLCanvasElement} */
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let defaultY = 200;
let dino = new Dino()
let cactus = new Array();
let keys = [null, null]

document.addEventListener("keydown", e => {
    if (e.key == ' ') {
        keys[0] = ' '
    }

    if (e.key == "ArrowDown") {
        keys[1] = "ArrowDown"
    }
})

document.addEventListener("keyup", e => {
    if (e.key == ' ') {
        keys[0] = null
    }

    if (e.key == "ArrowDown") {
        keys[1] = null
    }
})


cactusGen = () => {
    cactus.push(new Cactus())
    setTimeout(cactusGen, Math.random()*5000)
}

let loop = () => {
    ctx.clearRect(0, 0, 1000, 1000)
    if (keys.includes(' ')){
        if (dino.y == 0) dino.jump();
    }
    if (keys.includes("ArrowDown")){
        console.log(dino.down());
    }

    // ctx.clearRect(0, 0, 1000, 1000)
    ctx.fillRect(dino.x, -dino.y + defaultY, 100, 100)

    cactus.forEach(e => {
        ctx.fillRect(e.x, -e.y + defaultY, e.w, e.h)
        e.run()
    })

    if (cactus.length){
        if (cactus[0].x <= -100){
            cactus.shift()
        }
    }

    dino.gravity()
    // cactus.run()
    requestAnimationFrame(loop)
}
loop()
cactusGen()
