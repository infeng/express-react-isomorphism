import * as React from 'react';
import { connect } from 'react-redux';

export interface HomeProps {
  count: number;
}

class Home extends React.Component<HomeProps, any> {
  render() {
    return (
      <div>
        {`count: ${this.props.count}`}
      </div>
    );
  }
}

const mapState2Props = state => {
  return {
    count: state.app.count,
  };
};

export default connect(mapState2Props)(Home);
