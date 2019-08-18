import * as React from "react";
import {RefObject} from "react";
import WebGL from "../WebGL/WebGL";


class Forest extends React.Component {

  private readonly canvas: RefObject<HTMLCanvasElement>;

  private readonly webGl = new WebGL();

  constructor(props: Readonly<{}>) {
    super(props);
    this.canvas = React.createRef();

  }

  public componentDidMount() {
    if (this.canvas.current) {
      const canvas: HTMLCanvasElement = this.canvas.current;
      this.webGl.webGLStart(canvas).then(r => console.log("init done"));
    } else {
      console.log("No Canvas here :(")
    }
  }

  public render() {
    return (
      <div>
        <h1>Forest!</h1>
        <canvas id="glCanvas" ref={this.canvas} width={500} height={500}>
          Canvas element not supported. Please update your browser.
        </canvas>
      </div>
    )
  }

}

export default Forest
