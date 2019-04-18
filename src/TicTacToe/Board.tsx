import * as React from 'react';
import Square from './Square'

declare interface IState {
    player: string;
    squares: string[];
}

class Board extends React.Component<{}, IState> {
    private playerX: string = 'X';
    private playerO: string = 'O';

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            player: this.playerO,
            squares: Array(9).fill(null)
        };
    }

    public render() {
        return (
            <div>
                <div className="status">Next player: {this.state.player}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

    private renderSquare(i: number) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={this.handleClick(i)}
            />
        );
    }

    private handleClick(i: number) {
        return () => {
                this.setState({
                    player: this.playerO === this.state.player ? this.playerX : this.playerO,
                    squares:
                        this.state.squares.map((square, index) => index === i ? this.state.player : square),
                })
        };
    }
}

export default Board;
