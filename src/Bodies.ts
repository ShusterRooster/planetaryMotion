import p5 from "p5";
import {BodyData, GravityBodyData, OrbitBodyData} from "./Interfaces";
import {Universe} from "./Universe";
import {myp5} from "./main";
import {Orbit} from "./Orbit";

export class Body {
    name: string
    radius: number
    mass: number
    _position: p5.Vector
    color: p5.Color
    _universe: Universe | undefined

    constructor(body: BodyData) {
        this.name = body.name
        this._position = body.startPos || myp5.createVector(0, 0)
        this.radius = body.radius
        this.mass = body.mass
        this.color = body.color || myp5.color(255)

        this.initSatellites(body.satellites)
    }

    initSatellites(satArr: OrbitBody[] | undefined) {
        if(satArr) {
            for (const sat of satArr) {
                sat.orbit.setParent(this)
            }
        }
    }

    get position() {
        return this.universe!.getModPos(this._position)
    }

    set position(pos) {
        this._position = pos
    }

    show() {
        const radius = this.radius / Universe.getValue(this.universe!.sizeScale!)
        myp5.push()
        myp5.noStroke()
        myp5.fill(this.color)
        myp5.circle(this.position.x, this.position.y, radius * 2)
        myp5.pop()
    }

    get universe(): Universe | undefined {
        return this._universe
    }

    set universe(universe: Universe) {
        this._universe = universe
    }

    update() {
        this.show()
    }
}

export class Star extends Body {
    constructor(body: BodyData) {
        super(body)
    }

    show() {
        const radius = (this.radius / Universe.getValue(this.universe!.starScale!)) /Universe.getValue(this.universe!.sizeScale!)
        myp5.push()
        myp5.noStroke()
        myp5.fill(this.color)
        myp5.circle(this.position.x, this.position.y, radius * 2)
        myp5.pop()
    }

}

export class OrbitBody extends Body {
    orbit: Orbit

    constructor(body: OrbitBodyData) {
        super(body);
        this.orbit = new Orbit(body, this)
    }

    get position() {
        return this._position
    }

    set position(pos) {
        this._position = pos
    }

    update() {
        this.orbit.update()
        super.show()
    }

}