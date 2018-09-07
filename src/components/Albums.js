// 1. Create a github Repo or Click 'Fork' from the top menu and generate your own JSFiddle link.
// Be sure to click 'Update' when your work is done.

// 2. Create a Search Component for entering an Artist

// 3. On Search, make an api call to iTunes API to fetch the information about the artist
// API URL: https://itunes.apple.com/search?term=${ARTIST_NAME}

// 4. When the Search button is clicked, make a call to the API and display the list of albums, including the album name and album cover inside #albums-container in a grid. Use any CSS technique you are comfortable with (Note: The API will return a list of albums based on the search result. Use your skills to find out what the iTunes API data structure looks like and extract the relevant data from it).

// 5. Style the page to the best of the ability to make the UI look clean and presentable

// 6. Checkin or Click Update from the top Menu and save the link

import React, {Component} from 'react';
import Album from "./Album";
import Artist from "./Artist";
const REQUEST_URL = "https://itunes.apple.com/search";


class Albums extends Component {
  constructor(props){
    super(props);
    this.state = {
      albums: {},
      searchTerm: "Phish"
    }
  }

  componentDidMount = () => {
    this._requestAlbums();
  }

  _requestAlbums = (artist="Phish") => {
    const self = this;
    fetch(
      `${REQUEST_URL}?term=${artist}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        let albums = [];
        myJson.results.forEach(song => {
          albums.find(a => a.id === song.collectionId) ||
          albums.push({
            "id": song.collectionId,
            "title": song.collectionName,
            "cover": song.artworkUrl100,
            "url": song.collectionViewUrl,
            "artistUrl": song.artistViewUrl,
          })
        });
        self.setState({albums: albums});
      })
  }

  render() {
    const albums = this.state.albums;
    const searchTerm = this.state.searchTerm;
    return (
      <div>
        {albums && albums.length > 0 &&
        <div>
          <Artist name={searchTerm} url={this.state.albums[0].artistUrl}/>
        </div>
        }
        {albums && albums.length > 0 &&
        albums.map(album=>{
            return (
              <div>
                <Album title={album.title} cover={album.cover} url={album.url}/>
              </div>
            )
          }
        )}
      </div>
    );
  }
}

export default Albums;