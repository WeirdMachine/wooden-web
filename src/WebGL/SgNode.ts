abstract class SGNode {

  public readonly children: SGNode[] = [];

  public getChildren() {
    return this.children;
  }

  public addChild(node: SGNode) {
    this.children.push(node);
  }

  public abstract draw(): void
}

export default SGNode
