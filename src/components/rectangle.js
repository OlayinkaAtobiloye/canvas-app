export const Rectange = () => {
   
    const handleDragEnd = () => {

    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData('shape', "RECTANGLE");
    }


    return  <div draggable className="rectangle" onDragEnd={handleDragEnd} onDragStart={handleDragStart}><svg xmlns="http://www.w3.org/2000/svg" draggable={true}>
    <rect  width="40" height="40"
    stroke="black" fill="none" draggable={true}/>
    </svg>
    </div>
}