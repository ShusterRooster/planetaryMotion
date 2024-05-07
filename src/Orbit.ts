import {OrbitBodyData} from "./Interfaces";
import {myp5} from "./main";
import {G} from "./Constants";
import {Body, OrbitBody} from "./Bodies";
import p5 from "p5";
import {sizeScaleSetting} from "./Settings";
import {Universe} from "./Universe";

export class Orbit {
    orbitBody: OrbitBody
    parentBody: Body | undefined

    eccentricity: number
    semiMajor: number
    semiMinor: number
    aphelion: number
    perihelion: number

    periTime = performance.now()
    ready = false

    constructor(orbit: OrbitBodyData, body: OrbitBody) {
        this.orbitBody = body

        this.eccentricity = orbit.eccentricity
        this.aphelion = orbit.aphelion
        this.perihelion = orbit.perihelion

        this.semiMajor = (orbit.aphelion + orbit.perihelion) / 2
        this.semiMinor = this.semiMajor * Math.sqrt(1 - (orbit.eccentricity ** 2))
    }

    setParent(body: Body) {
        this.parentBody = body
        this.ready = true
    }

    show() {
        myp5.push()
        myp5.stroke(255)

        myp5.strokeWeight(1 / this.universe!.scale)
        myp5.noFill()

        const center = this.getCenter()
        myp5.ellipse(center!.x, center!.y,
            this.universe!.distToPixels(this.semiMajor) * 2, this.universe!.distToPixels(this.semiMinor) * 2)
        myp5.pop()
    }

    update() {
        if (this.ready) {
            this.show()
            const E = this.eccAnomaly()

            // const x = this.universe!.distToPixels(this.semiMajor) * (Math.cos(E - this.eccentricity))
            const x = this.universe!.distToPixels(this.semiMajor) * (Math.cos(E))
            const y = this.universe!.distToPixels(this.semiMinor) * Math.sin(E)
            this.orbitBody.position = p5.Vector.add(myp5.createVector(x, y), this.getCenter())

            this.trackPeri()
        }
    }

    getPericenter() {
        const pos = this.parentBody!.position.copy()
        const x = pos.x - this.universe!.distToPixels(this.perihelion)
        return myp5.createVector(x, pos.y)
    }

    getCenter() {
        const peri = this.getPericenter()
        const val = myp5.createVector(peri.x + this.universe!.distToPixels(this.semiMajor), peri.y)
        // console.log(val)
        return val
    }

    trackPeri() {
        const req = (this.meanAnomaly() - Math.PI) % (Math.PI * 2)

        if (req <= 0.03) {
            this.periTime = this.universe!.getTime()
            // console.log(req)
        }
    }

    get universe() {
        return this.orbitBody!.universe
    }

    mu() {
        return G * (this.parentBody!.mass + this.orbitBody.mass)
    }

    orbitalPeriod() {
        return (Math.PI * 2) * Math.sqrt((this.semiMajor ** 3) / this.mu())
    }

    timeSincePeri() {
        return this.orbitBody.universe!.getTime() - this.periTime
    }

    //might not work bc of epoch?
    //assumes body is at pericenter at t0
    meanAnomaly(time = this.universe!.getTime()) {
        const meanMotion = Math.sqrt(this.mu() / (this.semiMajor ** 3))
        return Math.PI + (meanMotion * time)
    }

    eccAnomaly(time?: number) {
        let E = this.meanAnomaly(time)

        for (let i = 0; i < 10; i++) {
            E = this.meanAnomaly(time) + this.eccentricity * Math.sin(E)
        }

        return E
    }

    trueAnomaly() {
        const beta = this.eccentricity / (1 + Math.sqrt(1 - (this.eccentricity ** 2)))
        const top = (beta * Math.sin(this.eccAnomaly()))
        const bottom = 1 - beta * Math.cos(this.eccAnomaly())

        return this.eccAnomaly() + 2 * Math.atan(top / bottom)
    }

    trueAnomalyAlt() {
        const sqrt = Math.sqrt((1 + this.eccentricity) / (1 - this.eccentricity))
        return 2 * Math.atan(sqrt * Math.tan(this.eccAnomaly() / 2))
    }
}