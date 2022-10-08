import React from 'react'

class Servce extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date(), num: 1 }
  }
  componentDidMount() {
    console.log("挂载");
  }

  componentWillUnmount() {
    console.log("离开")
  }

  render() {
    return (
      <>
        <h3>hello</h3>
        Date: {this.state.date.toLocaleTimeString()}
      </>
    )
  }
}

export default Servce
