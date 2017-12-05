import React from "react";

export default class LeaderBoard extends React.Component {
  render() {
    let leaders = this.props.leaders.slice(0, 10).map((leader, i) => {
      return (
        <div key={i}>
          {leader.name} / {leader.time}
        </div>
      );
    });

    return <div>{leaders}</div>;
  }
}
