export const Rectange = () => {
   
    // const box = (x,y,w,h,rgb) => {
    //     this.x = x,
    //     this.y = y;
    //     this.xS = x; //saving x
    //     this.yS = y; //saving y
    //     this.w = w;
    //     this.h = h;
    //     this.rgb = rgb;
    
    //     //to determine if the box is being draged
    //     this.draging = false;
    // }

    const handleDragEnd = () => {

    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData('shape', "RECTANGLE");
    }


    return  <div draggable className="rectangle" onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="50" viewBox="0 0 96 50" fill="none">
<rect x="1.67773" y="2.11011" width="91.9336" height="45.8629" fill="white" stroke="black" strokeWidth="3"/>
</svg>
    </div>
}