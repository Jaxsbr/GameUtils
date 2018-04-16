Rect = function(x, y, w, h) {
    this.X = x;
    this.Y = y;
    this.W = w;
    this.H = h;
}





var bounds = new Rect(0, 0, window.innerWidth, window.innerHeight);
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var delta = 0;
var deltaTime = Date.now();

var image = new Image();
//var animation;
//var animationDestination = new Rect(340, 350, 100, 125);

image.onload = function() {     
    // paramaters: image, speed, frameWidth, frameHeight, frameCount
    //animation = new Animation(image, 0.1, 400.25, 599.25, 4);

    paralaxBackgroundSlider = new ParalaxBackgroundSlider(image);
    PopulateParalaxBackgrounds();
};
image.src = "tree.png";

var paralaxBackgroundSlider;
     
ctx.fillStyle = "gray";
ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);





Loop();



function PopulateParalaxBackgrounds() {

    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(
            new Rect(0, 0, 512, 512), 1, 0.5));    

    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(
            new Rect(300, 300, 512, 512), 0, 0.2));    
    
    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(
                new Rect(400, 0, 375, 375), 1, 0.1));    
};


function Loop() {           
    UpdateDelta();  

    if (paralaxBackgroundSlider) {
        Update();
        Draw();
    }

    requestAnimationFrame(Loop);   
};

function UpdateDelta() {  
    var now = Date.now();                   
    delta = (now - deltaTime) / 1000;
    deltaTime = now;
};

function Update() {    
    paralaxBackgroundSlider.Update(bounds, delta);    
};

function Draw() {    
    ctx.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);    
        
    drawFillRect(ctx, 'red', {x:bounds.X, y:bounds.Y, width:bounds.W, height:bounds.H});
    paralaxBackgroundSlider.Draw(ctx); 
};




// function TestBasicDraw() {
//     // Rect
//     drawFillRect(ctx, "blue", {x:10, y:10, width:50, height:50});
//     drawStrokeRect(ctx, "green", {x:25, y:25, width:50, height:50}, 3);

//     // Arc
//     drawFillArc(ctx, "red", 60, 60, 25);

//     // Text
//     drawFillText(ctx, "yellow", "MS Comic Sans", 40, "hello world", 65, 65);

//     // Image
//     if (image) { drawImage(ctx, image, {x:80, y:80, width:512, height:512}); }
// };

// function TestAnimation() {    
//     if (animation) {
//         animation.Update(animationDestination, delta);
//         animation.Draw(ctx);
//     }
// };