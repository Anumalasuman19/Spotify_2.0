import {Route, Switch} from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage/LoginPage'
import HomePage from './components/HomePage/HomePage'
import PlaylistDetails from './components/PlaylistDetails/PlaylistDetails'
import AlbumDetails from './components/AlbumDetails/AlbumDetails'
import CategoryDetails from './components/CategoryDetails/CategoryDetails'
import PageNotFound from './components/PageNotFound/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/Login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={HomePage} />
    <ProtectedRoute exact path="/playlist/:id" component={PlaylistDetails} />
    <ProtectedRoute exact path="/album/:id" component={AlbumDetails} />
    <ProtectedRoute
      exact
      path="/category/:id/playlists"
      component={CategoryDetails}
    />
    <Route component={PageNotFound} />
  </Switch>
)

export default App
