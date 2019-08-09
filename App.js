import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Stopwatch />
    </View>
  );
}

class Stopwatch extends React.Component {
  constructor() {
    super();
  }

  // put in constructor as this.state?
  state = {
    status: false, // can be "unstarted", "running", or "paused"
    completeButtonDisabled: true,
    runningTime: 0
  };

  handleClick = () => {
    this.setState(state => {
      if (state.status) {
        clearInterval(this.timer);
      } else { // starting the clock running from zero or from pause
        // // enable completeButtonDisabled if disabled
        // if (state.completeButtonDisabled) {
        //   this.setState({completeButtonDisabled: !state.completeButtonDisabled});
        // }
        const startTime = Date.now() - this.state.runningTime;
        this.timer = setInterval(() => {
          this.setState({ runningTime: Date.now() - startTime });
        }, 1000);
      }
      return { status: !state.status };
    });
  };

  handleComplete = () => {
    clearInterval(this.timer);
    this.setState({ runningTime: 0, status: false });
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // given ms: "64333", convert to Minutes:Seconds: "64:33"
  convertMsToMinutes(ms) {
    let minutes = parseInt((ms/(1000*60))%60)
    let seconds = parseInt((ms/1000)%60)
    return minutes + ":" + seconds;
  }

  render() {
    const { status, runningTime } = this.state;
    return (
      <View>
        <Text>MM:SS</Text>
        <Text>{this.convertMsToMinutes(runningTime)}</Text>
        
        <Button onPress={this.handleClick} title={status ? 'Pause Practice Session' : 'Start New Practice Session'} />
        <Button onPress={this.handleComplete} disabled={this.state.completeButtonDisabled} title="Complete Practice Session" />
      </View>
    );
  }
}

// STYLES:

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
