import './HomePage.css'
import SideBar from '../SideBar/SideBar'
import AlbumPlaylistItem from './AlbumPlaylistItem/AlbumPlaylistItem'
import GenreMoodItem from './GenreMoodItem/GenreMoodItem'
import HomePageEachCategorySection from './HomePageEachCategorySection/HomePageEachCategorySection'
import {Categories} from '../Constants/Constants'

const HomePage = () => (
  <div className="home-page-container">
    <SideBar />
    <div className="all-categories-container">
      <HomePageEachCategorySection
        apiUrl="https://apis2.ccbp.in/spotify-clone/featured-playlists"
        Component={AlbumPlaylistItem}
        categoryHeading="Editor’s picks"
        section="editors"
        altText="featured playlist"
        category={Categories.editorPicks}
      />
      <HomePageEachCategorySection
        apiUrl="https://apis2.ccbp.in/spotify-clone/categories"
        Component={GenreMoodItem}
        categoryHeading="Genres & Moods"
        section="Genres & Moods"
        altText="category"
        category={Categories.genresAndMoods}
      />
      <HomePageEachCategorySection
        apiUrl="https://apis2.ccbp.in/spotify-clone/new-releases"
        Component={AlbumPlaylistItem}
        categoryHeading="New releases"
        section="New releases"
        altText="new release album"
        category={Categories.newRelease}
      />
    </div>
  </div>
)

export default HomePage
