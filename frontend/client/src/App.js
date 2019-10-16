// /client/App.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import InputField from './InputField';
import TopMenu from './TopMenu';
import Avatar from '@material-ui/core/Avatar';
import FollowersList from './FollowersList';
import Grid from '@material-ui/core/Grid';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import pic from './kennet.JPG';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

import pic3 from './3.jpeg';
import pic4 from './4.jpeg';
import pic5 from './5.jpeg';
import Signup from './Signup';
import logo from './soigne.png';
  


class App extends Component {
  constructor(props) {
    super (props);
    this.state= {
      loginPage:[],
      uploadScreen:[]
    }
  }
  // initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };
  

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI


  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (message) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      message: message,
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };

 



  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;  

    const theme = createMuiTheme({
      overrides: {
        // Style sheet name ⚛️
        MuiTypography: {
          // Name of the rule
          textSecondary: {
            // Some CSS
            color: 'gray',
          },
        },
      },
    });
 


    
    const inputProps = {
      step: 300,
    };
    const avatarStyle = {
      alignSelf: 'center',
      height: 250,
      width: 250,
      borderWidth: 1,
    };


    const paperStyle = {
      padding: 4,
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      marginTop: 20,
    }

    const tableStyle = {
      minWidth: 20,
      marginTop: 0,
    }

    const tableStyle1 = {
      minWidth: 100,
      marginTop: 0,
    }

    const tileStyle = {

    }

    const gridStyle = {
      marginTop: 20,

    }
    const tileData = [
        
        {
          img: pic3,
          title: 'Image',
          author: 'author',
        },
        {
          img: pic4,
          title: 'Image',
          author: 'author',
        },
        {
          img: pic5,
          title: 'Image',
          author: 'author',
        },
        {
          img: pic3,
          title: 'Image',
          author: 'author',
        },
       ];

    const rows = [
      createData(291, 492),
    ];
    const rows1 = [
      createData("user1", "user2"),
      createData("user1", "user2"),
      createData("user1", "user2"),
      createData("user1", "user2"),
      createData("user1", "user2"),
      createData("user1", "user2"),
      createData("user1", "user2"),
      createData("user1", "user2"),
    ]
    function createData(followers, following) {
      return { followers, following };
    }
    function AvatarLarge(props){
      return <Avatar src = {props.src} alt = {props.alt} style = {avatarStyle}></Avatar>;
    }

    

  

    return (
      <div>
    <TopMenu/>
    
    <Grid container spacing={3}>
    <Grid item xs={4}>
      <div style={paperStyle}>
  <AvatarLarge alt="pic" src={pic} ></AvatarLarge>
  <Typography align = 'center' variant="h3" component="h2" gutterBottom>
  Kristina Leo
</Typography>
<Typography color = 'textSecondary' align = 'center' variant="h6" component="h2" gutterBottom>
  @kristinaleopandas
</Typography>
<FollowersList><Table style = {tableStyle} aria-label="simple table">
<TableHead>
  <TableRow>
    <TableCell align="center">Followers</TableCell>
    <TableCell align="center">Following</TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {rows1.map(row => (
    <TableRow key={row.name}>
      <TableCell align="center">{row.followers}</TableCell>
      <TableCell align="center">{row.following}</TableCell>
    </TableRow>
  ))}
</TableBody>
</Table></FollowersList>
<Table style = {tableStyle} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Followers</TableCell>
            <TableCell align="center">Following</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell align="center">{row.followers}</TableCell>
              <TableCell align="center">{row.following}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

  </div>
  
    </Grid>
    <Grid item xs={8}>
    <GridList spacing={1} style = {gridStyle} cellHeight={500} >

    {tileData.map(tile => (
      <GridListTile style = {tileStyle} key={tile.img}>
        <img src={tile.img} alt={tile.title} />
        <GridListTileBar
          title={tile.title}
          subtitle={<span>by: {tile.author}</span>}
          actionIcon={
            <IconButton aria-label={`info about ${tile.title}`} >
              <InfoIcon />
            </IconButton>
          }
        />
      </GridListTile>
    ))}
  </GridList>
  
    </Grid>
    
  
  </Grid>
   

      <div style={{ padding: '10px' }}>
        <button onClick={() => window.location = 'Signup.js'}>
          SignUp
        </button>
      </div>



       
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putDataToDB(this.state.message)}>
            ADD
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div>
      </div>
    );
  }
}

export default App;