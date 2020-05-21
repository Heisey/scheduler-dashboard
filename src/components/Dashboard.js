import React, { Component } from "react";
import axios from 'axios'

import Loading from './Loading';
import Panel from './Panel';

const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      focused: null,
      loading: true,
      appointments: {},
      interviewers: {}
    }

    this.renderPanels = this.renderPanels.bind(this)
    this.resetFocus = this.resetFocus.bind(this)
    this.updateFocus = this.updateFocus.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      const setData = async () => {
        const localData = JSON.parse(localStorage.getItem('focused'))
        const interviewers = await axios.get("http://192.168.1.67:8001/api/interviewers")
        const appointments = await axios.get("http://192.168.1.67:8001/api/appointments")
        this.setState({ 
          focused: localData,
          loading: false,
          interviewers: interviewers.data,
          appointments: appointments.data
        })
      }
      setData()
    }, 1000)
    
  }

  updateFocus(id) {
    this.setState({ focused: id })

    localStorage.setItem("focused", JSON.stringify(id))
  }

  renderPanels() {
    const panels = data
    .filter(
      panel => this.state.focused === null || this.state.focused === panel.id
    )
    .map(panel => (
      <Panel
      key={panel.id}
      id={panel.id}
      label={panel.label}
      value={panel.value}
      updateFocus={this.state.focused ? this.resetFocus : this.updateFocus}
      />
    ));
    return panels
  }

  resetFocus() {
    this.setState({ focused: null })
    localStorage.setItem("focused", JSON.stringify(null))
  }

  
  render() {
    return (
      <main className={this.state.focused ? 'dashboard dashboard--focused' : 'dashboard'}>
        {this.state.loading ? <Loading /> : this.renderPanels()}
      </main>
    );
  }
}

export default Dashboard;
