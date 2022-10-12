import { Circle } from "../components/circle";
import { Rectange } from "../components/rectangle";
import "./panel.css";

export const Panel = () => {
    return <div className="panel">
        <p>Shapes</p>
        <div className="shapes">
        <Circle></Circle>
        <Rectange></Rectange>
        </div>
    </div>
}