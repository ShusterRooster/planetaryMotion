import {BodyData, OrbitBodyData} from "./Interfaces";
import {Body, OrbitBody, Star} from "./Bodies";
import p5 from "p5";
import {Universe} from "./Universe";
import {GUI} from "./GUI";

//https://sunsistemo.js.org/report/sunsistemo.pdf

let universe: Universe
const canvas = document.getElementById("canvas");

function getPushArr(arr: any[], ...args: any[]) {
    for (const e of args) {
        arr.push(e)
    }

    return arr
}

const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight, canvas!)

        const mercuryData: OrbitBodyData = {
            name: "Mercury",
            mass: 0.33010e24,
            radius: 2440.5,
            color: p.color(135, 130, 110),
            perihelion: 46.000e6,
            aphelion: 69.818e6,
            eccentricity: 0.2056,
        }

        const venusData: OrbitBodyData = {
            name: "Venus",
            mass: 4.8673e24,
            radius: 6051.8,
            color: p.color(240, 230, 210),
            perihelion: 107.480e6,
            aphelion: 108.941e6,
            eccentricity: 0.0068,
        }

        const moonData: OrbitBodyData = {
            name: "Moon",
            mass: 0.07346e24,
            radius: 1737.4,
            perihelion: 0.3633e6,
            aphelion: 0.4055e6,
            eccentricity: 0.0549
        }

        const moon = new OrbitBody(moonData)

        const earthData: OrbitBodyData = {
            name: "Earth",
            mass: 5.972168e24,
            radius: 6378.1,
            color: p.color(0, 65, 106),
            perihelion: 147.095e6,
            aphelion: 152.100e6,
            eccentricity: 0.0167,
            satellites: [moon]
        }

        const marsData: OrbitBodyData = {
            name: "Mars",
            mass: 0.64169e24,
            radius: 3389.5,
            color: p.color(200, 100, 50),
            perihelion: 206.650e6,
            aphelion: 249.261e6,
            eccentricity: 0.0935,
        }

        const jupiterData: OrbitBodyData = {
            name: "Jupiter",
            mass: 1898.13e24,
            radius: 69911,
            color: p.color(230, 210, 160),
            perihelion: 740.595e6,
            aphelion: 816.363e6,
            eccentricity: 0.0487,
        }

        const saturnData: OrbitBodyData = {
            name: "Saturn",
            mass: 568.32e24,
            radius: 58232,
            color: p.color(220, 200, 180),
            perihelion: 1357.554e6,
            aphelion: 1506.527e6,
            eccentricity: 0.0520,
        }

        const uranusData: OrbitBodyData = {
            name: "Uranus",
            mass: 86.811e24,
            radius: 25362,
            color: p.color(160, 180, 200),
            perihelion: 2732.696e6,
            aphelion: 3001.390e6,
            eccentricity: 0.0469,
        }

        const neptuneData: OrbitBodyData = {
            name: "Neptune",
            mass: 102.409e24,
            radius: 24622,
            color: p.color(140, 160, 90),
            perihelion: 4471.050e6,
            aphelion: 4558.857e6,
            eccentricity: 0.0097,
        }

        const mercury = new OrbitBody(mercuryData)
        const venus = new OrbitBody(venusData)
        const earth = new OrbitBody(earthData)
        const mars = new OrbitBody(marsData)
        const jupiter = new OrbitBody(jupiterData)
        const saturn = new OrbitBody(saturnData)
        const uranus = new OrbitBody(uranusData)
        const neptune = new OrbitBody(neptuneData)

        const planets = [
            mercury, venus, earth,
            mars, jupiter, saturn,
            uranus, neptune]

        const sunData: BodyData = {
            name: "Sun",
            radius: 696300,
            mass: 1.9885e30,
            startPos: p.createVector(window.innerWidth, window.innerHeight).div(2),
            color: p.color(255, 253, 0),
            // @ts-ignore
            satellites: planets
        }

        const sun = new Star(sunData)
        universe = new Universe(getPushArr(planets, sun))
        // universe = new Universe([sun])
        universe.logAll()
    };

    p.draw = () => {
        p.background('#1b0326')

        p.scale(universe.scale)
        universe.run()
    };

    p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight)
    }
};

export const myp5 = new p5(sketch)

//-delta is up
//+delta is down
canvas!.addEventListener('wheel', function wheel(event) {
    universe.updateScale(event.deltaY)
});


myp5.mouseDragged = (event: MouseEvent) => {
    const prev = myp5.createVector(myp5.pmouseX, myp5.pmouseY)

    const curPos = myp5.createVector(myp5.mouseX, myp5.mouseY)
    const diff = p5.Vector.sub(curPos, prev).mult(-1).mult(0.75)
    universe.updatePosition(diff)
}