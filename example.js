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

var titleTextStyle = "palegoldenrod";
var titleShadowTextStyle = "black";
var titleTextX = 100;
var titleTextY = 100;
var titleShadowTextX = 100;
var titleShadowTextY = 100;
var titleText = "Animated Backgrounds";
var titleFontSize = 60;
var titleShadowFontSize = 60;


var image = new Image();
//var animation;
//var animationDestination = new Rect(340, 350, 100, 125);

image.onload = function() {     
    // paramaters: image, speed, frameWidth, frameHeight, frameCount
    //animation = new Animation(image, 0.1, 400.25, 599.25, 4);

    paralaxBackgroundSlider = new ParalaxBackgroundSlider(image);
    PopulateParalaxBackgrounds();
};
image.src = "trees.png";

var backgroundImageReady = false;
var backgroundImage = new Image();
backgroundImage.onload = function() {
    backgroundImageReady = true;
};
backgroundImage.src = "background.png";

var paralaxBackgroundSlider;
     
ctx.fillStyle = "gray";
ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);





Loop();



function PopulateParalaxBackgrounds() {

    // paralaxBackgroundSlider.Backgrounds.push(
    //     new ParalaxBackground(3, new Rect(400, -200, 768, 1024), 1, 0.35));

    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(1, new Rect(200, 0, 512, 512), 1, 0.01));    

    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(2, new Rect(0, 150, 384, 384), 1, 0.02));    
    
    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(3, new Rect(400, 250, 256, 256), 1, 0.03));             
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

    UpdateTitleTextPosition();
};

function UpdateTitleTextPosition() {
    // TODO:
    // Calculate all text movenment here.


    titleTextX = 20;
    titleTextY = 100;
    titleShadowTextX = titleTextX + 5;
    titleShadowTextY = titleTextY + 5;
};

function Draw() {    
    ctx.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);    
        
    if (this.backgroundImageReady) {
        drawImage(ctx, this.backgroundImage, {x:bounds.X - 80, y:bounds.Y - 100, width:bounds.W, height:bounds.H}, null);
    }

    //drawFillRect(ctx, "green", {x:bounds.X, y:bounds.Y, width:bounds.W, height:bounds.H});
    paralaxBackgroundSlider.Draw(ctx); 
    
    DrawTextOverlay();
};

function DrawTextOverlay() {
    DrawTitleText(titleShadowTextStyle, titleShadowTextX, titleShadowTextY, titleText, titleShadowFontSize);
    DrawTitleText(titleTextStyle, titleTextX, titleTextY, titleText, titleFontSize);   

    DrawTitleText("black", 75, 250, "todo: animate text!", 40);
    DrawTitleText("skyblue", 80, 255, "todo: animate text!", 40);

    DrawTitleText("black", 75, 290, "todo: create todo style menu!", 40);
    DrawTitleText("skyblue", 80, 295, "todo: create todo style menu!", 40);
}

function DrawTitleText(style, x, y, text, fontSize) {
    drawFillText(
        ctx, 
        style, 
        "Showcard Gothic", 
        fontSize, 
        text, 
        x, 
        y);
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