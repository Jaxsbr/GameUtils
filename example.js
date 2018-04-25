
var bounds = new Rectangle(0, 0, window.innerWidth, window.innerHeight);
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var delta = 0;
var deltaTime = Date.now();

var titleTextStyle = "palegoldenrod";
var titleTextX = 100;
var titleTextY = 100;
var titleText = "Animated Backgrounds";
var titleFontSize = 60;
var titleFontFamily = "Showcard Gothic";

var textRender;

var animation;
var animationDestination = new Rectangle(340, 350, 100, 125);
var animationImage = new Image();
animationImage.onload = function() {
    animation = new Animation(image, 0.1, 400.25, 599.25, 4);   
};

var image = new Image();
image.onload = function() {         
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



InitTextRender();
Loop();


function InitTextRender() {    
    var textElements = [];

    textElements.push(
        new TextElement(titleText, titleTextStyle, titleFontFamily, 50, 150, titleFontSize));

    textElements.push(
        new TextElement("todo: animate text!", "skyblue", titleFontFamily, 80, 255, 40));

    textElements.push(
        new TextElement("todo: create todo style menu!", "skyblue", titleFontFamily, 80, 295, 40));

    textRender = new TextRender(textElements);
};


function PopulateParalaxBackgrounds() {

    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(1, new Rectangle(250, 0, 512, 512), 1, 0.01));    

    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(2, new Rectangle(0, 150, 384, 384), 1, 0.02));    
    
    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(3, new Rectangle(500, 250, 256, 256), 0, 0.03));             
};


function Loop() {           
    UpdateDelta();  
    
    if (paralaxBackgroundSlider) {
        Update();
        Draw();
    }

    if (animation) {
        animation.Update(delta);
        animation.Draw(ctx);
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
    
    textRender.Update(delta);
};

function Draw() {    
    ctx.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);    
        
    if (this.backgroundImageReady) {
        drawImage(ctx, this.backgroundImage, {x:bounds.X - 155, y:bounds.Y - 100, width:bounds.W, height:bounds.H}, null);
    }
    
    paralaxBackgroundSlider.Draw(ctx); 
        
    textRender.Draw(ctx);
};