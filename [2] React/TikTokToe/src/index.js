import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className={`square ${props.winner}`} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    isWinner(i) {
        let res;
        if (this.props.board) {
            if (this.props.board.includes(i)) {
                res = 'light'
            }
        }
        return res
    }
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                winner={this.isWinner(i)}
            />
        );
    }

    render() {
        return (
            <div>
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
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
            pos: [],
            isReversed: false,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        const pos = this.state.pos.slice(0, this.state.stepNumber);
        let col = i + 1
        let row;
        if (i + 1 === 1 || i + 1 === 2 || i + 1 === 3) {
            row = 1
        } else if (i + 1 === 4 || i + 1 === 5 || i + 1 === 6) {
            col = i - 2
            row = 2
        } else {
            col = i - 5
            row = 3
        }

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
            // 
            pos: pos.concat([`${col} ${row}`])
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    setReverse() {
        this.setState({
            isReversed: !this.state.isReversed
        })
    }

    render() {
        let history = this.state.history
        const current = history[this.state.stepNumber]

        let moves = history.map((step, move) => {
            const desc = move ? `Go to move #${move} | ${this.state.pos[move - 1]}  ` : `Go to game start`
            return (
                <li key={move}>
                    <button className={this.state.stepNumber === move ? 'bold' : ''} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status
        if (calculateWinner(current.squares)) {
            status = 'Winner: ' + calculateWinner(current.squares)[0];
        } else if (!current.squares.includes(null)) {
            status = "It's a tie."
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        board={calculateWinner(current.squares) ? calculateWinner(current.squares)[1] : null}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.setReverse()}>Sort</button>
                    <ol>{this.state.isReversed ? moves.reverse() : moves}</ol>
                </div>
            </div>
        );
    }
}


// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], [a, b, c]];
        }
    }
    return null;
}