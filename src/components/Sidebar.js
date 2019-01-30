import React, { Component } from 'react';
import Friend from './Friend'
import './../css/info.css';

class Sidebar extends Component {

    render() {
        const { friends } = this.props;
        return (
            <div class="icon-bar rectangle">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Capital_One_logo.svg/2000px-Capital_One_logo.svg.png" width="100" height="36"></img>
                <Friend friends={[
                    { name: "Manny", streak: "5", count: "7" },
                    { name: "Jeff", streak: "9", count: "3" },
                    { name: "Tyler", streak: "2", count: "2" },
                    { name: "Tiff", streak: "3", count: "11" },
                    { name: "Sai", streak: "10", count: "9" },
                    { name: "Audrey", streak: "2", count: "8" },
                    { name: "Shane", streak: "0", count: "he owes the money" },
                    { name: "John", streak: "6", count: "40" },
                    { name: "Anna", streak: "5", count: "7" }
                    ]} />
            </div>
        );
    }
}

export default Sidebar
