import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  render() {
    const {handleInputChange, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit} style={styles.container}>
        <input style={{marginBottom: 5}} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
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
  handleSubmit: PropTypes.func
};

export default SearchBar;
