import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

  
  export default function FilledTextFields() {
    const classes = useStyles();
    return (
        <TextField
        className={classes.root}
        label="Search for an Outfit:"
        variant="outlined"
        id="mui-theme-provider-outlined-input"
        InputProps={{
            disableUnderline: true,
           }}
        style = {{}}
      />

  );
    }