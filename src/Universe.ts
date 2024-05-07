import {Body} from "./Bodies";
import {myp5} from "./main";
import p5 from "p5";
import {GUI} from "./GUI";
import * as s from "./Settings";

export class Universe {
    guiElement: GUI

    timeDiv?: p5.Element
    sizeScale?: p5.Element
    distScale?: p5.Element
    starScale?: p5.Element

    bodyArr: Body[]
    position = myp5.createVector(0, 0)
    scale = 1

    constructor(bodyArr: Body[]) {
        this.bodyArr = bodyArr

        this.guiElement = new GUI({
            title: "solar system",
            x: 20,
            y: 20
        })

        this.initGUI()

        for (const body of bodyArr) {
            body.universe = this
        }
    }

    static getValue(obj: p5.Element) {
        return Number(obj.value())
    }

    initGUI() {
        this.timeDiv = this.guiElement.addSlider(s.timeDivSetting)
        this.sizeScale = this.guiElement.addSlider(s.sizeScaleSetting)
        this.distScale = this.guiElement.addSlider(s.distScaleSetting)
        this.starScale = this.guiElement.addSlider(s.starScaleSetting)
    }

    pixelsToDist(pixels: number) {
        return (pixels * (Universe.getValue(this.distScale!) / devicePixelRatio))
    }

    distToPixels(distance: number) {
        return (distance / (Universe.getValue(this.distScale!) / devicePixelRatio))
    }

    getModPos(vector: p5.Vector) {
        return vector.copy()
            .sub(this.position)
            .div(this.scale)
    }

    run() {
        for (const body of this.bodyArr) {
            body.update()
        }
    }

    updatePosition(vector: p5.Vector) {
        this.position.add(vector)
    }

    updateScale(scale: number) {
        let calc = this.scale + (scale / 20)
        calc = calc >= 0.01 ? calc : 0.01
        this.scale = calc
    }

    getTime() {
        return performance.now() / Universe.getValue(this.timeDiv!)
    }

    logAll() {
        for (const body of this.bodyArr) {
            console.log(body)
        }
    }
}