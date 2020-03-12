import './App.css'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import FormControl from '@material-ui/core/FormControl'
import axios from './utils/axios'

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link as RouterLink,
  useHistory,
} from 'react-router-dom'

import {
  CONTRACT_ADDRESS,
  ABI
} from './constants'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 10
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

}));

export default function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <div className='App-Content'>
          <AppHeader />
          <Box m={4} />
          <AppBody />
        </div>
      </div>
    </BrowserRouter>
  )
}

function AppHeader() {
  return (
    <div className='AppHeader'>
      <Typography component='h1'>Plate2Block</Typography>
    </div>
  )
}

function AppBody() {
  const classes = useStyles();
  const [savedUsername, setSavedUsername] = React.useState(
   ''
  )

  return (
    <Switch>
      <Route
        path='/'
        exact={true}
        render={() => (
          <LoginPage
            savedUsername={savedUsername}
            setSavedUsername={setSavedUsername}
            classes={classes} 
            isLoggedIn={Boolean(savedUsername)}
          />
        )}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedUsername)}
        path='/main'
        exact={true}
        render={() => <MainPage />}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedUsername)}
        path='/register'
        exact={true}
        render={() => <RegisterPage username={savedUsername}/>}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedUsername)}
        path='/search'
        exact={true}
        render={() => <SearchPage
          
        />}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedUsername)}
        path='/renew'
        exact={true}
        render={() => <RenewPage
          
        />}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedUsername)}
        path='/changeOwner'
        exact={true}
        render={() => <ChangeOwnerPage
          
        />}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedUsername)}
        path='/registerResult'
        exact={true}
        render={() => <RegisterResultPage 
        />}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedUsername)}
        path='/searchResult'
        exact={true}
        render={() => <SearchResultPage 
          username={savedUsername}
        />}
      />

    </Switch>
  )
}

function LoginPage({savedUsername, setSavedUsername, classes, isLoggedIn}) {
const [username, setUsername] = React.useState(
  window.localStorage.getItem('username') || '',
)

const onChangeAddress = async event => {
  const newName = event.target.value
  console.log('newNames found:', event.target.value)
  setUsername(newName)
}
const toPart1 = () => {
  setSavedUsername(username)
  window.localStorage.setItem("username", username)
}

return (
  <div>
    {savedUsername?
      <Redirect to='/main' />  
      :
      <Grid container={true} justify='space-between'>
        <Typography component='h1' gutterBottom={true}>
          Welcome to our Plate2Block!
        </Typography>
        <Typography variant='h5' component='h1' align='left'>
          Pick a name for yourself and get started
        </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <Grid item xs={12} lg={6}>
              <TextField  value={username} onChange={onChangeAddress}  id="standard-basic" label="Name" />
              <Grid style={{ marginTop: 10 }} container spacing={1}>
                <Grid item xs={6}>
                  <Button 
                    variant='outlined' 
                    onClick={toPart1}
                    disabled={username === ''}
                  >CONTINUE</Button>
                </Grid>
              </Grid>
            </Grid>
          
          </form>

          <Link to='/' component={RouterLink}>
            Back to start
          </Link>
      </Grid>
      }
  </div>
)
}

function MainPage() {
  const classes = useStyles();
  const history = useHistory()

  function goToSearch() {
    history.push('/search')
  }

  function goToRegister() {
    history.push('/register')
  }

  function goToRenew() {
    history.push('/renew')
  }

  function goToChangeOwner() {
    history.push('/changeOwner')
  }

  return (<div>
    <FormControl component="fieldset" className={classes.formControl}>
      <Grid container spacing={3} >
        <Grid item xs={12} sm={6}>
          <Button onClick={goToRegister} variant='outlined'>Register</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button onClick={goToSearch} variant='outlined'>Search</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button onClick={goToRenew} variant='outlined'>Renew</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button onClick={goToChangeOwner} variant='outlined'>ChangeOwner</Button>
        </Grid>
      </Grid>
    </FormControl>

    
  </div>)
}

function RegisterPage({username}) {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [VIN, setVIN] = React.useState('');
  const [plate, setPlate] = React.useState('');
  const [isValidPlate, setIsValidPLate] = React.useState(false)

  const history = useHistory()

  const handleName = event => {
    setName(event.target.value);
  };
  const handleAddress = event => {
    setAddress(event.target.value);
  };
  const handleVIN = event => {
    setVIN(event.target.value);
  };
  const handlePlate = event => {
    if(event.target.value.match("^[a-zA-Z ]*$") === null ){
      setPlate(event.target.value);
    }
    if (event.target.value.length === 7) {
      setIsValidPLate(true)
    }
    else {
      setIsValidPLate(false)
    }
  };


  async function register() {
    console.log('registered!')    
  }

  return (<div>
    <FormControl component="fieldset" className={classes.formControl}>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid item xs={12} lg={6}>
          <TextField  value={name} onChange={handleName}  id="standard-basic" label="Name" />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField  value={address} onChange={handleAddress}  id="standard-basic" label="address" />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField  value={VIN} onChange={handleVIN}  id="standard-basic" label="VIN" />
          {VIN.length === 17 ? null : <Typography style={{color: 'red'}}>Please input valid VIN number</Typography>}
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField  value={plate} onChange={handlePlate}  id="standard-basic" label="plate" />
          {isValidPlate ? null : <Typography style={{color: 'red'}}>Please input plate number in valid form</Typography>}
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField  value={username}  id="standard-basic" label="ETH Address" />
        </Grid>
      </form>
      <Grid style={{ marginTop: 10 }} container spacing={1}>
        <Grid item xs={6}>
          <Button 
            variant='outlined' 
            onClick={register}
            // disabled={name === '' || address === '' || plate === '' || VIN === '' || VIN.length !== 17 || !isValidPlate}
          >Register</Button>
          <Grid item xs={6}>
            <Button 
              variant='outlined' 
              onClick={() => history.goBack()}
            >Back</Button>
          </Grid>
        </Grid>
      </Grid>
    </FormControl>

    
  </div>)
}

