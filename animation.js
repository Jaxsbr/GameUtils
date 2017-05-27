Animation = function(image, speed, frameWidth, frameHeight, frameCount) {	
	this.Image = image;	
	this.Speed = speed;	
	this.FrameWidth = frameWidth;
	this.FrameHeight = frameHeight;
	this.FrameCount = frameCount;
	this.FrameIndex = 0;	
	this.Ellapsed = 0;
    this.SourceBounds = {x:0, y:0, width:0, height:0 };
    this.DestinationBounds = {x:0, y:0, width:0, height:0 };
};

Animation.prototype.Update = function(destination, delta) {
	this.DestinationBounds = destination;
	this.UpdateFrameIndex();
    // NOTE: No support for multiple rows, hardcoded y:0 enforces top row only.
    this.SourceDestination = { x:this.FrameIndex * this.FrameWidth, y:0, width:this.FrameWidth, height:this.FrameHeight };        
};

Animation.prototype.UpdateFrameIndex = function() {    
	this.Ellapsed += delta;
	if (this.Ellapsed >= this.Speed) {
		this.Ellapsed = 0;		
		this.FrameIndex += 1;
		if (this.FrameIndex >= this.FrameCount) { this.FrameIndex = 0; }		
	}	
};

Animation.prototype.Draw = function(ctx) {
    drawImage(ctx, this.Image, this.DestinationBounds, this.SourceDestination);
};