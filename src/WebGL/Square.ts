import {vec3} from "gl-matrix";
import SGNode from "./SgNode";
import Triangle from "./Triangle";

class Square extends SGNode {
  private triangle1: Triangle;
  private triangle2: Triangle;

  constructor(v1: vec3, v2: vec3, v3: vec3, v4: vec3) {
    super();
    this.triangle1 = new Triangle(v1, v2, v3);
    this.triangle2 = new Triangle(v3, v4, v1);

  }

  public draw(): void {
    this.triangle1.draw();
    this.triangle2.draw();
  }

}

export default Square
