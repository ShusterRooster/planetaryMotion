import {GUIElement, SliderSetting} from "./Interfaces";
import p5 from "p5";
import {myp5} from "./main";
import {Universe} from "./Universe";

export class GUI {
    title: string
    div: p5.Element
    following = false

    constructor(gui: GUIElement) {
        this.title = gui.title

        const div = myp5.createDiv()
        div.id('GUIMain')
        div.position(gui.x, gui.y)

        const text = myp5.createElement('h2', this.title)
        div.child(text)

        myp5.doubleClicked = (event: MouseEvent) => {
            this.following = !this.following
        }

        myp5.mouseMoved = (event: MouseEvent) => {
            if(this.following) {
                div.position(event.clientX, event.clientY)
            }
        }

        this.div = div
    }

    addText(text: string, div: p5.Element) {
        const t = myp5.createElement('h3', text)
        div.child(t)
    }

    childDiv() {
        const div = myp5.createDiv()
        div.class('GUIChild')
        this.div.child(div)
        return div
    }

    addResetButton(slider: p5.Element, setting: SliderSetting) {

    }

    addSlider(setting: SliderSetting) {
        const div = this.childDiv()
        this.addText(setting.text, div)

        const slider = myp5.createSlider(setting.min, setting.max,
            setting.default, setting.step)
        div.child(slider)

        const text = myp5.createElement('h4', String(slider.value()))
        text.position()

        return slider
    }
}