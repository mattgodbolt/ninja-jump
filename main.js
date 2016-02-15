function start() {
// You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
// which will try to choose the best renderer for the environment you are in.
    var renderer = new PIXI.autoDetectRenderer(800, 600);

// The renderer will create a canvas element for you that you can then insert into the DOM.
    document.body.appendChild(renderer.view);

// You need to create a root container that will hold the scene you want to draw.
    var stage = new PIXI.Container();

    var bunny;
// load the texture we need
    PIXI.loader.add('bunny', 'img/bunny.png').load(function (loader, resources) {
        // This creates a texture from a 'bunny.png' image.
        bunny = new PIXI.Sprite(resources.bunny.texture);

        // Setup the position and scale of the bunny
        bunny.position.x = 400;
        bunny.position.y = 300;

        bunny.scale.x = 2;
        bunny.scale.y = 2;

        // Add the bunny to the scene we are building.
        stage.addChild(bunny);

        // kick off the animation loop (defined below)
        animate();
    });

    function animate() {
        // start the timer for the next animation loop
        requestAnimationFrame(animate);

        // each frame we spin the bunny around a bit
        bunny.rotation += 0.01;

        // this is the main render call that makes pixi draw your container and its children.
        renderer.render(stage);
    }
}

window.onload = function() {
    console.log("it worked");
    start(); }