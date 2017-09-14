// Amazing disco (unicorn) background animation provided by the talented @msvaljek.
// special thanks
// twitter @msvaljek
// https://msvaljek.blogspot.com/2013/08/canvas-disco-rain.html

// standard shim
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// helper functions
function randomMax(max) {
    return Math.floor(Math.random() * max);
}

function getParticleColor() {
    var r = (100 + randomMax(155));
    var g = (100 + randomMax(155));
    var b = (100 + randomMax(155));

    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

// dom stuff and fps counter
var canvas = document.getElementById('mainCanvas');
const mq = window.matchMedia("(max-width: 575px)");

if (mq.matches) {
    canvas.width = 350;
    canvas.height = 400;
} else {
    canvas.width = 1200;
    canvas.height = 300;
}
var ctx = canvas.getContext('2d');
ctx.globalCompositeOperation = 'lighter';

// globals
var particleBackground = 'rgba(29, 73, 94, 0.1)',
    numParticles = 50,
    radiusmax = 50,
    gravity = 0.2,
    wind = 1,
    flashfactor = 5,
    particleColor = 'rgba(238, 249, 255, 0.8)',
    randomColor = true,
    rotationSpeed = 0.1,
    roofOffset = 200;

var Particle = function () {
    this.x = randomMax(canvas.width);
    // just to add a bit more noise on the start
    this.y = randomMax(canvas.height);
    this.dy = 0;
    this.r = randomMax(radiusmax);
    this.color = randomColor ? getParticleColor() : particleColor;
    this.angle = 0;
};

Particle.prototype.draw = function () {
    this.r = flashfactor * (Math.log(this.r) / Math.LN10);

    this.dy += gravity;
    this.y += this.dy;

    this.x += wind;

    this.angle = (this.angle + rotationSpeed) % (2 * Math.PI);

    if (this.r <= 0) {
        this.r = randomMax(radiusmax);
    }

    if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
        this.y = -randomMax(roofOffset);
        this.x = randomMax(canvas.width);
        this.dy = 0;
        this.color = randomColor ? getParticleColor() : particleColor;
    }

    ctx.beginPath();
    var fillStyle = ctx.createRadialGradient(this.x, this.y, this.r * 0.2, this.x, this.y, this.r);
    fillStyle.addColorStop(0, this.color);
    fillStyle.addColorStop(1, particleBackground);

    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x - Math.cos(this.angle) * this.r, this.y - Math.sin(this.angle) * this.r);
    ctx.lineTo(this.x + Math.cos(this.angle) * this.r, this.y + Math.sin(this.angle) * this.r);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x - Math.cos(this.angle + Math.PI / 2) * this.r, this.y - Math.sin(this.angle + Math.PI / 2) * this.r);
    ctx.lineTo(this.x + Math.cos(this.angle + Math.PI / 2) * this.r, this.y + Math.sin(this.angle + Math.PI / 2) * this.r);
    ctx.stroke();
};

var ParticleSystem = function () {
    ctx.lineWidth = 1;
    this.particles = [];
    for (var i = 0; i < numParticles; i++) {
        this.particles.push(new Particle());
    }
};
ParticleSystem.prototype.draw = function () {
    for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].draw(i);
    }
};

var gui = new dat.GUI();
gui.add(window, 'numParticles').min(1).max(300).step(1).name('Num. Particles').onFinishChange(function () {
    particleSystem = new ParticleSystem();
});
//Turning off remote for animation -wm
//gui.add(window, 'gravity').min(0.01).max(5).step(0.1);
//gui.add(window, 'wind').min(-20).max(20).step(1);
//gui.add(window, 'flashfactor').min(0.1).max(6).step(0.1);
//gui.add(window, 'rotationSpeed').min(-0.9).max(+0.9).step(0.1);
//gui.add(window, 'roofOffset').min(0).max(500).step(1);
//gui.add(window, 'radiusmax').min(4).max(100).step(1);
//gui.add(window, 'randomColor');
//gui.addColor(window, 'particleColor');

var particleSystem = new ParticleSystem();

window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.globalCompositeOperation = 'lighter';
    particleSystem = new ParticleSystem();
};

(function animloop() {
    requestAnimFrame(animloop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particleSystem.draw();
})();
