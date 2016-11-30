import * as React from 'react';
import { connect } from 'react-redux';

class App extends React.Component<any, any> {
  render() {
    return (
      <div>
        hello world
      </div>
    );
  }
}

const mapState2Props = state => {
  return state;
};

export default connect(mapState2Props)(App);
