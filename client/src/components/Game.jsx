import React from "react";

import LeaderBoard from "./LeaderBoard.jsx";

const url =
  "https://r41jxlsgq7.execute-api.eu-west-1.amazonaws.com/prod/smartReactionTimer";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { colour: "white", leaders: [], disabled: true };
    this.setReactionTest = this.setReactionTest.bind(this);
  }

  componentDidMount() {
    let time = Math.random() * 4000;
    this.countdown = setInterval(this.setReactionTest, time);
  }

  setReactionTest() {
    this.setState({
      colour: "#ff69b4",
      createdTime: Date.now(),
      disabled: false
    });
  }

  clickButton() {
    if (this.state.disabled) {
      return null;
    }

    let clickedTime = Date.now();
    let createdTime = this.state.createdTime;
    let reactionTime = (clickedTime - createdTime) / 1000;

    this.setState({ disabled: true });

    if (!isNaN(reactionTime)) {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.props.name,
          time: reactionTime.toString()
        })
      })
        .then(results => {
          return results.json();
        })
        .then(data => {
          this.setState({ leaders: data });
        });
    }
  }

  render() {
    let colour = this.state.colour;
    if (this.state.disabled) {
      colour = "grey";
    }
    let style = { backgroundColor: colour, padding: "50px" };
    return (
      <div>
        <div
          onClick={e => this.clickButton(e)}
          style={style}
          disabled={this.state.disabled}
        >
          Get ready {this.props.name}, click when colour changes
        </div>

        <LeaderBoard leaders={this.state.leaders} />
      </div>
    );
  }
}
