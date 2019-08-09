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
    status: false,
    runningTime: 0
  };

  handleClick = () => {
    this.setState(state => {
      if (state.status) {
        clearInterval(this.timer);
      } else {
        const startTime = Date.now() - this.state.runningTime;
        this.timer = setInterval(() => {
          this.setState({ runningTime: Date.now() - startTime });
        }, 1000);
      }
      return { status: !state.status };
    });
  };

  handleReset = () => {
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
        
        <Button onPress={this.handleClick} title={status ? 'Stop' : 'Start'} />
        <Button onPress={this.handleReset} title="Reset" />
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
