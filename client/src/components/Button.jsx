import React from "react";

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { colour: 'grey'};
    this.setReactionTest = this.setReactionTest.bind(this);    
  }

  componentDidMount() {
    let time=(Math.random())*3000
    this.countdown = setInterval(this.setReactionTest, time);
  }

  setReactionTest() {
    this.setState({ 
      colour: this.getRandomColor(),
      createdTime: Date.now()
    });
  }

  getRandomColor() {
      let letters = "0123456789ABCDEF".split('');
      let color = "#";
      for (var i = 1; i < 6; i++) {
      	color += letters[Math.round(Math.random() * 15)];
      }
      return color; 
  }

  clickButton() {             
    let clickedTime = Date.now()
    let createdTime = this.state.createdTime
    let reactionTime = (clickedTime-createdTime)/1000
    if (!isNaN(reactionTime)) {
      console.log('FUCKTHATsFAST:' + reactionTime);
      // TODO: send to server
    }
  }                                               

  render() {
    var style = { backgroundColor: this.state.colour, padding: '50px' };
    return (<div>
       <button onClick={e => this.clickButton(e)} style={style}>
         Click When Colour Changes
       </button>
      </div>)
  }
}
