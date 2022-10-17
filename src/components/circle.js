import { useState } from "react";

export const Circle = () => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnd = () => {

    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData('shape', "CIRCLE");
    }

    return <div draggable className="circle" onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
<circle cx="30.0022" cy="30.0835" r="27.9734" fill="white" stroke="black" strokeWidth="3"/>
</svg>
    </div>
}