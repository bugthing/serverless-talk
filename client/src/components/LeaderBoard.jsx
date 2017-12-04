import React from "react";

export default class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { leaders: [] };
  }

  componentDidMount() {
    let socket = new WebSocket('ws://localhost:8081/');
    let that = this
    socket.addEventListener('message', (event) => {
        let leaderData = JSON.parse(event.data)
        that.setState({leaders: leaderData});
    });
  }

  render() {
      let leaders = this.state.leaders.map((leader, i) => {
          return <div key={i}>
            {leader.name} / {leader.time} 
          </div>
      });

    return (<div>
       {leaders}
      </div>)
  }
}
