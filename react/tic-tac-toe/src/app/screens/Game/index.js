import React, { Component } from 'react';
import Board from './components/Board';
import calculateWinner from '/utils/utils.js';
import styles from './styles.module.scss';
import api from '/services/MatchesService.js';
var Spinner = require('react-spinkit');

class Game extends Component {
  state = {
    history: [{
      squares: Array(9).fill(null),
    }],
    stepNumber: 0,
    xIsNext: true,
    data: [],
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true }, () => {
      api.getMatches()
        .then(result => this.setState({
          loading: false,
          data: [...result.data],
        }
        ));
    });
  }

  handleClick(i) {
    const { history, xIsNext } = this.state;
    var steps = history.slice(0, this.state.stepNumber + 1);
    const current = steps[steps.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      history: steps.concat([{
        squares: squares,
      }]),
      stepNumber: steps.length,
      xIsNext: !xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const data = this.state.data;
    const loading = this.state.loading;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const renderMoves = (step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    }

    const moves = history.map(renderMoves);

    const renderMatchs = (match) => {
      return (
        <tr key={match.id}><td>{match.player_one}</td><td>{match.winner === 'player_one' ? '1' : '0'}-{match.winner === 'player_two' ? '1' : '0'}</td><td>{match.player_two}</td></tr>
      )
    }
    const matches = data.map(renderMatchs);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className={styles.game}>
        <div>
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
        <div>
          Maches:
          {loading ? <Spinner name="circle" /> : <table><tbody>{matches}</tbody></table>}
        </div>
      </div>
    );
  }
}

export default Game;