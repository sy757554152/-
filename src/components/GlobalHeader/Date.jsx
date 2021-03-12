import React, { Component } from 'react';
import moment from 'moment';

class Date extends Component {
  constructor(...args) {
    super(...args);
    this.getTime = this.getTime.bind(this);
    this.state = {
      currentTime: moment().format('YYYY[年]MM[月]DD[日] HH[:]mm[:]ss'),
    };
  }

  componentDidMount() {
    this.getTime();
  }

  getTime() {
    setInterval(() => {
      this.setState({
        currentTime: moment().format('YYYY[年]MM[月]DD[日] HH[:]mm[:]ss'),
      });
    }, 1000);
  }

  render() {
    return <div>{this.state.currentTime}</div>;
  }
}

export default Date;
