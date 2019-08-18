import axios from "axios";
import {mat4, vec3} from "gl-matrix";
import SGNode from "./SgNode";
import Triangle from "./Triangle";

class WebGL {

  private webGlCtx: WebGLRenderingContext;

  private fragmentShader: WebGLShader;
  private vertexShader: WebGLShader;

  private shaderProgram: WebGLProgram;

  private pMatrixUniform: WebGLUniformLocation;
  private vMatrixUniform: WebGLUniformLocation;
  private mMatrixUniform: WebGLUniformLocation;

  private vertexPositionAttribute: GLint;

  private modelMatrix = mat4.create();
  private viewMatrix = mat4.create();
  private projectionMatrix = mat4.create();

  public async webGLStart(canvas: HTMLCanvasElement) {

    const webgl = canvas.getContext("webgl");

    if (webgl === null) {
      console.log("WebGl is null!");
      return;
    }

    this.webGlCtx = webgl;

    this.webGlCtx.viewport(0, 0, canvas.width, canvas.height);

    await this.initShaders();
    this.webGlCtx.clearColor(0.0, 0.0, 0.0, 1.0);
    this.webGlCtx.enable(this.webGlCtx.DEPTH_TEST);
    this.webGlCtx.enable(this.webGlCtx.CULL_FACE);

    console.log(this.webGlCtx.getParameter(this.webGlCtx.VERSION));
    console.log(this.webGlCtx.getParameter(this.webGlCtx.SHADING_LANGUAGE_VERSION));

    // TODO: component as parameter
    // Zusammensetzen eines Dreieck
    const v1 = vec3.create();
    vec3.set(v1, -0.75, 0.75, 0.0);

    const v2 = vec3.create();
    vec3.set(v2, -0.75, -0.75, 0.0);

    const v3 = vec3.create();
    vec3.set(v3, 0.75, -0.75, 0.0);

    const triangle = new Triangle(this.webGlCtx, this.vertexPositionAttribute, v1, v2, v3);

    this.drawScene(triangle);
  }

  private createShader(tpye: GLenum, source: string): WebGLShader {
    const shader = this.webGlCtx.createShader(tpye);

    if (shader) {
      this.webGlCtx.shaderSource(shader, source);
      this.webGlCtx.compileShader(shader);

      // Check for any compilation error
      if (!this.webGlCtx.getShaderParameter(shader, this.webGlCtx.COMPILE_STATUS)) {
        console.log(this.webGlCtx.getShaderInfoLog(shader));
      }
      return shader
    }

    throw new Error('Could not create Shader!');

  }

  private async initShaders() {

    let fragmentShaderSource: string = '';
    let vertexShaderSource: string = '';

    await axios.get('/webgl/shader.frag')
      .then(response => fragmentShaderSource = response.data);

    await axios.get('/webgl/shader.vert')
      .then(response => vertexShaderSource = response.data);

    this.fragmentShader = this.createShader(this.webGlCtx.FRAGMENT_SHADER, fragmentShaderSource);
    this.vertexShader = this.createShader(this.webGlCtx.VERTEX_SHADER, vertexShaderSource);

    const maybeShaderProgram: WebGLProgram | null = this.webGlCtx.createProgram();

    if (maybeShaderProgram === null) {
      console.log("Could'nt Init shader prgram!");
      return;
    }

    this.shaderProgram = maybeShaderProgram;

    this.webGlCtx.attachShader(this.shaderProgram, this.fragmentShader);
    this.webGlCtx.attachShader(this.shaderProgram, this.vertexShader);
    this.webGlCtx.linkProgram(this.shaderProgram);

    if (!this.webGlCtx.getProgramParameter(this.shaderProgram, this.webGlCtx.LINK_STATUS)) {
      console.log("Could not initialise shaders");
      return;
    }

    this.webGlCtx.useProgram(this.shaderProgram);

    this.vertexPositionAttribute = this.webGlCtx.getAttribLocation(this.shaderProgram, "aVertexPosition");
    this.webGlCtx.enableVertexAttribArray(this.vertexPositionAttribute);

    const pMatrixUniform = this.webGlCtx.getUniformLocation(this.shaderProgram, "uProjectionMatrix");
    const vMatrixUniform = this.webGlCtx.getUniformLocation(this.shaderProgram, "uViewMatrix");
    const mMatrixUniform = this.webGlCtx.getUniformLocation(this.shaderProgram, "uModelMatrix");

    if (pMatrixUniform === null || vMatrixUniform === null || mMatrixUniform === null) {
      console.log("Could not initialise uniforms!");
      return;
    } else {
      this.pMatrixUniform = pMatrixUniform;
      this.vMatrixUniform = vMatrixUniform;
      this.mMatrixUniform = mMatrixUniform;
    }

  }

  private drawScene(component: SGNode) {

    this.webGlCtx.viewport(0, 0, 500, 500);

    // tslint:disable-next-line:no-bitwise
    this.webGlCtx.clear(this.webGlCtx.COLOR_BUFFER_BIT | this.webGlCtx.DEPTH_BUFFER_BIT);

    mat4.identity(this.projectionMatrix);
    mat4.identity(this.viewMatrix);
    mat4.identity(this.modelMatrix);

    this.webGlCtx.uniformMatrix4fv(this.pMatrixUniform, false, this.projectionMatrix);
    this.webGlCtx.uniformMatrix4fv(this.vMatrixUniform, false, this.viewMatrix);
    this.webGlCtx.uniformMatrix4fv(this.mMatrixUniform, false, this.modelMatrix);

    component.draw();

    // TODO: webg ctx is not available in callback make it global?
    // Ermöglicht Echtzeit Rendering und Animation
    // window.requestAnimationFrame(this.drawScene)
  }

}

export default WebGL
