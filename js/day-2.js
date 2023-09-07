/** @type { HTMLCanvasElement } */
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d")

// ctx.fillRect(0, 0, 100, 100);
// ctx.clearRect(25, 25, 50, 50);
// ctx.strokeRect(30, 30, 40, 40);

// ctx.beginPath();
// ctx.fillStyle = "#3366ff"
// ctx.moveTo(0, 0);
// ctx.lineTo(0, 100);
// ctx.lineTo(100, 0);
// ctx.fill()
// ctx.beginPath();
// ctx.strokeStyle = "#3366ff"
// ctx.moveTo(0, 120);
// ctx.lineTo(120, 120);
// ctx.lineTo(120, 0);
// ctx.lineTo(0, 120);
// ctx.stroke()



// ctx.fillStyle = "#3366ff"
// ctx.fillRect(0, 0, 100, 100)
// ctx.fillStyle = "#3366ffee"
// ctx.fillRect(0, 100, 100, 100)
// ctx.fillStyle = "#3366ffdd"
// ctx.fillRect(100, 0, 100, 100)
// ctx.fillStyle = "#3366ffcc"
// ctx.fillRect(100, 100, 100, 100)
ws = 500
rs = 0;

loop = () => {
    rs += (ws - rs)/30
    
    ctx.clearRect(0, 0, 1000, 1000)
    ctx.beginPath();
    ctx.fillStyle = "#3366ff"
    ctx.moveTo(200, 200);
    for (i = 0; i < 360; i++){
        ctx.lineTo(Math.sin(i)*rs + 200, Math.cos(i)*rs + 200);
    }
    ctx.fill()
    
    ctx.beginPath();
    ctx.fillStyle = "#fff"
    ctx.font = "40px Pretendard-bold"
    ctx.fillText("asdf", 165, 210)
    ctx.fill()
    requestAnimationFrame(loop)
}

loop()