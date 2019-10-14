import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Appbar, { AppBar } from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={ 
            username:'', 
            password:''
        }
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Login"/>
                        <TextField
                            hintText="Enter your Username: "
                            floatingLabelText="Username"
                            onChange={(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Password: "
                            floatingLabelText="Password"
                            onChange={(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
    
    handleClick(event) {
        var apiBaseURL = "http://localhost:4000/api/";
        var self = this;
        var payload={
            "email":this.state.username,
            "password":this.state.password
        }
        Axios.post(apiBaseURL+'login', payload).then(function (response) {
            console.log(response);
            if (response.data.code == 200) {
                console.log("Login successful");
                var uploadScreen=[];
                uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
                self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
            }
            else if(response.data.code == 204) {
                console.log("Password do not match");
                alert("Password do not match");
            }
            else {
                console.log("Username does not exist");
                alert("Username does not exist");
            }
        })
        
        .catch(function(error) {
            console.log(error);
        });
    }
}

const style = {
    margin: 15,
};

export default Login;