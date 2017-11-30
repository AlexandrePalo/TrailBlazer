import React, { Component } from 'react'
import FontIcon from 'material-ui/FontIcon'
import './basics.css'

class SearchBar extends Component {
  state = {
    results: []
  }

  handleTextChange(e) {
    this.setState({ results: [{ name: e.target.value }] })
  }

  render() {
    return (
      <div>
        <div style={styles.container}>
          <FontIcon className="material-icons" style={styles.icon}>
            search
          </FontIcon>
          <input
            onChange={this.handleTextChange}
            style={styles.input}
            type="text"
            placeholder="Enter an adress"
          />
        </div>
        <div>
          {this.state.results.map(result => (
            <div style={styles.autocompleteResult}>{result.name}</div>
          ))}
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300
  },
  input: {
    border: 'none',
    color: 'black',
    opacity: 0.87,
    marginLeft: 5,
    marginRight: 5,
    width: '100%'
  },
  icon: {
    color: 'black',
    opacity: 0.54
  },
  autocompleteResult: {
    marginTop: 5,
    color: 'black',
    opacity: 0.54
  }
}

export { SearchBar }
