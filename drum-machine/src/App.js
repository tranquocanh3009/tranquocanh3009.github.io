import React from 'react';
import './App.css';
import { render } from '@testing-library/react';

const padBank = [
  {
    keyCode: 63,
    keyTrigger: 'Q',
    
  },
  {
    keyCode: 63,
    keyTrigger: 'W',
    
  },
  {
    keyCode: 63,
    keyTrigger: 'E',
    
  },
  {
    keyCode: 63,
    keyTrigger: 'A',
    
  },
  {
    keyCode: 63,
    keyTrigger: 'S',
    
  },
  {
    keyCode: 63,
    keyTrigger: 'D',
    
  },
  {
    keyCode: 63,
    keyTrigger: 'Z',
    
  },
  {
    keyCode: 63,
    keyTrigger: 'X',
    
  },
  {
    keyCode: 63,
    keyTrigger: 'C',
    
  },
]

function DrumPad() {
  return (
    <div>

    </div>
  )
}

class Drum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: {},
      bank: {}
    }
    this.handlePower = this.handlePower.bind(this);
    this.handleBank = this.handleBank.bind(this);
  }
  handlePower() {
    if (this.state.power.marginLeft == "0px")
    this.setState({
      power: {marginLeft: "16px"}
    })
    else this.setState({
      power: {marginLeft: "0px"}
    })
  }
  handleBank() {
    if (this.state.bank.marginLeft == "0px")
    this.setState({
      bank: {marginLeft: "16px"}
    })
    else this.setState({
      bank: {marginLeft: "0px"}
    })
  }
  render() {
    const display = padBank.map(item => <span>{item.keyTrigger}</span>);
    return (
      <div>
        <div class="drumpad">
          {display}
        </div>
        <div class="controls">
          <div class="button">
            <p>POWER</p>
            <div class="slider" onClick={this.handlePower}>
              <div class="select" id="power" style={this.state.power}/>
            </div>
          </div>
          <div class="volume">
            <p>volume</p>
            <input type="range" min="0" max="1" step="0.01"></input>
          </div>
          <div class="button">
            <p>BANK</p>
            <div class="slider" onClick={this.handleBank}>
              <div class="select" id="bank" style={this.state.bank}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <Drum />
    </div>
  );
}

export default App;
