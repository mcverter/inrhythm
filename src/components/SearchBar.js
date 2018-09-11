import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  render() {
    const {handleInputChange, handleClick} = this.props;
    return (
      <div style={styles.container}>
        <input style={{marginBottom: 5}} onKeyUp={handleInputChange} />
        <button onClick={handleClick}>Submit</button>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '10px auto 20px',
    width: '200px',
    padding: 5,
    border: '1px solid #585481'
  }
};

SearchBar.propTypes = {
  handleInputChange: PropTypes.func,
  handleClick: PropTypes.func
};

export default SearchBar;
