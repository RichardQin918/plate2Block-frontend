import './App.css'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Select from '@material-ui/core/Select'
import Slider from '@material-ui/core/Slider'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import InputLabel from '@material-ui/core/InputLabel';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { ethers } from 'ethers'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link as RouterLink,
  useLocation,
  useHistory,
} from 'react-router-dom'

import {
  CONTRACT_ADDRESS,
  ABI
} from './constants'
import { makeStyles } from '@material-ui/core/styles';

const NETWORK = 'ropsten'
 
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
      <Typography component='h1'>License Registration App</Typography>
    </div>
  )
}

function AppBody() {
  const classes = useStyles();
  const [savedAddress, setSavedAddress] = React.useState(
    window.localStorage.getItem('ethAddress') || '',
  )

  React.useEffect(() => {
    if (savedAddress) {
      console.log('got!')
      window.localStorage.setItem('ethAddress', savedAddress)
    } else {
      window.localStorage.removeItem('ethAddress')
    }
  }, [savedAddress])

  return (
    <Switch>
      <Route
        path='/'
        exact={true}
        render={() => (
          <LoginPage
            savedAddress={savedAddress}
            setSavedAddress={setSavedAddress}
            classes={classes} 
            isLoggedIn={Boolean(savedAddress)}
          />
        )}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedAddress)}
        path='/main'
        exact={true}
        render={() => <MainPage />}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedAddress)}
        path='/main'
        exact={true}
        render={() => <MainPage />}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedAddress)}
        path='/register'
        exact={true}
        render={() => <RegisterPage ethAddress={savedAddress}/>}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedAddress)}
        path='/search'
        exact={true}
        render={() => <SearchPage
          
        />}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedAddress)}
        path='/registerResult'
        exact={true}
        render={() => <RegisterResultPage 
        />}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedAddress)}
        path='/searchResult'
        exact={true}
        render={() => <SearchResultPage 
          ethAddress={savedAddress}
        />}
      />

    </Switch>
  )
}

function LoginPage({savedAddress, setSavedAddress, classes, isLoggedIn}) {
  const [ethAddress, setEthAddress] = React.useState(
    window.localStorage.getItem('ethAddress') || '',
  )

  const onChangeAddress = async event => {
    const accounts = await window.ethereum.enable()
    console.log('Accounts found:', accounts)
    setEthAddress(accounts)
  }
  const toPart1 = () => {
    console.log('clicked!')
    setSavedAddress(ethAddress)
  }

  return (
    <div>
      {savedAddress?
        <Redirect to='/main' />  
        :
        <Grid container={true} justify='space-between'>
          <Typography component='h1' gutterBottom={true}>
            Welcome to our License registration APP!
          </Typography>
          <Typography variant='h5' component='h1' align='left'>
            Please make sure you are connected to an Ethereum Node in Ropsten network
          </Typography>
            <form className={classes.root} noValidate autoComplete="off">
              <Grid item xs={12} lg={6}>
                <TextField  value={ethAddress} onChange={onChangeAddress}  id="standard-basic" label="Name" />
                <Grid style={{ marginTop: 10 }} container spacing={1}>
                  <Grid item xs={6}>
                    <Button 
                      variant='outlined' 
                      onClick={toPart1}
                      disabled={ethAddress === ''}
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

  return (<div>
    <FormControl component="fieldset" className={classes.formControl}>
      <Grid container spacing={3} >
        <Grid item xs={12} sm={6}>
          <Button onClick={goToRegister} variant='outlined'>Register</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button onClick={goToSearch} variant='outlined'>Search</Button>
        </Grid>
      </Grid>
    </FormControl>

    
  </div>)
}

function RegisterPage({ethAddress}) {
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
    const provider = ethers.getDefaultProvider(NETWORK)
    let contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    let transactionObject = {
      nonce: await provider.getTransactionCount(CONTRACT_ADDRESS),
      gasLimit: 35000,
      gasPrice: await provider.getGasPrice(),
      chainId: ethers.utils.getNetwork('ropsten').chainId
    }
    try {
      let result = await contract.methods.register(name, address, ethAddress, VIN, plate).send(transactionObject)
      console.log('this is result: ', result)
    }
    catch(error) {
      console.log('register failed: ', error)
    }
    //register code
    history.push('/registerResult')
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
          <TextField  value={ethAddress}  id="standard-basic" label="ETH Address" />
        </Grid>
      </form>
      <Grid style={{ marginTop: 10 }} container spacing={1}>
        <Grid item xs={6}>
          <Button 
            variant='outlined' 
            onClick={register}
            disabled={name === '' || address === '' || plate === '' || VIN === '' || VIN.length !== 17 || !isValidPlate}
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

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const classes = useStyles();
  const [searchKey, setSearchKey] = React.useState('');

  const handleSearchKey = event => {
    setSearchKey(event.target.value);
  };

  function search() {
    // localStorage.setItem('q3', JSON.stringify({key: 'q3', question: 'When is your birthday ?', answer: dateString}))
    // localStorage.setItem('q4', JSON.stringify({key: 'q4', question: 'Which province do your reside in ?', answer: province}))

    history.push('/searchResult')
  }

  return (<div>
    <FormControl className={classes.formControl}>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid item xs={12} lg={6}>
          <TextField  value={searchKey} onChange={handleSearchKey}  id="standard-basic" label="ETHAddress, VIN or plate#" />
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
function RegisterResultPage() {
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
