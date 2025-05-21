import {Route, Switch} from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage/LoginPage'
import HomePage from './components/HomePage/HomePage'
import PlaylistsDetails from './components/PlaylistsDetails/PlaylistsDetails'
import AlbumDetails from './components/AlbumDetails/AlbumDetails'
import CategoryPlaylistsDetails from './components/CategoryPlaylistsDetails/CategoryPlaylistsDetails'
import PageNotFound from './components/PageNotFound/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={HomePage} />
    <ProtectedRoute exact path="/playlist/:id" component={PlaylistsDetails} />
    <ProtectedRoute exact path="/album/:id" component={AlbumDetails} />
    <ProtectedRoute
      exact
      path="/category/:id/playlists"
      component={CategoryPlaylistsDetails}
    />
    <Route component={PageNotFound} />
  </Switch>
)

export default App
