var ninja;

function start() {
// You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
// which will try to choose the best renderer for the environment you are in.
    var renderer = new PIXI.autoDetectRenderer(800, 600);

// The renderer will create a canvas element for you that you can then insert into the DOM.
    document.body.appendChild(renderer.view);

// You need to create a root container that will hold the scene you want to draw.
    var stage = new PIXI.Container();

    function Ninja(resources) {
        var self = this;
        self.sprites = {
            running: new PIXI.Sprite(resources.ninjaRunning.texture),
            standing: new PIXI.Sprite(resources.ninja.texture),
        }
        self.obj = new PIXI.Container();
        self.obj.position.x = 50;
        self.obj.position.y = 300;
        self.obj.scale.x = 1;
        self.obj.scale.y = 1;
        stage.addChild(self.obj);
        self.obj.addChild(self.sprites.running);
        self.obj.addChild(self.sprites.standing);
        self.sprites.running.visible = false;

        self.vx = 0;

        self.update = function() {
            self.obj.position.x += self.vx;
        };

        self.move = function(dir) {
            self.vx = dir;
            if (dir) {
                self.sprites.running.visible = true;
                self.sprites.standing.visible = false;
                self.obj.scale.x = (dir > 0) ? 1 : -1;
            } else {
                self.sprites.running.visible = false;
                self.sprites.standing.visible = true;
            }
        };
    }

// load the texture we need
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

window.onload = function() {
    console.log("it worked");
    start(); }
window.addEventListener("keydown", function(event){
    if (event.keyCode === 39) {
        ninja.move(3);
    } else if (event.keyCode === 37) {
        ninja.move(-3);
    }
});

window.addEventListener("keyup", function(event){
    ninja.move(0);
});