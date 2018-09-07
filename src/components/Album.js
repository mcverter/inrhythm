import React from 'react';
import PropTypes from 'prop-types';

const Album = ({title, cover, url}) => {
  return (
    <div>
      <a href={url}>
        <div>
          <img src={cover} />
            <div>
              {title}
            </div>
        </div>
      </a>
    </div>
  );
};

Album.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Album;
