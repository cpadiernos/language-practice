import React from "react"
import { randomWord } from "./words"
import { accentedLetters } from "./accentedLetters"

class WordTest extends React.Component {
  constructor() {
    super()
    this.state = {
      randomWord: randomWord(),
      guessWord: "",
      message: "",
      tries: 0,
      accents: "",
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAccentClick = this.handleAccentClick.bind(this)
  }
  
  handleChange(event) {
    const {name, value} = event.target
    const currentLetter = value.slice(-1)
    accentedLetters[currentLetter]
      ? this.setState({
          accents: this.generateAccents(accentedLetters[currentLetter])
        })
      : this.setState({
          accents: ""
        })
    this.setState({
      [name]: value
    })
  }
  
  handleSubmit(event) {
    event.preventDefault()
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
    this.state.guessWord === this.state.randomWord.french
      ? this.setState({
          message: "Correct!",
          guessWord: "",
          randomWord: randomWord(),
          tries: 0,
          accents: ""
        })
      : this.state.tries > 4
        ? this.setState(prevState => ({
            message: 'Better luck next time - "'
              + prevState.randomWord.english + '" is "'
              + prevState.randomWord.french + '"',
            guessWord: "",
            randomWord: randomWord(),
            tries: 0,
            accents: "",
          }))
        : this.setState(prevState => ({
            message: "Try Again.",
            guessWord: "",
            tries: prevState.tries + 1,
            accents: ""
          }))
  }
  
  handleAccentClick(event) {
    const {value} = event.target
    this.setState(prevState => ({
      guessWord: prevState.guessWord.replace(/.$/,value)
    }))
  }
  
  generateAccents(letterAccents) {
      return letterAccents.map(accent =>
        <button
          key={accent}
          value={accent}
          onClick={this.handleAccentClick}
          > {accent}
        </button>
      )
  }
  
  render() {
    return (
      <div>
        <h1>English</h1>
        <h2 data-testid="random-word">{this.state.randomWord.english}</h2>
        <h1>French</h1>
        <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="guessWord"
          value={this.state.guessWord}
          aria-label="guess-input"
          onChange={this.handleChange}
        />
        </form>
        <p>{this.state.accents}</p>
        <p>{this.state.message}</p>
          {this.state.tries!==0 && <p>Tries: {this.state.tries}</p>}
          {this.state.tries > 2
            && <p>Hint: Starts with "{this.state.randomWord.french.charAt(0)}"</p>}
      </div>
    )
  }
}

export default WordTest