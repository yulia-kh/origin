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
    <div className="modal" aria-live="assertive">
      <div className="actions"><button onClick={e => this.onClose(e)} aria-live="assertive">Close</button></div>
      <div className="content" aria-live="assertive">{this.props.children}</div>  
    </div>)
  }
}

