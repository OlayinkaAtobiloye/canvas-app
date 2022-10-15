import { useEffect, useRef } from "react";
import "./canvas.css";
import { connect } from "react-redux";


const Canvas = (props) => {
    const ref = useRef(null);

   
  useEffect(() => {
    const canvas = ref.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }, []);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    draw(canvas);
  }, [props.rectangles, props.circles]);


 
  
  

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const shape = e.dataTransfer.getData("shape");
    let x, y;
    y = e.clientY;
    x = e.clientX;
    props.createShape(x, y, shape);
    // drawShape(id, e);
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

   defaultStyles(canvas);
   console.log(canvas.strokeStyle)

    if (shapeId === "circle") {
      const radius = 25;
     
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI, false);
      context.fill();
      context.strokeStyle = "black";
      context.stroke();
    }
  };

  const draw = (c) => {
   const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width,c.height);
    
    //Boxes!
    for (var i = 0; i < props.rectangles.length; i++) {
        var b = props.rectangles[i];

        //End of new code for update
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.stroke();
    }

    //Circles!
    ctx.fillStyle = 'black';
    ctx.beginPath();
    for (var i = 0; i < props.circles.length; i++) {
        var b = props.circles[i];
        ctx.moveTo( b.x + b.radius, b.y ); // This was the line you were looking for
        ctx.arc(b.x, b.y, b.radius, 0, 2 * Math.PI, true);
        ctx.fill()
    }
    ctx.closePath();
    
    //Let's keep re-drawing this
    // requestAnimationFrame(draw);
}



const down = (event, canvas) => {
    event.preventDefault();
    let x, y;
    x = event.pageX - canvas.offsetLeft;
    y = event.pageY - canvas.offsetTop;
    
    for (var i = 0; i < props.rectangles.length; i++) {
        var b = props.rectangles[i];
        if (x > b.x && x < b.x+b.w && y > b.y && y < b.y + b.h) {
            props.setDraging(i, "RECTANGLE", true);
        }
    }

    for (var i = 0; i < props.circles.length; i++) {
        var b = props.circles[i];
        console.log(b.x, b.y, event.clientX, event.clientY)
        let h, w;
        h = b.radius;
        w = b.radius;
        if (x >= b.x && x <= b.x + b.radius) {
            console.log("mousedown");
            props.setDraging(i, "CIRCLE", true);
        }
    }
}

const move = (event, c) => {
    event.preventDefault();
    let x, y;
    event = event || window.event;
    x = event.pageX - c.offsetLeft;
    y = event.pageY - c.offsetTop;
    
    for (var i = 0; i < props.rectangles.length; i++) {
        var b = props.rectangles[i];
        if (b.draging) {
            props.moveShape(x, y, "RECTANGLE", i);
        }
    }

    for (var i = 0; i < props.circles.length; i++) {
        var b = props.circles[i];
        if (b.draging) {
            props.moveShape(x, y, "CIRCLE", i);
        }
    }
}

const up = (event, c) => {
    event.preventDefault();
    let x, y;
    event = event || window.event;
    x = event.pageX - c.offsetLeft;
    y = event.pageY - c.offsetTop;
    
    for (var i = 0; i< props.rectangles.length; i++) {
        var b = props.rectangles[i];
        if (b.draging) {
            //Let's see if the rectangle is inside the dropable area
            if (b.x < c.width) {
                //Yes is it!
                props.moveShape(x, y, "RECTANGLE", i)
                props.setDraging(i, "RECTANGLE", false);
            }
            else {
                //No it's not, sending it back to its ordiginal spot   
                props.moveShape(b.xS, b.yS, "RECTANGLE", i)
                props.setDraging(i, "RECTANGLE", false);               
            }

        }
    }

    for (var i = 0; i< props.circles.length; i++) {
        var b = props.circles[i];
        if (b.draging) {
            if (b.x > c.width/2) {
                //Yes is it!
                props.moveShape(x, y, "CIRCLE", i)
                props.setDraging(i, "CIRCLE", false);
            }
            else {
                //No it's not, sending it back to its ordiginal spot   
                props.moveShape(b.xS, b.yS, "CIRCLE", i)
                props.setDraging(i, "CIRCLE", false);               
            }

        }
    }
}

  const defaultStyles = (context) => {
    context.lineWidth = 0;
    context.strokeStyle = "white";
    context.shadowColor = "transparent";
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;
    context.globalCompositeOperation = "source-over";
  }


  return (
    <canvas
      className="canvas"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseDown={(e) => down(e, ref.current)}
      onMouseMove={(e) => move(e, ref.current)}
      onMouseUp={(e) => up(e, ref.current)}
      onMouseOut={(e) => up(e, ref.current)}
      ref={ref}
    ></canvas>
  );
};

const mapStateToProps = (state) => {
    return {
      rectangles: state.rectangles,
      circles: state.circles
    };
  };
  
const mapDispatchToProps = (dispatch) => {
return {
    createShape: (x, y, shape) => dispatch({ type: "CREATE_SHAPE" , shape: shape, coordinates: {x, y}}),
    moveShape: (x, y, shape, index) => dispatch({ type: "MOVE_SHAPE", shape: shape, index: index, coordinates: {x, y}}),
    setDraging: (index, shape, condition) => dispatch({type: "SET_DRAGING", shape: shape, index: index, condition: condition}),
    setState: (state) => dispatch({type: "SET_STATE", state: state})
};
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
