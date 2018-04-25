import React, { Component } from 'react';
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Item from "./components/Item";
import characters from "./characters.json";
import './App.css';

class App extends Component {

  state = {
    score: 0,
    topScore: 0,
    maxScore: 12,
    message: "Click on a picture to begin!",
    messageClass:"",
    characters: characters
  };

  shuffle = (array) => {
    
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;

  }

  correctChoice = () => {

    if (this.state.score + 1 > this.state.topScore) {
      this.setState({topScore: this.state.topScore + 1})
    }
    if (this.state.score + 1 === this.state.maxScore) {
      this.setState({score: this.state.score + 1, message: "You win", messageClass: "Correct"})
    } else {
      this.setState({score: this.state.score + 1, message: "You guessed correctly", messageClass: "Correct"})
    }

  } // close correctChoice

  wrongChoice = () => {

    this.setState({score: 0, message: "You guessed incorrectly!"})
    const updatedCharacters = this.state.characters.map(ch => ch.isClicked === (true) ? { ...ch, isClicked: false } : ch)
    return updatedCharacters

  }

  winReset = (currectCharacters) => {

    if (this.state.score + 1 === this.state.maxScore) {
      this.setState({score: 0, topScore: 0})
      const updatedCharacters = currectCharacters.map(ch => (true) ? { ...ch, isClicked: false} : ch)
        return updatedCharacters
    } else {
      return currectCharacters
    }

  } // close winReset

 
  randomizeCharacters = (name) => {

    var resetNeeded = false;
    const characters = this.state.characters.map(ch => {

      if(ch.name === name) {
        if (ch.isClicked === false) {
          this.correctChoice()
          return { ...ch, isClicked: true}
        } else {
          resetNeeded = true
          return { ...ch, isClicked: false}
        }
      }
      return ch
    })
    if (resetNeeded) {
      this.setState({
        characters: this.shuffle(this.wrongChoice()),
        messageClass:"incorrect"
      })
      
    } else {
      this.setState({ characters: this.shuffle(this.winReset(characters)) })
    }
    
  } //close randomizeCharacters

  renderCharacter = () => {

    return this.state.characters.map((character) =>
            <Item 
              image={character.image} 
              name={character.name} 
              key={character.id} 
              onClick={this.randomizeCharacters} 
            />

          );
  }

  render() {

    return (
      <div className="App">
        <Navbar
          score={this.state.score}
          topscore={this.state.topScore}
          message={this.state.message}
          messageClass={this.state.messageClass}
        />

        <Header />
        <div className="content">
          {this.renderCharacter()}
        </div>
      </div>

    );
  }
}

export default App;
