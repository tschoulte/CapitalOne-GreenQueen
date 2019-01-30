import React, { Component } from 'react';
import './../css/mainpage.css';

class Title extends Component {
    render() {
        const { name } = this.props
        return (
            <nav class="navbar navbar-light text-center">
                <span class="navbar-brand toptext">Save</span>
            </nav>
        );
    }
}

export default Title
