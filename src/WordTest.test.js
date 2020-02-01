import React from 'react'
import WordTest from './WordTest'
import { render, fireEvent } from '@testing-library/react'
import { dictionary } from './words'

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