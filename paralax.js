// TODO:
// Create Paralax Background Slider Object.

ParalaxBackground = function(destination, direction, increment) {    
    this.Destination = destination;
    this.Direction = direction;
    this.Increment = increment;    
}

ParalaxBackground.prototype.Update = function(drawBounds, delta) {   
   if (this.Destination.X < drawBounds.X) {
    this.Destination.X = drawBounds.X;
    this.Direction = 1; // Go Right
   }

   if (this.Destination.X + this.Destination.W > drawBounds.W) {
       this.Destination.X = drawBounds.W - this.Destination.W;
       this.Direction = 0; // Go Left
   }

   var increment = this.Direction == 0 ? -this.Increment : this.Increment;
   this.Destination.X += increment;
}

ParalaxBackground.prototype.Draw = function(ctx, image) {
    var rect = {x: this.Destination.X, y: this.Destination.Y, width: this.Destination.W, height: this.Destination.H}
    drawImage(ctx, image, rect, null);
};




ParalaxBackgroundSlider = function(image) {
    this.Backgrounds = [];
    this.Image = image;
}

ParalaxBackgroundSlider.prototype.Update = function(drawBounds, delta) {
    for (var i = 0; i < this.Backgrounds.length; i++) {
        this.Backgrounds[i].Update(drawBounds, delta);
    }    
}

ParalaxBackgroundSlider.prototype.Draw = function(ctx) {
    for (var i = 0; i < this.Backgrounds.length; i++) {
        this.Backgrounds[i].Draw(ctx, this.Image);
    }    
};