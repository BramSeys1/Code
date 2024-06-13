let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;
canvas.style.background = "green";

//tekenen van een vierkant
context.fillStyle = "red";
context.fillRect(0, 0, 50, 50);

//tekenen van een cirkel
context.fillStyle = "blue";
context.beginPath();
context.arc(150, 150, 50, 0, Math.PI * 2, true);
context.stroke();
context.closePath();

//tekenen van een rechthoek
context.fillStyle = "yellow";
context.fillRect(250, 250, 50, 80);

