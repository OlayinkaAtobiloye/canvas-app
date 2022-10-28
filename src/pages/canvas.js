import { useEffect, useRef, useState } from "react";
import "./canvas.css";
import { connect } from "react-redux";
import io from "socket.io-client";

const Canvas = (props) => {
    const ref = useRef(null);
    const socket = io("http://127.0.0.1:8000/");

   
    useEffect(() => {
        const canvas = ref.current;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        draw(canvas);
        socket.on('receive', (data) => { props.setState(data); draw(canvas)});
        return (() => {
              socket.disconnect()
          })
    }, []);



  useEffect(() => {
        const canvas = ref.current;
        const context = canvas.getContext("2d");
        draw(canvas);
        socket.on('receive', (data) => {  props.setState(data); draw(canvas)});
        return (() => {
            socket.disconnect()
        })
    }, [socket, props]);
  

    const handleDragOver = (e) => {
        e.preventDefault();
        socket.emit('send', { state: props.state });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const canvas = document.querySelector("canvas");
        const shape = e.dataTransfer.getData("shape");
        let x, y;
        y = e.clientY;
        x = e.clientX;
        var rect = canvas.getBoundingClientRect();
        x = x - rect.left;
        y = y - rect.top;
        props.createShape(x, y, shape);
        socket.emit('send', { state: props.state });
    };


    const draw = (c) => {
        const ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width,c.height);
        
        //Rectangles!
        for (var i = 0; i < props.rectangles.length; i++) {
            var b = props.rectangles[i];

            //End of new code for update
            ctx.fillRect(b.x, b.y, b.w, b.h);
        }

        //Squares!
        for (var i = 0; i < props.squares.length; i++) {
            var b = props.squares[i];
            //End of new code for update
            ctx.fillRect(b.x, b.y, b.w, b.h);
        }

        //Circles!
        
        for (var i = 0; i < props.circles.length; i++) {
            ctx.beginPath();
            var b = props.circles[i];
            ctx.moveTo( b.x + b.radius, b.y ); // This was the line you were looking for
            ctx.arc(b.x, b.y, b.radius, 0, 2 * Math.PI, true);
            ctx.fill()
            ctx.closePath();
        }
        
        //Triangles!
        ctx.fillStyle = 'black';
        for (var i = 0; i < props.triangles.length; i++) {
            var b = props.triangles[i];
            ctx.beginPath();
            ctx.moveTo(b.x, b.y)
            ctx.lineTo(b.x + b.w, b.y - b.w)
            ctx.lineTo(b.x + b.h, b.y)
            ctx.lineTo(b.x, b.y)
            ctx.fill()
            ctx.closePath()
        }
        ctx.closePath();

    }

    const deleteShape= (event, canvas) => {
        event.preventDefault();
        console.log("Delete shape")
        let x, y;
        y = event.clientY;
        x = event.clientX;
        var rect = canvas.getBoundingClientRect();
        x = x - rect.left;
        y = y - rect.top;
        if (event.detail === 2) {
            // it was a double click
            for (var i = 0; i < props.rectangles.length; i++) {
                var b = props.rectangles[i];
                if (x > b.x && x < b.x+b.w && y > b.y && y < b.y + b.h) {
                    props.delete(i, "RECTANGLE");
                }
            }
    
            for (var i = 0; i < props.squares.length; i++) {
                var b = props.squares[i];
                if (x > b.x && x < b.x+b.w && y > b.y && y < b.y + b.h) {
                    props.delete(i, "SQUARE");
                }
            }
    
            for (var i = 0; i < props.triangles.length; i++) {
                var b = props.triangles[i];
                // props.setDraging(i, "TRIANGLE", true);
                if (x > b.x && x < b.x+b.w && y > b.y && y < b.y + b.h) {
                    props.delete(i, "TRIANGLE");
                }
            }
    
            for (var i = 0; i < props.circles.length; i++) {
                var b = props.circles[i];
                var dx = b.x - x;
                var dy = b.y - y;
                if(dx * dx + dy*dy < b.radius * b.radius){
                    props.delete(i, "CIRCLE");
                  }
          }
       };
       socket.emit('send', { state: props.state });
    }



    const down = (event, canvas) => {
        event.preventDefault();
        let x, y;
        y = event.clientY;
        x = event.clientX;
        var rect = canvas.getBoundingClientRect();
        x = x - rect.left;
        y = y - rect.top;
        // x = event.pageX - canvas.offsetLeft;
        // y = event.pageY - canvas.offsetTop;
        
        for (var i = 0; i < props.rectangles.length; i++) {
            var b = props.rectangles[i];
            if (x > b.x && x < b.x+b.w && y > b.y && y < b.y + b.h) {
                props.setDraging(i, "RECTANGLE", true);
            }
        }

        for (var i = 0; i < props.squares.length; i++) {
            var b = props.squares[i];
            if (x > b.x && x < b.x+b.w && y > b.y && y < b.y + b.h) {
                props.setDraging(i, "SQUARE", true);
            }
        }

        for (var i = 0; i < props.triangles.length; i++) {
            var b = props.triangles[i];
            // props.setDraging(i, "TRIANGLE", true);
            if (x > b.x && x < b.x+b.w && y > b.y && y < b.y + b.h) {
                props.setDraging(i, "TRIANGLE", true);
            }
        }

        for (var i = 0; i < props.circles.length; i++) {
            var b = props.circles[i];
            var dx = b.x - x;
            var dy = b.y - y;
            if(dx * dx + dy*dy < b.radius * b.radius){
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

        for (var i = 0; i < props.squares.length; i++) {
            var b = props.squares[i];
            if (b.draging) {
                props.moveShape(x, y, "SQUARE", i);
            }
        }


        for (var i = 0; i < props.circles.length; i++) {
            var b = props.circles[i];
            if (b.draging) {
                props.moveShape(x, y, "CIRCLE", i);
            }
        }

        for (var i = 0; i < props.triangles.length; i++) {
            var b = props.triangles[i];
            if (b.draging) {
                props.moveShape(x, y, "TRIANGLE", i);
            }
        }
        socket.emit('send', {state: props.state  });  
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

        for (var i = 0; i< props.squares.length; i++) {
            var b = props.squares[i];
            if (b.draging) {
                //Let's see if the rectangle is inside the dropable area
                if (b.x < c.width) {
                    //Yes is it!
                    props.moveShape(x, y, "SQUARE", i)
                    props.setDraging(i, "SQUARE", false);
                }
                else {
                    //No it's not, sending it back to its ordiginal spot   
                    props.moveShape(b.xS, b.yS, "SQUARE", i)
                    props.setDraging(i, "SQUARE", false);               
                }

            }
        }

        for (var i = 0; i< props.triangles.length; i++) {
            var b = props.triangles[i];
            if (b.draging) {
                //Let's see if the rectangle is inside the dropable area
                if (b.x < c.width) {
                    //Yes is it!
                    props.moveShape(x, y, "TRIANGLE", i)
                    props.setDraging(i, "TRIANGLE", false);
                }
                else {
                    //No it's not, sending it back to its ordiginal spot   
                    props.moveShape(b.xS, b.yS, "TRIANGLE", i)
                    props.setDraging(i, "TRIANGLE", false);               
                }

            }
        }

        for (var i = 0; i< props.circles.length; i++) {
            var b = props.circles[i];
            if (b.draging) {
                if (b.x < c.width) {
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
        socket.emit('send', {state: props.state  });  
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
        onClick={(e) => deleteShape(e, ref.current)}
        ref={ref}
        ></canvas>
    );
    };

const mapStateToProps = (state) => {
    return {
      rectangles: state.rectangles,
      circles: state.circles,
      triangles: state.triangles,
      squares: state.squares,
      state: state
    };
  };
  
const mapDispatchToProps = (dispatch) => {
return {
    createShape: (x, y, shape) => dispatch({ type: "CREATE_SHAPE" , shape: shape, coordinates: {x, y}}),
    moveShape: (x, y, shape, index) => dispatch({ type: "MOVE_SHAPE", shape: shape, index: index, coordinates: {x, y}}),
    setDraging: (index, shape, condition) => dispatch({type: "SET_DRAGING", shape: shape, index: index, condition: condition}),
    setState: (state) => dispatch({type: "SET_STATE", state: state}),
    delete: (index, shape) => dispatch({type: "DELETE_SHAPE", shape: shape, index: index})
};
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
