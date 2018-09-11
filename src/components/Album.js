import React from 'react';
import PropTypes from 'prop-types';

const Album = (props) => {
  const {title, cover, url, tracks, artist, artistUrl, trackCount} = props;

  return (
    <div style={styles.container}>
      <div style={styles.album}>
        <div style={styles.cover}>
          <div>
            <a href={url}><img src={cover} alt={`Album cover for ${title}`} /></a>
          </div>
        </div>

        <div style={styles.albumDetails}>
          <div style={styles.title}>
            <a href={url}>{title}</a>
            <br />
            by <a href={artistUrl}>{artist}</a>
          </div>

          {tracks &&
          <div>
            <div style={styles.trackList}>
              Selected Tracks <br />
              ({trackCount} total tracks)
              <ul style={{listStyle: 'none'}}>
                {tracks.map((track, index) => {
                  /* tracks array might be partially filled */
                  if (track) {
                    return (
                      <li style={styles.track} key={index}>
                        <a href={track.url}>{index}. {track.name}</a>
                      </li>
                    )
                  }
                  else {
                    return '';
                  }
                })}
              </ul>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '80%',
    backgroundColor: '#B38DAA',
    border: '5px #585481 solid',
    margin: '20px auto',
    padding: 20,
  },
  album: {
    display: 'flex',
    flexDirection: 'row'
  },
  cover: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  albumDetails: {
    flexGrow: 5,
    border: '1px #585481 solid',
  },
  title: {
    fontSize: 24
  },
  trackList: {
    margin: '10px auto',
    width: '50%',
    border:  '1px #585481 solid',
  },
  track: {
    fontSize: 10,
    textAlign: "left"
  },
};

Album.propTypes = {
  title: PropTypes.string,
  cover: PropTypes.string,
  url: PropTypes.string,
  tracks: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string.isRequired
  }))
};

export default Album;
