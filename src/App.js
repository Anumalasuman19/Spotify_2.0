import {Route, Switch} from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage/LoginPage'
import HomePage from './components/HomePage/HomePage'
import PlaylistDetails from './components/PlaylistDetails/PlaylistDetails'

const App = () => (
  <Switch>
    <Route exact path="/Login" component={LoginPage} />
    <Route exact path="/" component={HomePage} />
    <Route exact path="/playlist/:id" component={PlaylistDetails} />
  </Switch>
)

export default App
