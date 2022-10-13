import { useEffect } from "react";
import "./canvas.css";

export const Canvas = () => {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    drawShape(id, e);
    console.log(e);
  };

  const drawShape = (shapeId, e) => {
    let x, y;
    y = e.clientY;
    x = e.clientX;
    const canvas = document.querySelector("canvas");

    const context = canvas.getContext("2d");
    var rect = canvas.getBoundingClientRect();
    x = x - rect.left;
    y = y - rect.top;

    console.log(x, y, "rect left = ", rect.left, "rect top = ", rect.top);

    if (shapeId === "circle") {
      const radius = 25;

      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI, false);
      context.fillStyle = "green";
      context.fill();
      context.lineWidth = 5;
      context.strokeStyle = "black";
      context.stroke();
    }
    if (shapeId === "rectangle") {
      context.beginPath();
      context.rect(x, y, 150, 100);
      context.stroke();
    }
  };

  return (
    <canvas
      className="canvas"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    ></canvas>
  );
};
