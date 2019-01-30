import React, { Component } from 'react';

class Sidebar extends Component {

    render() {
        const {streaks} = this.props.streaks;
        const {trees} = this.props.trees;
        return (
            <div>
                <p>Streaks: {this.props.streaks}</p>
                <p>Number of Trees in Forest: {this.props.trees}</p>
            </div>
        );
    }
}

export default Sidebar