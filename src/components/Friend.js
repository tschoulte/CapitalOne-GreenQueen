import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'

class Friend extends Component {

    render() {
        const { friends } = this.props
        return (
            <div class="icon-bar">
                {friends.map((friend) => (
                    <p data-tip={`<div class="line"><p>Name: ${friend.name}</p><p> Streak: ${friend.streak}</p><p> Number of Forests: ${friend.count}</p>`} data-html={true}>
                        <a href=""><i class="fa fa-user-circle"></i></a>
                        <ReactTooltip html={true} />
                    </p>
                ))}
            </div>
        );
    }
}

export default Friend
