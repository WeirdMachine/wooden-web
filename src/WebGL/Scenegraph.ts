class Scenegraph {

  private readonly root: any;
  private logString:  string;


  constructor(rootNode: any){
    this.root = rootNode;
    this.logString = "";
  }

  public draw (){

    this.logString = "";

    console.log("Zeichne Szenegraph: ");

    console.log("Bspl: {Knoten,[{Kind,[]}]}");

    this.drawTraversal(this.root);

    console.log(this.logString);
    console.log("Zeichnen des Szenegraphen abgeschlossen.");
  }

  private drawTraversal(node: any){

    this.logString += "{";

    this.logString += node.draw();

    this.logString += "[";

    const children = node.getChildren();

    for (const child of children) {

      this.drawTraversal(child);

    }
    this.logString += "]";

    this.logString += "}";
  }

}

export default Scenegraph
