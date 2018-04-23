TextElement = function(text, style, fontFamily, textX, textY, fontSize) {
    this.Text = text;
    this.Style = style;
    this.FontFamily = fontFamily
    this.TextX = textX;
    this.TextY = textY;    
    this.FontSize = fontSize;

    // TODO:
    // Create animation type, determine movement pattern.
};

TextElement.prototype.Update = function (delta) {
    // TODO:
    // Animation modes movement should be update here.
};

TextElement.prototype.Draw = function (ctx) {
    drawFillText(
        ctx, 
        this.Style, 
        this.FontFamily, 
        this.FontSize, 
        this.Text, 
        this.TextX, 
        this.TextY);
};



TextRender = function(textElements) {
    this.TextElements = textElements;
};

TextRender.prototype.Update = function(delta) {
    for (var i = 0; i <= this.TextElements.length; i++) {
        this.TextElements[i].Update(delta);
    }
};

TextRender.prototype.Draw = function(ctx) {
    for (var i = 0; i <= this.TextElements.length; i++) {
        this.TextElements[i].Draw(delta);
    }
};