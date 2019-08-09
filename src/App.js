import React, { Component } from 'react';
import Clock from './Components/Clock'
import './styles/style.css'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breakTime: 5,
            sessionTime: 25,
            isSession: true,
            isPaused: true,
        }
    }

    //Switching the state from paused to start, vice versa
    pause = () => {
        this.setState({
            isPaused: !this.state.isPaused
        })
    }

    //from Session to break, vice versa 
    switchPhase = () => {
        this.setState({
            isSession: !this.state.isSession
        })
    }

    //Session Max time controller
    controlSessionTime = (e) => {
        let myTime = this.state.sessionTime;
        e.target.value === '+' ? myTime++ : myTime--;
        if (myTime > 60) { myTime = 60 }
        if (myTime <= 1) { myTime = 1 }
        this.setState({ sessionTime: myTime });
    }

    //Break Max Time controller
    controlBreakTime = (e) => {
        //this is redundent. :(  Bad Code
        let myTime = this.state.breakTime;
        e.target.value === '+' ? myTime++ : myTime--;
        if (myTime > 60) { myTime = 60 }
        if (myTime <= 1) { myTime = 1 }
        this.setState({ breakTime: myTime });
    }

    reset = () => {
        this.setState({
            breakTime: 5,
            sessionTime: 25,
            isSession: true,
            isPaused: true,
        })
    }

    render() {
        let currentTime = this.state.isSession ? this.state.sessionTime : this.state.breakTime;
        return (
            <>
            <div>
                <center><h1>SMED POMODORO</h1></center>
                    <center><a target="_blank" rel="noopener noreferrer" href="https://github.com/mohammedSlimani/pomodoro"><h5>See Source Code</h5></a></center>
            </div>
            <div id="container">
                <div id="control-container">
                    <div id='session-label'>
                        Session Length
                        <button id='session-increment' onClick={this.controlSessionTime} value='+'>+</button>
                        <div id='session-length'>{this.state.sessionTime}</div>
                        <button id='session-decrement' onClick={this.controlSessionTime} value='-'>-</button>
                    </div>

                    <div id='break-label'>
                        Break Length
                        <button id='break-increment' onClick={this.controlBreakTime} value='+'>+</button>
                        <div id='break-length'>{this.state.breakTime}</div>
                        <button id='break-decrement' onClick={this.controlBreakTime} value='-'>-</button>
                    </div>
                </div>

                <Clock isPaused={this.state.isPaused}
                    givenTime={currentTime}
                    sessionEnded={this.sessionEnded}
                    pause={this.pause}
                    reset={this.reset}
                    switchPhase={this.switchPhase}
                    isSession={this.state.isSession} />
            </div>
            </>
        )
    }
}

export default App;
