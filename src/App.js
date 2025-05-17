import {Route, Switch} from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage/LoginPage'
import HomePage from './components/HomePage/HomePage'

const App = () => (
  <Switch>
    <Route exact path="/Login" component={LoginPage} />
    <Route exact path="/" component={HomePage} />
  </Switch>
)

export default App
