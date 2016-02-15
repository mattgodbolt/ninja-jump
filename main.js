var ninja;
var keysDown = {
    left: false,
    right: false,
    jump: false
};
var keyMap = {37: 'left', 39: 'right', 32: 'jump'};

function start() {
    var renderer = new PIXI.autoDetectRenderer(800, 600);

    document.body.appendChild(renderer.view);

    var stage = new PIXI.Container();

    function Ninja(resources) {
        var self = this;
        var scale = 0.5;
        var gravity = 0.4;
        var moveAcceleration = 2;
        var maxSpeed = 4;
        self.vx = 0;
        self.vy = 0;
        self.sprites = {
            running: new PIXI.Sprite(resources.ninjaRunning.texture),
            standing: new PIXI.Sprite(resources.ninja.texture),
        };
        self.sprites.running.position.x = -20;
        self.obj = new PIXI.Container();
        self.obj.position.x = 50;
        self.obj.position.y = 300;
        self.obj.scale.x = scale;
        self.obj.scale.y = scale;
        stage.addChild(self.obj);
        self.obj.addChild(self.sprites.running);
        self.obj.addChild(self.sprites.standing);
        self.sprites.running.visible = false;

        self.update = function () {
            if (keysDown.left) {
                self.vx -= moveAcceleration;
                if (self.vx < -maxSpeed) self.vx = -maxSpeed;
            } else if (keysDown.right) {
                self.vx += moveAcceleration;
                if (self.vx > maxSpeed) self.vx = maxSpeed;
            }
            self.vx *= 0.8;
            self.vy *= 0.95;

            if (Math.abs(self.vx) < 0.1) self.vx = 0;
            if (Math.abs(self.vy) < 0.1) self.vy = 0;

            var standingOnGround = false;
            if (self.obj.position.y >= 300) {
                standingOnGround = true;
                self.obj.position.y = 300;
                self.vy = 0;
            }
            if (keysDown.jump && standingOnGround) {
                self.vy = -10;
            }
            self.obj.position.x += self.vx;
            self.obj.position.y += self.vy;
            if (!standingOnGround) {
                self.vy += gravity;
            }
            if (self.vx) {
                self.sprites.running.visible = true;
                self.sprites.standing.visible = false;
                self.obj.scale.x = (self.vx > 0) ? scale : -scale;
            } else {
                self.sprites.running.visible = false;
                self.sprites.standing.visible = true;
            }
        };
    }

    PIXI.loader
        .add('ninjaRunning', 'img/RunningNinja.png')
        .add('ninja', 'img/StandingNinja1.png')
        .load(function (loader, resources) {
            ninja = new Ninja(resources);
            // kick off the animation loop (defined below)
            animate();
        });

    function animate() {
        // start the timer for the next animation loop
        requestAnimationFrame(animate);

        ninja.update();

        renderer.render(stage);
    }
}

window.onload = function () {
    start();
};
window.addEventListener("keydown", function (event) {
    var name = keyMap[event.keyCode];
    if (name) {
        keysDown[name] = true;
        event.preventDefault();
    }
});

window.addEventListener("keyup", function (event) {
    var name = keyMap[event.keyCode];
    if (name) {
        keysDown[name] = false;
        event.preventDefault();
    }
});