import React from 'react'
import WordTest from './WordTest'
import { render, fireEvent } from '@testing-library/react'
import { dictionary } from './words'
import { accentedLetters } from './accentedLetters'

test('renders given language label', () => {
  const { getByText } = render(<WordTest />)
  const givenLanguage = getByText('English')
  expect(givenLanguage).toBeInTheDocument()
})

test('renders test language label', () => {
  const { getByText } = render(<WordTest />)
  const testLanguage = getByText('French')
  expect(testLanguage).toBeInTheDocument()
})

test('incorrect guess gives "try again" message', () => {
  const { getByLabelText, getByText } = render(<WordTest />)
  const input = getByLabelText('guess-input')
  fireEvent.change(input, { target: { value: 'abcd'} })
  fireEvent.submit(input)
  const message = getByText('Try Again.')
  expect(message).toBeInTheDocument()
})

test('incorrect guess resets guess field', () => {
  const { getByLabelText, getByText } = render(<WordTest />)
  const input = getByLabelText('guess-input')
  fireEvent.change(input, { target: { value: 'abcd'} })
  fireEvent.submit(input)
  expect(input.value).toBe('')
})

test('incorrect guess asks to guess same word', () => {
  const { getByLabelText, getByTestId } = render(<WordTest />)
  const givenWord = getByTestId('random-word').textContent
  const input = getByLabelText('guess-input')
  fireEvent.change(input, { target: { value: 'abcd'} })
  fireEvent.submit(input)
  expect(givenWord).toBe(givenWord)
})

test('correct guess gives "correct" message', () => {
  const { getByLabelText, getByTestId, getByText } = render(<WordTest />)
  const givenWord = getByTestId('random-word').textContent
  const object = dictionary.find( x => x.english === givenWord)
  const answer = object.french
  const input = getByLabelText('guess-input')
  fireEvent.change(input, { target: { value: answer} })
  fireEvent.submit(input)
  const message = getByText('Correct!')
  expect(message).toBeInTheDocument()
})

test('correct guess resets guess field', () => {
  const { getByLabelText, getByTestId } = render(<WordTest />)
  const givenWord = getByTestId('random-word').textContent
  const object = dictionary.find( x => x.english === givenWord)
  const answer = object.french
  const input = getByLabelText('guess-input')
  fireEvent.change(input, { target: { value: answer} })
  fireEvent.submit(input)
  expect(input.value).toBe('')
})

test('correct guess asks to guess a different word', () => {
  const { getByLabelText, getByTestId } = render(<WordTest />)
  let givenWord = getByTestId('random-word').textContent
  const object = dictionary.find( x => x.english === givenWord)
  const answer = object.french
  const input = getByLabelText('guess-input')
  fireEvent.change(input, { target: { value: answer} })
  fireEvent.submit(input)
  const newWord = getByTestId('random-word').textContent
  expect(newWord).not.toBe(givenWord)
})

test('wrong guess adds to tries', () => {
  const { getByLabelText, getByText } = render(<WordTest />)
  const input = getByLabelText('guess-input')
  fireEvent.change(input, { targe: { value: "abcd" } })
  fireEvent.submit(input)
  let triesMessage = getByText('Tries: 1')
  expect(triesMessage).toBeInTheDocument()
  fireEvent.change(input, { targe: { value: "efgh" } })
  fireEvent.submit(input)
  triesMessage = getByText('Tries: 2')
  expect(triesMessage).toBeInTheDocument()
})

test('correct guess shows no tries', () => {
  const { getByLabelText, queryByText, getByTestId } = render(<WordTest />)
  let givenWord = getByTestId('random-word').textContent
  const object = dictionary.find( x => x.english === givenWord)
  const answer = object.french
  const input = getByLabelText('guess-input')
  fireEvent.change(input, { target: { value: answer} })
  fireEvent.submit(input)
  const triesMessage = queryByText('Tries')
  expect(triesMessage).toBeNull()
})

test('typing a letter that can have an accent shows accent options for that letter', () => {
  const { getByLabelText, getByText } = render(<WordTest />)
  const input = getByLabelText('guess-input')
  for (let key in accentedLetters) {
    fireEvent.change(input, { target: { value: key} })
    accentedLetters[key].forEach( value => {
      let option = getByText(value)
      expect(option).toBeInTheDocument()
    })
  }
})

test('typing a letter that does not have an accent does not show accent options', () => {
  const { getByLabelText, queryByText } = render(<WordTest />)
  const input = getByLabelText('guess-input')
  const letters = [..."bdfghjklmnpqrstvwxyz"]
  letters.forEach( letter => {
    fireEvent.change(input, { target: { value: letter} })
    const accents = ["â", "à", "é", "ê", "è", "ë", "î", "ï", "ô", "û", "ù", "ü", "ç"]
    accents.forEach( accent => {
      expect(queryByText(accent)).toBeNull()
    })
  })
})

test('clicking on accent button replaces letter with accented letter', () => {
  const { getByLabelText, getByText } = render(<WordTest />)
  let input = getByLabelText('guess-input')
  fireEvent.change(input, { target: { value: 'a'} })
  const aAccentButton = getByText("â")
  fireEvent.click(aAccentButton)
  input = getByLabelText('guess-input')
  expect(input.value).toBe("â")
})