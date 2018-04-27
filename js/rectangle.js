class Rectangle {
    constructor (x, y, w, h) {
        this.X = x;
        this.Y = y;
        this.W = w;
        this.H = h;

        this.Left = this.X;
        this.Top = this.Y;
        this.Right = 0;
        this.Botton = 0;
        this.Centre = new Point(0, 0);

        this.Update();
    }

    Update() {
        this.Left = this.X;
        this.Top = this.Y;
        this.Right = this.Left + this.W;
        this.Botton = this.Top + this.H;

        this.Centre.X = this.X + (this.W / 2);
        this.Centre.Y = this.Y + (this.H / 2);
    }

    Intersect(rectangle) {
        return !(rectangle.Left > this.Right ||
                rectangle.Right < this.Left ||
                rectangle.Left > this.Bottom ||
                rectangle.Bottom < this.Top);
    }

    Contains(rectangle) {
        return (this.Left <= rectangle.Left &&
                rectangle.Right <= this.Right &&
                this.Top <= rectangle.Top &&
                rectangle.Bottom <= this.Bottom);
    }
}