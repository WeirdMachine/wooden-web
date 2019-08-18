import SGNode from "./SgNode";

class Triangle extends SGNode{

  private readonly vertices: any;
  private vertexPositionBuffer: any;

  private readonly webGlCtx: WebGLRenderingContext;
  private readonly vertexPositionAttribute: any;

  constructor(webGlCtx: WebGLRenderingContext, vertexPositionAttribute: any,  v1: any, v2: any, v3: any) {
    super();
    this.webGlCtx = webGlCtx;
    this.vertexPositionAttribute = vertexPositionAttribute;

    this.vertices = [
      v1[0], v1[1], v1[2],
      v2[0], v2[1], v2[2],
      v3[0], v3[1], v3[2]
    ];

    this.initBuffers();
  }

  public initBuffers(){
    this.vertexPositionBuffer = this.webGlCtx.createBuffer();
    this.webGlCtx.bindBuffer(this.webGlCtx.ARRAY_BUFFER, this.vertexPositionBuffer);
    this.webGlCtx.bufferData(this.webGlCtx.ARRAY_BUFFER, new Float32Array(this.vertices), this.webGlCtx.STATIC_DRAW);
  }

  public draw(){
    // bindBuffer() immer vor vertexAttribPointer() ausführen,
    // damit der gebundene Buffer in die zugehörige Shader Variable geladen wird!
    this.webGlCtx.bindBuffer(this.webGlCtx.ARRAY_BUFFER, this.vertexPositionBuffer);
    this.webGlCtx.vertexAttribPointer(this.vertexPositionAttribute, 3, this.webGlCtx.FLOAT, false, 0, 0);

    this.webGlCtx.drawArrays(this.webGlCtx.TRIANGLES, 0, 3);
  }
}

export default Triangle
