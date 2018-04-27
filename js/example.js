
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
    PopulateParalaxBackgrounds();
    PopulateFloatyBackgrounds();
};
image.src = "img/trees.png";

var backgroundImageReady = false;
var backgroundImage = new Image();
backgroundImage.onload = function() {
    backgroundImageReady = true;
};
backgroundImage.src = "img/background.png";
var backgroundImageBounds = new Rectangle(bounds.X, bounds.Y, bounds.W, bounds.H);

   


InitTextRender();
Loop();


function InitTextRender() {    
    textRender = new TextRender();

    // TODO: Implement ability to group and space text elements.
    // Reduce required manual input of x and y coords.
    // E.g : group1[header, item1, item2] group2[header, item1, item2]

    textRender.AddTextElement(new TextElement(titleText, titleTextStyle, titleFontFamily, 20, 75, titleFontSize));
    textRender.AddTextElement(new TextElement("Animations", "yellow", titleFontFamily, 80, 125, 40));
    textRender.AddTextElement(new TextElement("Text Rendering", "yellow", titleFontFamily, 80, 165, 40));
    textRender.AddTextElement(new TextElement("Paralax Backgrounds", "yellow", titleFontFamily, 80, 205, 40));    

    textRender.AddTextElement(new TextElement("TODO: ", titleTextStyle, titleFontFamily, 20, 450, titleFontSize));
    textRender.AddTextElement(new TextElement("GameUtils: Update main page with feature demos", "orange", titleFontFamily, 80,500, 40));
    textRender.AddTextElement(new TextElement("GameUtils: Build and packaging investigation", "orange", titleFontFamily, 80, 550, 40));
    textRender.AddTextElement(new TextElement("GameUtils: Implement image loading class", "orange", titleFontFamily, 80, 600, 40));
    textRender.AddTextElement(new TextElement("TextRender: Implement TextElementGroup class", "yellow", titleFontFamily, 80, 650, 40));
    textRender.AddTextElement(new TextElement("TextRender: Implement TextElementGroup class", "yellow", titleFontFamily, 80, 700, 40));
    textRender.AddTextElement(new TextElement("TextRender: Add adjustable text shadows", "yellow", titleFontFamily, 80, 750, 40));
};


function PopulateParalaxBackgrounds() {
    let scrollingMode = 0; // TODO: Create global setting;

    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(4, new Rectangle(0, 600, bounds.W, bounds.H), 1, 50, scrollingMode, image));    

    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(4, new Rectangle(-bounds.W, 600, bounds.W, bounds.H), 1, 50, scrollingMode, image));               
};

function PopulateFloatyBackgrounds() { 
    let pacingMode = 1; // TODO: Create global setting;

    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(1, new Rectangle(250, 0, 512, 512), 1, 0.01, pacingMode, image));    

    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(2, new Rectangle(0, 150, 384, 384), 1, 0.02, pacingMode, image));    

    paralaxBackgroundSlider.Backgrounds.push(    
        new ParalaxBackground(3, new Rectangle(500, 250, 256, 256), 0, 0.03, pacingMode, image));  
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
    textRender.Update(delta);
    animation.Update(animationDestination, delta);    
};

function Draw() {    
    ctx.clearRect(bounds.X, bounds.Y, bounds.W, bounds.H);    
        
    if (this.backgroundImageReady) {
        drawImage(ctx, this.backgroundImage, backgroundImageBounds, null);
    }
    
    paralaxBackgroundSlider.Draw(ctx);         
    
    animation.Draw(ctx);

    textRender.Draw(ctx);
};