import {vec3} from "gl-matrix";
import SGNode from "./SgNode";

class Triangle extends SGNode {

  // Todo: eliminate this
  public static webGlCtx: WebGLRenderingContext;
  public static vertexPositionAttribute: any;

  private readonly vertices: any;
  private vertexPositionBuffer: any;

  constructor(v1: vec3, v2: vec3, v3: vec3) {
    super();

    this.vertices = [
      v1[0], v1[1], v1[2],
      v2[0], v2[1], v2[2],
      v3[0], v3[1], v3[2]
    ];

    this.initBuffers();
  }

  public initBuffers(){
    this.vertexPositionBuffer = Triangle.webGlCtx.createBuffer();
    Triangle.webGlCtx.bindBuffer(Triangle.webGlCtx.ARRAY_BUFFER, this.vertexPositionBuffer);
    Triangle.webGlCtx.bufferData(Triangle.webGlCtx.ARRAY_BUFFER, new Float32Array(this.vertices), Triangle.webGlCtx.STATIC_DRAW);
  }

  public draw(){
    // bindBuffer() immer vor vertexAttribPointer() ausführen,
    // damit der gebundene Buffer in die zugehörige Shader Variable geladen wird!
    Triangle.webGlCtx.bindBuffer(Triangle.webGlCtx.ARRAY_BUFFER, this.vertexPositionBuffer);
    Triangle.webGlCtx.vertexAttribPointer(Triangle.vertexPositionAttribute, 3, Triangle.webGlCtx.FLOAT, false, 0, 0);

    Triangle.webGlCtx.drawArrays(Triangle.webGlCtx.TRIANGLES, 0, 3);
  }
}

export default Triangle
