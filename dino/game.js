speed = 5;
class Dino {
  constructor() {
    this.x = 100;
    this.y = 0;
    this.gas = 0.1;
    this.maxGas = 5;
    this.w = 100;
    this.h = 100;
  }
  jump() {
    if (this.y >= 0) {
      console.log("jump!");
      let a = 5;
      this.gas = -this.maxGas;
    }
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.fillStyle = "#8aadf4";
    ctx.fillRect(dino.x, -dino.y + defaultY, dino.w, dino.h);
    ctx.fillStyle = "#181926";
    ctx.fillRect(dino.x + 35, -dino.y * 1.05 + defaultY + 20, 12, 33);
    ctx.fillRect(dino.x + 65, -dino.y * 1.05 + defaultY + 20, 12, 33);
  }
  gravity() {
    if (this.y < 0) {
      this.y = 0;
      this.gas = 0;
    }
    if (this.gas < 0) {
      this.gas += 0.07;
      this.y -= this.gas;
    } else if (this.y > 0) {
      if (this.y >= 176) this.gas = this.maxGas;
      this.gas -= 0.07;
      this.y -= this.maxGas - this.gas;
    } else {
      this.gas = 0;
      // this.y = 0
    }
  }
  down() {
    if (this.y <= 0) {
      this.y = 0;
      this.gas = 0;
    } else {
      if (this.gas <= 0) this.gas = -this.gas;
      this.y -= 10;
    }
  }
}
isloop = true;
class Cactus {
  constructor() {
    this.x = 3000;
    this.y = 0;
    this.h = 100;
    this.w = 30;
  }
  /**
   * @param {Dino} dino
   */
  collider(dino) {
    if (
      dino.x + dino.w >= this.x &&
      dino.x <= this.x + this.w &&
      dino.y + dino.h >= this.y &&
      dino.y <= this.y + this.h
    ) {
      console.log("aaaa");
      isloop = false;
    }
  }
  run() {
    this.x -= speed;
  }
}

class Star {
  constructor() {
    this.x = 2000;
    this.y = Math.round(Math.random() * 1000);
    this.size = (Math.round(Math.random() * 10) * 3) / 2;
  }
  move() {
    this.x -= this.size / speed / 1.5;
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.fillStyle = `rgba(240, 198, 198, ${this.size / 100})`;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

/** @type {HTMLCanvasElement} */
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let defaultY = 500;
let dino = new Dino();
/** @type {Array<Cactus>} */
let cactus = new Array();
/** @type {Array<Star>} */
let star = new Array();
let keys = [null, null];

document.addEventListener("keydown", (e) => {
  if (e.key == " ") {
    keys[0] = " ";
  }

  if (e.key == "ArrowDown") {
    keys[1] = "ArrowDown";
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key == " ") {
    keys[0] = null;
  }

  if (e.key == "ArrowDown") {
    keys[1] = null;
  }
});

cactusGen = () => {
  cactus.push(new Cactus());
  setTimeout(cactusGen, (Math.random() * 10000) / (speed / 2));
};

starGen = () => {
  console.log("star!");
  star.push(new Star());
  setTimeout(starGen, (Math.random() * 1000) / (speed / 1.5));
};

let loop = () => {
  if (isloop) {
    speed += 0.001;
    ctx.rotate(-Math.sin(speed - 0.001) * 0.1);
    ctx.clearRect(-1000, -100, 5000, 1000);
    ctx.rotate(Math.sin(speed) * 0.1);
    ctx.fillStyle = "#f0c6c6";
    ctx.fillRect(-1000, defaultY + 100, 5000, 1000);

    ctx.rotate(45);
    ctx.fillRect(200, -300, 300, 300);
    ctx.rotate(-45);

    ctx.font = "40px serif";
    ctx.fillText(Math.round(speed * 10) - 50, 10, 40, 100);

    if (keys.includes(" ")) {
      if (dino.y == 0) dino.jump();
    }
    if (keys.includes("ArrowDown")) {
      console.log(dino.down());
    }

    // ctx.clearRect(0, 0, 1000, 1000)

    star.forEach((e) => {
      e.draw(ctx);
      e.move();
    });

    ctx.fillStyle = "#a6da95";
    cactus.forEach((e) => {
      e.run();
      ctx.fillRect(e.x, -e.y + defaultY, e.w, e.h);
      e.collider(dino);
    });

    if (cactus.length) {
      if (cactus[0].x <= -100) {
        cactus.shift();
      }
    }

    if (star.length) {
      if (star[0].x <= -100) {
        star.shift();
      }
    }

    dino.draw(ctx);
    dino.gravity();
  }
  // cactus.run()
  requestAnimationFrame(loop);
};
loop();
cactusGen();
starGen();
