import {vec3} from "gl-matrix";
import SGNode from "./SgNode";
import Square from "./Square";

class Quader extends SGNode {

  private squares: Square[] = [];

  constructor(v1: vec3, v2: vec3, v3: vec3, v4: vec3, v5: vec3, v6: vec3, v7: vec3, v8: vec3) {
    super();
    this.squares.push(new Square(v1, v2 ,v3, v4));
    this.squares.push(new Square(v5, v6, v2, v1));
    this.squares.push(new Square(v4, v3, v7, v8));
    this.squares.push(new Square(v4, v8, v5, v1));
    this.squares.push(new Square(v3, v7, v6, v2));
    this.squares.push(new Square(v8, v7, v6, v5));
  }

  public draw(): void {
    for (const square of this.squares) {
      square.draw();
    }
  }

}

export default Quader
