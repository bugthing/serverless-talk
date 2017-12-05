import React from "react";

export default class LeaderBoard extends React.Component {
  render() {
    let leaders = this.props.leaders.slice(0, 20).map((leader, i) => {
      return (
        <tr key={i}>
          <td> {i + 1} </td>
          <td> {leader.name} </td>
          <td> {leader.time} </td>
        </tr>
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Pos.</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{leaders}</tbody>
      </table>
    );
  }
}
