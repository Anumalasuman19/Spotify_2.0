import {Route, Switch} from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage/LoginPage'
import HomePage from './components/HomePage/HomePage'
import PlaylistDetails from './components/PlaylistDetails/PlaylistDetails'
import AlbumDetails from './components/AlbumDetails/AlbumDetails'
import CategoryDetails from './components/CategoryDetails/CategoryDetails'

const App = () => (
  <Switch>
    <Route exact path="/Login" component={LoginPage} />
    <Route exact path="/" component={HomePage} />
    <Route exact path="/playlist/:id" component={PlaylistDetails} />
    <Route exact path="/album/:id" component={AlbumDetails} />
    <Route exact path="/category/:id/playlists" component={CategoryDetails} />
  </Switch>
)

export default App
