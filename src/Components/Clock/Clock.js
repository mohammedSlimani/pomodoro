import React, { Component } from 'react'

//Display the Countdown and stuff!
export class Clock extends Component {
    constructor(props){
        super(props);
        this.state = {
            maxTime:props.givenTime,
            timeLeft:props.givenTime*60,
            intervalID:''
        }
    }
    
    componentWillReceiveProps(nextProps){
        if(this.props.isPaused){
            if(this.state.maxTime !== nextProps.givenTime*60){
                this.setState({
                    maxTime:nextProps.givenTime*60,
                    timeLeft:nextProps.givenTime*60
                });
            }
        }
    }

    startCountDown = () => {
        this.setState({
            intervalID:setInterval(this.timer,1000)
        });   
    }

    timer = () => {
        let count = this.state.timeLeft - 1;
        if(count>=0){
            if(count===0) this.buzzer();
            this.setState({timeLeft:count});
        }else{
            this.props.switchPhase(); //send a signal to do the next step 
            this.setState({
                timeLeft:this.props.givenTime*60
            })
        }
    }

    clockSetter = () => {
        this.props.pause();
        if(this.props.isPaused){
            this.startCountDown();
        }else{
            clearInterval(this.state.intervalID);
        }
    }

    reset = () => {
        if(!this.props.isPaused){
            this.clockSetter();
        }
        this.props.reset();
        this.setState({
            maxTime:25*60,
            timeLeft:25*60
        });
        const sound = document.getElementById('beep');
        sound.pause();
        sound.currentTime=0;
    }

    buzzer = () => {
        const sound = document.getElementById('beep');
        sound.play();
    }

  render() {
      let min=Math.floor(this.state.timeLeft/60).toString();
      let sec=(this.state.timeLeft%60).toString(); 
    return (
      <div id="clock-container">
          <div id='timer-label'>{this.props.isSession?'session':'break'}</div>
          <div id='time-left'>{min<10? '0'+min:min} : {sec<10? '0'+sec:sec}</div>
          <br/>
          <audio id='beep' src='https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3'></audio>
          <button id='start_stop' onClick={this.clockSetter}>{this.props.isPaused? 'start':'pause'}</button>
          <button id='reset' onClick ={this.reset}>reset</button>
      </div>
    )
  }
}

export default Clock
