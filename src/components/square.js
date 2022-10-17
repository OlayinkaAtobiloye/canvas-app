export const Square = () => {
   
    const handleDragEnd = () => {

    };

    const handleDragStart = (e) => {
        console.log("drag start");
        e.dataTransfer.setData('shape', `SQUARE`);
    }


    return  <div draggable className="square" onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 57 57" fill="none">
<rect x="2.48242" y="2.13019" width="52.8428" height="52.8428" fill="white" stroke="black" strokeWidth="3"/>
</svg>
    </div>
}