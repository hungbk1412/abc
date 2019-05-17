import React, { Component } from 'react'

const notFound = {
  position: 'fixed',
  top: '0',
  bottom: '0',
  right: '0',
  left: '0',
  background: 'white'
}
class NotFound extends Component {
  render() {
    return (
      <div style={notFound}>
        404 not found
      </div>
    )
  }
};

export default NotFound;
