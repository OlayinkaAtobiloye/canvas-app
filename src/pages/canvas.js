import "./canvas.css";

export const Canvas = () => {
    const handleDragOver = (e) => {
        e.preventDefault()
    }
    const handleDrop = (e) => {
        e.preventDefault()
        const id = e.dataTransfer.getData('text');
        drawShape(id, e);
        console.log(e)
    }

    const drawShape = (shapeId, e) => {
        let x, y;
        y = e.clientY;
        x = e.clientX;
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext('2d');
        var rect = canvas.getBoundingClientRect();
        x = x - rect.left;
        y = y - rect.top;

        if (shapeId == "circle"){
            console.log(x, y);
            const radius = 25;

            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI, false);
            context.fillStyle = 'green';
            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = "black";
            context.stroke();
        }
        if (shapeId == "rectangle"){
            console.log(x, y);
            context.beginPath();
            context.rect(20, 20, 150, 100);
            context.stroke();
        }
    }

    return <canvas className="canvas" onDragOver={handleDragOver}
    onDrop={handleDrop}></canvas>
}