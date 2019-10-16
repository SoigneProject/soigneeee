import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Suggestions from './Suggestions';

const useStyles = makeStyles(theme => ({
    root: {
      flexWrap: 'wrap',
      width: '40%', 
      backgroundColor: '#efefef',
      marginTop: 6,
      marginLeft: 10
    },
    overrides: {
        MuiFormLabel: {
          root: {
            "&$focused": {
              color: "tomato",
              fontWeight: "bold"
            }
          }, 
          
          focused: {}
        }
      },
    margin: {
      margin: theme.spacing(1),
    },
  }));

  class InputField extends Component {
    constructor(props) {
      super(props);

      this.state = {
        query: '',
        results: []
      }

      this.handleInputChange = this.handleInputChange.bind(this);
    }
    

    getInfo() {
      axios.get(`http://localhost:6969/users/${this.state.query}`)
      .then( data  => {
        console.log("Data: " + data.data.username);
        if (!data.data.username) return;
        let newResults = this.state.results;
        newResults.push(data.data.username);
        this.setState({
          results: newResults
        });
      });
    }

    handleInputChange() {
      this.setState({
        query: this.search.value
      }, () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length > 2) {
            this.getInfo()
          }
        } 
      })
    }
      
    render() {
      const classes = useStyles;
      return (
        <form>
        <TextField
          className={classes.root}
          label="Search for an Outfit:"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
          inputRef={input => this.search = input}
          onChange={this.handleInputChange}
          InputProps={{
              disableUnderline: true,
          }}
          style = {{}}
        />
        <Suggestions results={this.state.results} />
        </form>
      );
    }
  }

  export default InputField
  
  // export default function FilledTextFields() {
  //   const classes = useStyles();
  //   return (
  //       <TextField
  //       className={classes.root}
  //       label="Search for an Outfit:"
  //       variant="outlined"
  //       id="mui-theme-provider-outlined-input"
  //       InputProps={{
  //           disableUnderline: true,
  //          }}
  //       style = {{}}
  //     />

  // );
  //   }