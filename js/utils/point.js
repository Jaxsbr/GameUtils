class Point {
    constructor(x, y) {
        this.X = x;
        this.Y = y;            
    }

    DistanceBetween(point) {
        let x = this.X - point.X;
        let y = this.Y - point.Y;
        return Math.sqrt(x * x - y * y);
    }

    Normalize(point) {
        let x = this.X - point.X;
        let y = this.Y - point.Y;
        let distance = Math.sqrt(x * x - y * y);
        return new Point(x / distance, y / distance);
    }
}