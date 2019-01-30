import React, { Component } from 'react';
import './css/App.css';
import Sidebar from './components/Sidebar'
import Info from './components/Info'
import Tree from './components/Tree'

const { insertItem, updateItem, getItem } = require('./models/databases')

class Main extends Component {
    
    constructor(props) {
        super(props)
        // this.state = { email:'jeff@gmail.com' }
    }

    componentDidMount() {

        //GETS ITEM

        /*getItem('bob3@gmail.com').then((data) => {
         console.log(data)
        }).catch((err) => {
         console.log(err)
        })*/


        //INSERTS ITEM

        insertItem("bob3@gmail.com", "{" +
            "\"first\":\"Bob3\"," +
            "\"last\":\"Bobson\"," +
            "\"friends\":[\"stacy@gmail.com\"]," +
            "\"accountID\":\"5c33c2ca322fa06b67794236\"," +
            "\"checkingsID\":\"5c33c2cc322fa06b6779423c\"," +
            "\"savingsID\":\"5c33c2cc322fa06b6779423c\"" +
            "}", 0, 0, 1000, 0).then((data) => {
                // console.log(data)
            }).catch((err) => {
                console.log(err)
            })


        //UPDATES ITEM

        const obj = {
            streaks: 1,
            //progress: 99,
            goal: 22,
            forest: 22
        }

        /*updateItem("bob4@gmail.com",obj).then((data) => {
          console.log(data)
        }).catch((err) => {
          console.log(err)
        })*/

        setTimeout(() => {
            this.setState({ name: "Amelia" })
        }, 6000)
        localStorage.setItem('streaks', 1)
    }
    render() {
        // console.log("the passed email: " + this.props.email)
        return (
            <div className="container-fluid">
                <div class="row content">
                    <div class="col-sm-1" style={{ paddingLeft: 0 + 'px' }}>
                        <Sidebar />
                    </div>
                    <div class="col-sm-6 max">
                        <Tree />
                    </div>
                    <div class="col-sm-5">
                        <Info email={ this.props.email }/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;