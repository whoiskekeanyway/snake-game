/* written by Ogundele Olalekan
 Task 12 Capstone Project
 project title - Snake Game */


import React, { Component } from "react";
import Snake from "./components/snake/Snake";
import Food from "./components/food/Food";
import Help from "./components/help/Help";

/* Method to generate food for the game */
const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};
/* The name initial stage, rigtht direction, food cordinates, the initial 2 dots and speed*/
const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  direction: "RIGHT",
  snakeDots: [
    [0, 0],
    [2, 0],
  ],
};

class App extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      default:
    }
  };

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
      default:
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots,
    });
  };
  /* Method to end game when the snake touch the border of the game*/
  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }
  /* */
  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
  }
  /* Method to apply changes when the snake eat food*/
  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates(),
      });
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }
  /* Method to enlarge the snake after every food */
  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  }
  /* Method to increase the speed after each food */
  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10,
      });
    }
  }
  /* Method to alert when gave is over */
  onGameOver() {
    alert(`
    Game Over. 
    Snake length is ${this.state.snakeDots.length}
    Click Ok to restart Game
    `);
    this.setState(initialState);
  }

  render() {
    return (
      <div>
        <h1>Snake Game</h1>
        <div className="game-area">
          <Snake snakeDots={this.state.snakeDots} />
          <Food dot={this.state.food} />
        </div>
        <section>
          <Help />
        </section>
      </div>
    );
  }
}

export default App;
