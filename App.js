import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Time Practiced</Text>
      <Text style={styles.titleText}>MM:SS</Text>      
      <Stopwatch />
    </View>
  );
}

class Stopwatch extends React.Component {
  constructor() {
    super();
    this.state = {
      status: "unstarted", // can be "unstarted", "running", or "paused"
      completeButtonDisabled: true,
      runningTime: 0
    };
  }

  handleStartPause = () => {
    // Alternative approach that doesn't use the state callback function, just sets state directly. 
    // I wouldn't think you would need to check the state within the setState execution. 
    // This should all evaluate during the click so you should be fine
    if(this.state.status == "running"){
      clearInterval(this.timer);
      this.setState({status: "paused"});
    } else {
      const startTime = Date.now() - this.state.runningTime;
      this.timer = setInterval(() => {
        this.setState({ runningTime: Date.now() - startTime });
      }, 1000);
      this.setState({status: "running"});
    }

    // // OPTION 2: adapted version of your original
    // // Tried stripping out the embedded set state calls. those seem weird to me.
    // // They are mixing this.state and using the prevState variable, not sure why they are doing that.
    // this.setState((prevState) => {
    //   if (prevState.status == "running") {
    //     clearInterval(this.timer);
    //     return{ status: "paused" };
    //     // this.setState({status: "paused"});
    //   } else {
    //     // I'm confused what this sequence does. it seems like you grab the current time multiple times so I'm a bit lost with
    //     // the setInterval call in there, but if it's not broken, I guess don't fix it. :)
    //     const startTime = Date.now() - this.state.runningTime;
    //     this.timer = setInterval(() => {
    //       this.setState({ runningTime: Date.now() - startTime });
    //     }, 1000);
    //     return {status: "running"};
    //     // this.setState({status: "running"});
    //   }
    //   // return { status: !state.status };
    // });
  };

  handleComplete = () => {
    clearInterval(this.timer);
    this.setState({ runningTime: 0, status: false });
    this.setState({ status: "unstarted"});
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
        <Text style={styles.countNumbers}>{this.convertMsToMinutes(runningTime)}</Text>
        
        <Button ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: ['red', 'pink'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
          onPress={this.handleStartPause} title={status === 'unstarted' ? '777Start New Practice Session' : status === 'running' ? 'Pause Practice Session' : 'Resume Practice Session'} />
        
        <Button onPress={this.handleComplete} disabled={status === 'unstarted'} title="Complete Practice Session" />
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
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  countNumbers: {
    fontSize: 100,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
