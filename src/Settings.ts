import {SliderSetting} from "./Interfaces";

export const timeDivSetting: SliderSetting = {
    text: "time divide",
    min: 0.01,
    max: 15,
    default: 7
}

export const sizeScaleSetting: SliderSetting = {
    text: "size scale",
    min: 200,
    max: 2000,
    default: 1500
}

export const distScaleSetting: SliderSetting = {
    text: "distance scale",
    min: 10e3,
    max: 10e7,
    default: 10e5
}

export const starScaleSetting: SliderSetting = {
    text: "star scale",
    min: 1,
    max: 300,
    default: 100
}