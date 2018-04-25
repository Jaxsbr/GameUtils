
var bounds = new Rectangle(0, 0, window.innerWidth, window.innerHeight);
var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var delta = 0;
var deltaTime = Date.now();

var titleTextStyle = "palegoldenrod";
var titleTextX = 100;
var titleTextY = 100;
var titleText = "Game Utils";
var titleFontSize = 60;
var titleFontFamily = "Consolas";

var animation;
var animationDestination = new Rectangle(450, 400, 100, 125);
var animationImage = new Image();
animationImage.onload = function() {
    // image, speed, sourceMaxWidth, sourceMaxHeight, frameCols, frameRows, startingCol, startingRow
    animation = new Animation(animationImage, 0.1, 400.25, 599.25, 4, 4, 0, 0);
};
animationImage.src = "img/spriteSheet.png";

var textRender;
var paralaxBackgroundSlider;  

var image = new Image();
image.onload = function() {         
    paralaxBackgroundSlider = new ParalaxBackgroundSlider(image);
    //PopulateParalaxBackgrounds();
    PopulateFloatyBackgrounds();
};
image.src = "img/trees.png";

var backgroundImageReady = false;
var backgroundImage = new Image();
backgroundImage.onload = function() {
    backgroundImageReady = true;
};
backgroundImage.src = "img/background.png";
var backgroundImageBounds = new Rectangle(0, 0, 0, 0);

   


InitTextRender();
Loop();


function InitTextRender() {    
    textRender = new TextRender();
    textRender.AddTextElement(new TextElement(titleText, titleTextStyle, titleFontFamily, 50, 150, titleFontSize));
    textRender.AddTextElement(new TextElement("drawFillRect", "yellow", titleFontFamily, 80, 255, 40));
    textRender.AddTextElement(new TextElement("drawStrokeRect", "yellow", titleFontFamily, 80, 295, 40));
    textRender.AddTextElement(new TextElement("drawFillArc", "yellow", titleFontFamily, 80, 335, 40));
    textRender.AddTextElement(new TextElement("drawFillText", "yellow", titleFontFamily, 80, 375, 40));
    textRender.AddTextElement(new TextElement("drawImage", "yellow", titleFontFamily, 80, 415, 40));
    textRender.AddTextElement(new TextElement("drawImageSimple", "yellow", titleFontFamily, 80, 455, 40));
    textRender.AddTextElement(new TextElement("drawImageComplex", "yellow", titleFontFamily, 80, 495, 40));
};


function PopulateParalaxBackgrounds() {
    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(4, new Rectangle(0, 0, bounds.W, bounds.H), 1, 50));    

    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(4, new Rectangle(-bounds.W, 0, bounds.W, bounds.H), 1, 50));               
};

function PopulateFloatyBackgrounds() { 
    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(1, new Rectangle(250, 0, 512, 512), 1, 0.01));    

    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(2, new Rectangle(0, 150, 384, 384), 1, 0.02));    

    paralaxBackgroundSlider.Backgrounds.push(    
        new ParalaxBackground(3, new Rectangle(500, 250, 256, 256), 0, 0.03));  
}


function Loop() {           
    UpdateDelta();  
    
    if (paralaxBackgroundSlider && animation) {
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

    // backgroundImageBounds.X = bounds.X - 155;
    // backgroundImageBounds.Y = bounds.Y - 100;
    // backgroundImageBounds.W = bounds.W;
    // backgroundImageBounds.H = bounds.H;
    
    textRender.Update(delta);
    animation.Update(animationDestination, delta);    
};

function Draw() {    
    ctx.clearRect(bounds.X, bounds.Y, bounds.W, bounds.H);    
        
    //if (this.backgroundImageReady) {
        //drawImage(ctx, this.backgroundImage, backgroundImageBounds, null);
    //}
    
    paralaxBackgroundSlider.Draw(ctx);         
    
    animation.Draw(ctx);

    textRender.Draw(ctx);
};