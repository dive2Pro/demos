import React from "react";
import { render } from "react-dom";
// console.clear()
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
const Modes = {
  Locked: "Locked",
  Home: "Home",
  Unlocked: "Unlocked",
  Desktop: "Desktop",
  App: "App"
};
const ModeMessages = {
  [Modes.Home]: "The phone is at home",
  [Modes.Locked]: "The Phone is Locked",
  [Modes.Unlocked]: "The Phone is Unlocked",
  [Modes.App]: "The Phone is opening App",
  [Modes.Desktop]: "The Phone is switching Desktop"
};

const NotAllowed = {
  mode: "Null",
  message: "The operation is not allowed"
}

class Main extends React.PureComponent {
  state = {
    mode: Modes.Locked,
    message: ModeMessages[Modes.Locked]
  };
  onHomeClick = () => {
    const { mode } = this.state;

    if (mode === Modes.Locked) {
      this.setState({
        mode: Modes.Unlocked,
        message: ModeMessages[Modes.Unlocked]
      });
    } else if (mode === Modes.Unlocked) {
      this.setState({
        mode: Modes.Home,
        message: ModeMessages[Modes.Home]
      });
    } else if (mode === Modes.Desktop) {
      this.setState({
        mode: Modes.Home,
        message: ModeMessages[Modes.Home]
      });
    } else if (mode === Modes.App) {
      this.setState({
        mode: Modes.Home,
        message: ModeMessages[Modes.Home]
      });
    } else {
      this.setState({
        mode: Modes.Home,
        message: ModeMessages[Modes.Home]
      });
    }
  };
  onOpenAppClick = () => {
    const {mode} = this.state
    if (mode === Modes.Desktop || mode === Modes.Home) {
      this.setState({
        mode: Modes.App,
        message: ModeMessages[Modes.App]
      })
    } else {
      this.setState(NotAllowed)
    }
  };
  onSwitchDesktopClick = () => {
    const { mode } = this.state
    
    if (mode === Modes.Home) {
      this.setState ( {
        mode: Modes.Desktop,
        message: ModeMessages[Modes.Desktop]
      })
    } else {
      this.setState(NotAllowed)
      
    }
  };
  _handleClickEvent = e => {
    const { id } = e.target;
    if (id) {
      this[`on${id}Click`]();
    }
  };
  render() {
    return (
      <div onClick={this._handleClickEvent}>
        <button id="Home" data-testid="home">Home</button>
        <button id="OpenApp" data-testid='open-app'>Open App</button>
        <button id="SwitchDesktop" data-testid="switch-desktop" >Switch Desktop</button>
        <h2 data-testid="message">{this.state.message}</h2>
      </div>
    );
  }
}

export const App = () => (
  <div style={styles}>
    <h2>Start here {"\u2728"}</h2>
    <Main />
  </div>
);

export default App