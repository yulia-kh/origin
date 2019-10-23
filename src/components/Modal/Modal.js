import React from "react";
import './Modal.css';

export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if(!this.props.show){
      return null;
  }
    return (
    <div className="modal">
      <div className="actions"><button onClick={this.onClose}>Close</button></div>
      <div className="content">{this.props.children}</div>  
    </div>)
  }
}