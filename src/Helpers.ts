import p5 from "p5";
import {myp5} from "./main";

export function drawLine(v1: p5.Vector, v2: p5.Vector, color: string, weight: number) {
    myp5.push()
    myp5.stroke(color)
    myp5.strokeWeight(weight)
    myp5.line(v1.x, v1.y, v2.x, v2.y)
    myp5.pop()

    myp5.push()
    myp5.stroke("green")
    myp5.strokeWeight(weight * 2)
    myp5.point(v1)
    myp5.pop()

    myp5.push()
    myp5.stroke("pink")
    myp5.strokeWeight(weight * 2)
    myp5.point(v2)
    myp5.pop()
}