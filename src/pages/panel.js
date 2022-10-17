import { Circle } from "../components/circle";
import { Rectange } from "../components/rectangle";
import { Square } from "../components/square";
import { Triangle } from "../components/triangle";
import "./panel.css";

export const Panel = () => {
    return <div className="panel">
        <h2>Shapes</h2>
        <div className="shapes">
        <Circle></Circle>
        <Rectange></Rectange>
        <Square></Square>
        {/* <Triangle></Triangle> */}
        </div>
    </div>
}