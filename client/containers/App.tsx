import * as React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component<any, any> {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

