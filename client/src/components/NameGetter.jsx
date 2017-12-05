import React from "react";

export default class NameGetter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.props.nameSetter(e.target.value);
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="name"
          placeholder="your name"
          onKeyPress={e => this.handleKeyPress(e)}
        />
      </div>
    );
  }
}
