import React from "react";

import NameGetter from "./NameGetter.jsx";
import Game from "./Game.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: null };
    this.setName = this.setName.bind(this);
  }

  setName(name) {
    this.setState({ name: name });
  }

  render() {
    let displayComp = this.state.name ? (
      <Game name={this.state.name} />
    ) : (
      <NameGetter nameSetter={this.setName} />
    );

    return <div>{displayComp} </div>;
  }
}
