import React from 'react';
import PropTypes from 'prop-types';

const Artist = ({name, url}) => {
  return (
    <div style={styles.artistContainer}>
      <a href={url}>
        <div style={styles.artistNameContainer}>
          {name}
        </div>
      </a>
    </div>
  );
};

const styles = {
  artistContainer: {
    display: 'flex',
  },
  artistNameContainer: {
    backgroundColor: 'orange',
    flex: '2',
    fontWeight: 700,
    fontSize: 36

  }

};

Artist.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Artist;
