import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { PaperForm } from './'

class Welcome extends Component {
  render() {
    return (
      <div style={styles.maxWidthContainer}>
        <PaperForm title="Welcome">
          <div style={styles.container}>
            <span style={styles.title}>TrailBlazer</span>
            <p style={styles.description}>
              Welcome, this is TrailBlazer: a web based application to help
              bikers, hikers and runners to find the most exciting tracks to
              train!
            </p>
            <div style={styles.btnContainer}>
              <RaisedButton
                label="Let's get started!"
                primary
                onClick={() => this.props.setSettingsMode()}
                style={styles.btn}
              />
            </div>
            <div style={styles.authorContainer}>
              <div style={styles.authorSubContainer}>
                <span style={styles.author}>Alexandre PALO</span>
                <span style={styles.author}>Tianyi CHENG</span>
              </div>
              <div style={styles.authorSubContainer}>
                <span style={styles.author}>Guillaume BROGGI</span>
                <span style={styles.author}>Alex MUELLER</span>
              </div>
              <div style={styles.authorSubContainer}>
                <span style={styles.author}>Georgia Tech CSE 6222</span>
                <span style={styles.author}>Final Project</span>
              </div>
            </div>
          </div>
        </PaperForm>
      </div>
    )
  }
}

const styles = {
  maxWidthContainer: {
    width: '50%'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flext-start',
    padding: '15px'
  },
  title: {
    fontSize: '50pt',
    color: 'black',
    opacity: 0.87,
    alignSelf: 'center',
    marginTop: '20px',
    marginBottom: '20px'
  },
  description: {
    fontSize: '20pt',
    color: 'black',
    opacity: 0.54,
    textAlign: 'center',
    textJustify: 'inter-word'
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  btn: {
    //fontSize: '30pt'
    //lineHeight: '100px'
  },
  authorContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '65px',
    width: '100%'
  },
  authorSubContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '30px'
  },
  author: {
    fontSize: '12pt',
    color: 'black',
    opacity: 0.37
  }
}

export { Welcome }
