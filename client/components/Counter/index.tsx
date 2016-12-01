import * as React from 'react';
import './style.less';
import { Button } from 'antd';

export interface CounterProps {
  count: number;
}

export default class Counter extends React.Component<CounterProps, any> {
  render() {
    return (
      <div className="counter">
        <div>{`count: ${this.props.count}`}</div>
        <Button type="primary">add</Button>
      </div>
    );
  }
}