function SearchPage() {
  const history = useHistory()

  const classes = useStyles();
  const [searchKey, setSearchKey] = React.useState('');

  const handleSearchKey = event => {
    setSearchKey(event.target.value);
  };

  function search() {
    // Incomplete search function


    history.push('/searchResult')
  }

  return (<div>
    <FormControl className={classes.formControl}>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid item xs={12} lg={6}>
          <TextField  value={searchKey} onChange={handleSearchKey}  id="standard-basic" label="username, VIN or plate#" />
        </Grid>
      </form>
      <Grid style={{ marginTop: 10 }} container spacing={1}>
        <Grid item xs={6}>
          <Button 
            variant='outlined' 
            onClick={search}
            disabled={searchKey === ''}
          >Search</Button>
        </Grid>
        <Grid item xs={6}>
          <Button 
            variant='outlined' 
            onClick={() => history.goBack()}
          >Back</Button>
        </Grid>
      </Grid>
    </FormControl>
  </div>)
}

function RenewPage() {
  const classes = useStyles();
  const history = useHistory()

  const [searchKey2, setSearchKey2] = React.useState('');
  const [searchKey3, setSearchKey3] = React.useState('');

  const handleSearchKey2 = event => {
    setSearchKey2(event.target.value);
  };

  const handleSearchKey3 = event => {
    setSearchKey3(event.target.value);
  };

  function update() {
    // Incomplete search function


    history.push('/searchResult')
  }

  // Incomplete renew page
  return (
    <div>
      <FormControl>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid item xs={12} lg={6}>
          <TextField  value={searchKey2} onChange={handleSearchKey2}  id="standard-basic" label="username, VIN or plate#" />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField  value={searchKey3} onChange={handleSearchKey3}  id="standard-basic2" label="update#" />
        </Grid>
      </form>
      
      <Grid style={{ marginTop: 10 }} container spacing={1}>
        <Grid item xs={6}>
          <Button 
            variant='outlined' 
            onClick={update}
            disabled={searchKey2 === '' || searchKey3 === ''}
          >Update</Button>
        </Grid>
        <Grid item xs={6}>
          <Button 
            variant='outlined' 
            onClick={() => history.goBack()}
          >Back</Button>
        </Grid>
      </Grid>
      </FormControl>
    </div>
  )
}

function ChangeOwnerPage() {
  const classes = useStyles();

  // Incomplete changeownerPage
  return (
    <div>
      <FormControl>

      </FormControl>
    </div>
  )
}

async function RegisterResultPage() {
  const history = useHistory()
  const classes = useStyles();
  let list = [{key: 'test', id: 1, name: 'name', value: 'value'}]

  return (
      <div className={classes.root}>
          <Typography component='h1'>This is your register result </Typography>
          <FormControl className={classes.formControl}>
          {
          list.map(item => (
              <SummaryDetail
                key={item.id}
                name={item.name}
                value={item.value}
              />
          ))
          }

          <Box m={3} />
          <Box m={3} />
          <Button variant='outlined' onClick={() => history.push('/main')}>
            BACK TO HOME
          </Button>
        </FormControl>
      </div>
    
    )
}
function SearchResultPage() {
  const history = useHistory()
  const classes = useStyles();
  let list = [{key: 'test', id: 1, name: 'name', value: 'value'}]
  
      // Incomplete searchResult function


  return (
      <div className={classes.root}>
          <FormControl className={classes.formControl}>
          {
          list.map(item => (
              <SummaryDetail
                key={item.id}
                name={item.name}
                value={item.value}
              />
          ))
          }

          <Box m={3} />
          <Box m={3} />
          <Button variant='outlined' onClick={() => history.push('/main')}>
            BACK TO HOME
          </Button>
        </FormControl>
      </div>
    
    )
}

function SummaryDetail({name, value}) {
  return (
    <Grid>
      <Typography>{name}</Typography>
      <Typography style={{color: '#4d4dff', fontWeight: 'bold'}}>{value}</Typography>
      <Box m={3} />
    </Grid>
    
  )
}
const withLoggedInState = Component => {
  return function NewComponent({ isLoggedIn, ...props }) {
    return (
      <div>
        {!isLoggedIn && <Redirect to='/main' />}
        <Component {...props} />
      </div>
    )
  }
}

const LoggedInRoute = withLoggedInState(Route)
