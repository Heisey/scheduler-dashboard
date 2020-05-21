import React, { Component } from "react";

class Panel extends Component {
  constructor(props) {
    super(props)
    
    this.handleUpdateFocus = this.handleUpdateFocus.bind(this)
  }

  handleUpdateFocus(e) {
    this.props.updateFocus(this.props.id)
  }

  render() {
    const { label, id, value } = this.props;

    return (
      <section
        className="dashboard__panel"
        id={id}
        onClick={this.handleUpdateFocus}
      >
        <h1 className="dashboard__panel-header">{label}</h1>
        <p className="dashboard__panel-value">{value}</p>
      </section>
    );
  }
}

export default Panel;