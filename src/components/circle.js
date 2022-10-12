import { useState } from "react";

export const Circle = () => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnd = () => {

    };

    const handleDragStart = (e) => {
        console.log("drag start");
        e.dataTransfer.setData('text', `circle`);
    }

    return <div draggable className="circle" onDragEnd={handleDragEnd} onDragStart={handleDragStart}><svg xmlns="http://www.w3.org/2000/svg">
    <circle r="25" cx="25" cy="25" stroke="black" fill="none"/>
    </svg>
    </div>
}