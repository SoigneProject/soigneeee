import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';

const useStyles = theme => ({
  paper: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 5,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 5,
  },
  submit: {
    margin: 3,
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signUpError: '',
      email: '',
      password: '',
      confirmedPassword: '',
      username: '',
      firstName: '',
      lastName: ''
    };

    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  _handleTextFieldChange(e) {
    e.persist();
    this.setState((state) => state[e.target.name] = e.target.value);
  }

  onSignUp() {
    // Grab state
    const {
      email,
      password,
      firstName,
      lastName,
      username
    } = this.state;

    // Post request to backend
    axios.post('http://localhost:6969/users/signup', {
      firstName: firstName,
      lastName: lastName,
      username: username,
      emailAddress: email,
      password: password,
    }).then(json => {
        console.log('json', json);
        if (json.data.success) {
          this.setState({
            signUpError: json.data.message,
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: ''
          });
        } else {
          this.setState({
            signUpError: json.data.message
          });
        }
      });
  }

  render(){

    const { classes } = this.props;
    
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          <Typography component="h1" variant="h4">
            Welcome
          </Typography>
          <Typography component="h2" variant="h5" align="center">
            Enter your information and join our growing community!
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={this.state.firstName}
                  onChange={this._handleTextFieldChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={this.state.lastName}
                  onChange={this._handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={this._handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="Username"
                  name="username"
                  autoComplete="usrname"
                  value={this.state.username}
                  onChange={this._handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this._handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  //autoComplete="current-password"
                  // value={this.state.confirmedPassword}
                  // onChange={this._handleTextFieldChange}
                />
              </Grid>

            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onSignUp}
            >
              Sign Up
            </Button>

          </form>
        </div>
        <Box mt={5}>
          <Copyright />
          
        </Box>
      </Container>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(useStyles)(Signup);