import React from "react";

export default class NameGetter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.props.nameSetter(e.target.value);
    } else {
      this.setState({ name: e.target.value });
    }
  }

  handleSubmit() {
    if (this.state.name) {
      this.props.nameSetter(this.state.name);
    }
  }

  render() {
    return (
      <div className="center">
        <input
          type="text"
          name="name"
          placeholder="your name"
          onKeyUp={e => this.handleKeyPress(e)}
        />
        <button onClick={e => this.handleSubmit()}>Start</button>
      </div>
    );
  }
}
