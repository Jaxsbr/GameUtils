var bounds = {x:0, y:0, width:800, height:480 };
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var delta = 0;
var deltaTime = Date.now();

var image = new Image();
var animation;
var animationDestination = {x:340, y:350, width:100, height:125};
image.onload = function() {     
    // paramaters: image, speed, frameWidth, frameHeight, frameCount
    animation = new Animation(image, 0.1, 400.25, 599.25, 4);
};
image.src = "spriteSheet.png";
     

ctx.fillStyle = "gray";
ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);

Loop();


function UpdateDelta() {  
    var now = Date.now();                   
    delta = (now - deltaTime) / 1000;
    deltaTime = now;
};

function PrepareLoopIteration() {
    requestAnimationFrame(Loop);
    UpdateDelta();
    ctx.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);            
};

function TestBasicDraw() {
    // Rect
    drawFillRect(ctx, "blue", {x:10, y:10, width:50, height:50});
    drawStrokeRect(ctx, "green", {x:25, y:25, width:50, height:50}, 3);

    // Arc
    drawFillArc(ctx, "red", 60, 60, 25);

    // Text
    drawFillText(ctx, "yellow", "MS Comic Sans", 40, "hello world", 65, 65);

    // Image
    if (image) { drawImage(ctx, image, {x:80, y:80, width:266, height:399}); }
};

function TestAnimation() {    
    if (animation) {
        animation.Update(animationDestination, delta);
        animation.Draw(ctx);
    }
};

function Loop() {   
    PrepareLoopIteration();
    TestBasicDraw();
    TestAnimation();
};