class Animation { 
	constructor(image, speed, frameWidth, frameHeight, frameCount) {	
		this.Image = image;	
		this.Speed = speed;	
		this.FrameWidth = frameWidth;
		this.FrameHeight = frameHeight;
		this.FrameCount = frameCount;
		this.FrameIndex = 0;	
		this.Ellapsed = 0;
    	this.SourceBounds = new Rectangle(0, 0, 0, 0);
    	this.DestinationBounds = new Rectangle(0, 0, 0, 0);
	}

	Update (destination, delta) {
		this.DestinationBounds = destination;
		this.UpdateFrameIndex();
		// NOTE: No support for multiple rows, hardcoded y:0 enforces top row only.
		this.SourceDestination = new Rectangle(this.FrameIndex * this.FrameWidth, 0, this.FrameWidth, this.FrameHeight); 
	}

	Draw (ctx) {
		drawImage(ctx, this.Image, this.DestinationBounds, this.SourceDestination);
	}
}