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
        const winner = this.calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + this.state.player;
        }

        return (
            <div>
                <div className="status">{status}</div>
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
            if (this.state.squares[i] !== null) {
                return
            }
            this.setState({
                player: this.playerO === this.state.player ? this.playerX : this.playerO,
                squares:
                    this.state.squares.map((square, index) => index === i ? this.state.player : square),
            })
        };
    }

    private calculateWinner(squares: string[]) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (const [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
}

export default Board;
