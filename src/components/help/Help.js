import React from "react";

export default function Help() {
  return (
    <div className="help">
      <h1> Help Section </h1>
      <h3> How to play </h3>
      <ul>
        <li> The Game start automatically </li>
        <li> The first direction is Right </li>
        <li> Move the game around with direction key on your keyboard </li>
        <li> You will be notified with the number of snake length when the game is over</li>
        <li> Game over when the snake touch the body of the game area</li>
        <li>Click Ok to restart Game</li>
      </ul>
    </div>
  );
}
