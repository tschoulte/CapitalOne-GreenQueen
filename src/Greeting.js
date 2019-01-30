import React, {Component} from 'react';


class Greeting extends Component {
    constructor(props){
        super(props)
        this.state = { greeting: 'Hello'}
      }
      componentDidMount(){
        setTimeout(() => {
          this.setState({greeting: "Bon Jour"})
        }, 5000)
      }
      render() {
          const { name} = this.props
        return (
          <div className="App">
            {this.state.greeting} {name}
          </div>
        );
      }
}

export default Greeting