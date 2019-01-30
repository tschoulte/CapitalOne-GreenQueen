import React, { Component } from 'react';
import axios from 'axios'
import './../css/info.css';
import { withRouter } from 'react-router-dom';

class Info extends Component {
    constructor(props) {
        super(props)
        this.state = { name: '...', savings: '...', checking: '...', goal: '50' }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        this.updateNumbers()
        try {
            var temp = this.props.email
            temp = temp.split('@')
        } catch {
            this.props.history.push('/');
        }
        this.state.name = temp[0]
        //console.log(this.props.email)
    }
    transfer = (e) => {
        e.preventDefault();
        console.log("Amount" + this.state.amount)
        axios.get(`http://localhost:3001/transfer?email=` + this.props.email + '&transferAmt=' + this.state.amount)
            .then(res => {
                console.log(res)
            })
        this.setState({ amount: '' })
        setTimeout(() => {
            this.updateNumbers()
        }, 2000)
    }
    handleChange(e) {
        this.setState({ amount: e.target.value })
    }

    updateNumbers() {
        // console.log("EMAIL" + this.props.email)
        axios.get(`http://localhost:3001/balance?email=` + this.props.email)
            .then(res => {
                // console.log('Updated account')
                this.setState({ checking: res.data.checking })
                this.setState({ savings: res.data.savings })
            })
    }

    render() {
        return (
            <div class="container-fluid text-center pt-5">
                <h1 class="pt-3 mainlogo"> Green Queen </h1>
                <h6 class="undermainlogo"> A platform to save money, compete with friends, help the environment, and go green! For every tree completed from meeting your savings, we will be planting a real tree. </h6>
                <div class="customframelower">
                    <h1 class="pt-1 transferlabel"> Welcome, {this.state.name}. Transfer Money from Checkings to Savings: </h1>
                    <div class="container-fuild topofinput">
                        <div class="row topofinput">
                            <div class="col-sm-12 topofinput">
                                <form ref="form" onSubmit={this.transfer}>
                                    <div class="form-group">
                                        <label for="transfer"></label>
                                        <input onChange={this.handleChange} type="number" min="0" step="0.01" max={this.state.checking} class="form-control" id="transfer" placeholder="Enter amount" value={this.state.amount} />
                                    </div>
                                    <button type="submit" class="btn btn-outline-success btn-lg btn-block">Go Green!</button>
                                </form>

                                <div class="col mt-5">
                                    <div class="row-sm-5  textboxes1">
                                        <p><span class="firstlabel">Checking: </span><span class="secondlabel">$ {this.state.checking}</span></p>
                                    </div>
                                    <div class="row-sm-5 textboxes2">
                                        <p><span class="firstlabel">Savings: </span><span class="secondlabel">$ {this.state.savings}</span></p>
                                    </div>
                                    <div class="row-sm-5 textboxes3">
                                        <p><span class="firstlabel">Streak: </span><span class="secondlabel">11</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Info)
