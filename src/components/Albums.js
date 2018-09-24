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
import SearchBar from './SearchBar';

const REQUEST_URL = "https://itunes.apple.com/search";


class Albums extends Component {
  constructor(props){
    super(props);
    this.state = {
      albums: {},
      searchTerm: "Phish"
    };
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount = () => {
    this._requestAlbums();
  };

  _handleInputChange = (event) => {
    this.setState({searchTerm: event.target.value})
  };

  _handleSubmit = (event) => {
    event.preventDefault();
    this._requestAlbums();
  };

  _requestAlbums = () => {
    const self = this;
    const artist = this.state.searchTerm;

    fetch(
      `${REQUEST_URL}?term=${artist}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        self.setState({searchTerm: ''});

        let albums = [];
        myJson.results.forEach(song => {
          let album = albums.find(a => a.id === song.collectionId);

          /* Add song to existing album */
          if (album) {
            album.tracks[song.trackNumber] = {
              name: song.trackName,
              trackUrl: "trackViewUrl"
            }
          }
          else {
            /* Add new album */
            album = {
              "id": song.collectionId,
              "title": song.collectionName,
              "cover": song.artworkUrl100,
              "url": song.collectionViewUrl,
              "artistUrl": song.artistViewUrl,
              "artist": song.artistName,
              "totalTracks": song.trackCount
            };
            albums.push(album);
            album.tracks = new Array(song.trackCount);
            album.tracks[song.trackNumber] = {
              name: song.trackName,
              url: song.trackViewUrl,
            }
          }
        });
        self.setState({albums: albums, searchTerm: artist});
      })
  };

  render() {
    const albums = this.state.albums;
    return (
      <div style={styles.container}>
        <div style={styles.pageTitle}> Search the Itunes Store!!! </div>

        <div>
          <SearchBar
            handleSubmit={this._handleSubmit}
            handleInputChange={this._handleInputChange}/>

          <div style={styles.resultsBanner}>
            Search Results
          </div>

          <div>
            {albums && albums.length > 0 &&
            albums.map((album, index) =>{
                return (
                  <div key={index}>
                    <Album
                      artist={album.artist}
                      artistUrl={album.artistUrl}
                      title={album.title}
                      cover={album.cover}
                      url={album.url}
                      tracks={album.tracks}
                      trackCount={album.totalTracks}
                    />
                  </div>
                )
              }
            )}
          </div>
        </div>
      </div>
    );
  }
}


const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: '#D1BCE3'
  },
  pageTitle: {
    fontSize: 48,
    fontWeight: 600,
    marginBottom: 10
  },
  resultsBanner: {
    fontWeight: 500,
    fontSize: 24
  }
};

export default Albums;
