let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;
canvas.style.background = "green";


class Circle {

  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
    context.stroke();
    context.closePath();
  }
}

let all_circles = [];

let createCircle = function(circle) {
  circle.draw(context);
}

for (let i = 0; i < 10; i++) {
  let random_x = Math.random() * width;
  let random_y = Math.random() * width;
  let circle = new Circle(random_x, random_y, 25, "red");
  all_circles.push(circle);
  createCircle(all_circles[i]);
}
