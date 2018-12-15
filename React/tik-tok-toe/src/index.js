import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        // stated below. this is a function so i dosent need 'this'
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        // return a square stateless componenet with the pased data: the square value taken from state with the id given at the redner part
        // pases a REFERENCE to the handle click function with the I argument binded to it during creation
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            // THIS IS THE PROBLEM here is where the I is given ok the prop
            // Now that the state has been moved we no longer have acces to it. So we change the this.state to this.props
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
    // Lifting state up by moving it to the top level game component that has borad in it

    handleClick(i) {
        // check squares and return if game is won or square has a value
        // this is so that we discard incorect moves
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        // As we cant look into other functions we instead defindem again possible refactor
        const squares = current.squares.slice();

        // take i+1 then if its 1,2,3 then col 1
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
        // Sets the value of curent square based on xIsNext
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        // Updates state | curent state hitory concat with new array of objects with the squares property set to curent squares as in const squares from the top
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
        // Adding the const that allow the game comp to display the most recent board position and also check if there is a winner and if the curent square already has a value
        let history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares /*current is a obj so squares is a property*/)


        let moves = history.map((step, move) => {
            const desc = move ? `Go to move #${move} | ${this.state.pos[move - 1]}  ` : `Go to game start`
            return (
                <li key={move}>
                    <button className={this.state.stepNumber === move ? 'bold' : ''} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status
        // a var for diplaying state that is determined by the current value of winner and the state xIsNext value
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        // since the board dosent have state anymore we need to pass it in as props as said previously
                        squares={current.squares /* current board taken from the current const taken from state */}
                        onClick={(i) => this.handleClick(i) /* just like with the square pass in the refrence to the handle click function bound to 'i' */}
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
            return squares[a];
        }
    }
    return null;
}