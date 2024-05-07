import p5 from "p5";
import {OrbitBody} from "./Bodies";

export interface BodyData {
    name: string
    mass: number
    radius: number
    color?: p5.Color
    startPos?: p5.Vector
    satellites?: OrbitBody[]
}

export interface OrbitBodyData extends BodyData {
    eccentricity: number
    aphelion: number
    perihelion: number
}

export interface GravityBodyData extends BodyData {
    velocity?: p5.Vector
}

export interface GUIElement {
    title: string
    x: number
    y: number
}

export interface SliderSetting {
    text: string
    min: number
    max: number
    default: number
    step?: number
}