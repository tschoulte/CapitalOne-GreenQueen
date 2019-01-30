import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        // console.log(e.target.password.value)
        // console.log(e.target.email.value)
        // console.log("Props: " + this.props.handleEmail);
        this.props.handleEmail(e.target.email.value)
        setTimeout(() => {
            this.props.history.push('/home');
        }, 2000)

    }

    render() {
        const { email, password } = this.state;

        return (
            <div className="container">
                <form
                    className="form-signin"
                    onSubmit={this.onSubmit}
                >
                    <h2 className="form-signin-heading">
                        Login
                    </h2>
                    <div className="form-group">
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            placeholder="Email address"
                            value={email}
                            onChange={this.onChange}
                            autoFocus
                        />
                        <span className="help-block"></span>
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={this.onChange}
                        />
                        <span className="help-block"></span>
                    </div>
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }
};

export default withRouter(Login)