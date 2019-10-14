import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Textfield from 'material-ui/TextField';
import axios from 'axios';
import RenderToLayer from 'material-ui/internal/RenderToLayer';

class Register extends Component {
    constructor(props) {
        //super (props);
        this.state= {
            first_name:'',
            last_name:'',
            email:'',
            password:''
        }
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Register"/>
                        <Textfield
                            hintText="Enter your first name: "
                            floatingLabelText="First Name"
                            onChange={(event,newValue) => this.setState({first_name:newValue})}
                        />
                        <br/>
                        <Textfield
                            type="email"
                            hintText="Enter your email: "
                            floatingLabelText="Email"
                            onChange={(event,newValue) => this.setState({email:newValue})}
                        />
                        <br/>
                        <Textfield
                            type="password"
                            hintText="Enter your password: "
                            floatingLabelText="Password"
                            onChange={(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <Textfield
                            hintText="Enter your last name: "
                            floatingLabelText="Last Name"
                            onChange={(event,newValue) => this.setState({last_name:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default Register;