import * as React from "react";
import Board from "./Board"

declare interface IState {
    history: Array<{squares: string[]}>;
    xIsNext: boolean
    stepNumber: number;
}

class Game extends React.Component<{}, IState> {

    private static calculateWinner(squares: string[]) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
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

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
        this.handleClick = this.handleClick.bind(this)
    }

    public render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = Game.calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });


        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={this.handleClick}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    private handleClick(i: number) {
        return () => {

            const history = this.state.history.slice(0, this.state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if (Game.calculateWinner(squares) || squares[i]) {
                return;
            }
            squares[i] = this.state.xIsNext ? 'X' : 'O';
            this.setState({
                history: history.concat([{squares}]),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext,
            });
        }
    }

    private jumpTo(step: number) {
        return () => {
            this.setState({
                stepNumber: step,
                xIsNext: (step % 2) === 0,
            });
        }
    }

}

export default Game;
