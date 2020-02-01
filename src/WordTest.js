import React from "react"
import { randomWord } from "./words"

class WordTest extends React.Component {
  constructor() {
    super()
    this.state = {
      randomWord: randomWord(),
      guessWord: "",
      message: "",
      tries: 0,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange(event) {
    const {name, value} = event.target
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
          tries: 0
        })
      : this.setState(prevState => ({
            message: "Try Again.",
            guessWord: "",
            tries: prevState.tries + 1
        }))
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
        <br/>
        <p>{this.state.message}</p>
          {this.state.tries!==0 && <p>Tries: {this.state.tries}</p>}
      </div>
    )
  }
}

export default WordTest