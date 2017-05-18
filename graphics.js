function drawFillRect(ctx, style, rect) {            
    ctx.fillStyle = style; 
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);                                        
};

function drawStrokeRect(ctx, style, rect, strokeWidth = 1) {
    ctx.strokeStyle = style;  
    ctx.strokeWidth = strokeWidth;
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
}

function drawFillArc(ctx, style, centerX, centerY, radius, startAngle = 0, endAngle = 2 * Math.PI) {
    ctx.fillStyle = style;
    ctx.beginPath();    
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.fill();
};

function drawFillText(ctx, style, fontFamily, fontSize, text, x, y) {
    ctx.fillStyle = style;
    ctx.font = fontSize + "px" + fontFamily;        
    ctx.fillText(text, x, y);            
};

function drawImage(ctx, image, destinationRect, sourceRect = null) {
    if (sourceRect) { drawImageComplex(ctx, image, destinationRect, sourceRect); }
    else { drawImageSimple(ctx, image, destinationRect); }
};    

function drawImageSimple(ctx, image, destinationRect) {
    ctx.drawImage(image, destinationRect.x, destinationRect.y, destinationRect.width, destinationRect.height);
};

function drawImageComplex(ctx, image, destinationRect, sourceRect) {
    ctx.drawImage(image, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height, 
        destinationRect.x, destinationRect.y, destinationRect.width, destinationRect.height);
};