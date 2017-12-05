import React from "react";

import LeaderBoard from "./LeaderBoard.jsx";

const url =
  "https://r41jxlsgq7.execute-api.eu-west-1.amazonaws.com/prod/smartReactionTimer";

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { colour: "grey", leaders: [], disabled: true };
    this.setReactionTest = this.setReactionTest.bind(this);
  }

  componentDidMount() {
    let time = Math.random() * 4000;
    this.countdown = setInterval(this.setReactionTest, time);
  }

  setReactionTest() {
    this.setState({
      colour: this.getRandomColor(),
      createdTime: Date.now(),
      disabled: false
    });
  }

  getRandomColor() {
    let letters = "0123456789ABCDEF".split("");
    let color = "#";
    for (var i = 1; i < 7; i++) {
      color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  }

  clickButton() {
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
          name: "Sid",
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
    let style = { backgroundColor: this.state.colour, padding: "50px" };
    return (
      <div>
        <button
          onClick={e => this.clickButton(e)}
          style={style}
          disabled={this.state.disabled}
        >
          Click When Colour Changes
        </button>

        <LeaderBoard leaders={this.state.leaders} />
      </div>
    );
  }
}
