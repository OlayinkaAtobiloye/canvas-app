

export const Triangle = () => {
   
    const handleDragEnd = () => {

    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData('shape', `TRIANGLE`);
    }


    return  <div draggable className="triangle" onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="62" viewBox="0 0 72 62" fill="none">
<path d="M2.78524 60.3766L35.908 3.00623L69.0308 60.3766H2.78524Z" fill="white" stroke="black" strokeWidth="3"/>
</svg>
    </div>
}