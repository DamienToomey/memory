import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css'

import Card from './Card'
import GuessCount from './GuessCount'
import HallOfFame from './HallOfFame'
import HighScoreInput from './HighScoreInput'

// SIDE * SIDE should be an even number as each card must be present twice to make pairs
export const SIDE = 4
export const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
export const VISUAL_PAUSE_MSECS = 500

/**
 * Memory app
 * @component
 * @extends {Component}
 */
class App extends Component {
    /**
     * Generate a shuffled array of pairs of cards
     * @return {Array} Shuffled array of pairs of cards
     */
    static generateCards() {
        const result = []
        const size = SIDE * SIDE
        const candidates = Array.from(SYMBOLS) // convert string to array of chars
        // Keep this loop to control number of
        // cards with variable SIDE
        while (result.length < size) {
            const card = candidates.pop()
            result.push(card, card)
        }
        return shuffle(result)
    }

    constructor(props) {
        super(props)
        this.state = {
            cards: App.generateCards(),
            currentPair: [],
            guesses: 0,
            hallOfFame: null,
            matchedCardIndices: [],
        }
        /**
         * Initialize card feedbacks as hidden at the
         * start of the game
         */
        this.feedbacks = Array(SIDE * SIDE).fill('hidden')
    }

    /**
     * <p>Handle event when card is clicked on</p>
     * @param {number} index Index of the card that was clicked on
     */
    // Arrow function for binding
    handleCardClick = (index) => {
        const { currentPair } = this.state

        // Prevent user from clicking when
        // the current pair already contains
        // 2 cards
        if (currentPair.length === 2) {
            return
        }

        if (currentPair.length === 0) {
            this.setState({ currentPair: [index] })
            return
        }
        this.handleNewPair(index)
    }

    /**
     * <p>Flip a card when the card is selected (with tab) and enter key is pressed</p>
     * <p>The card can only be selected once (i.e. only if its current feedback is `hidden`)</p>
     * @arg {Event} event onKeyPress event
     * @arg {Event} onClick onClick event
     * @arg {number} index Index of card that was clicked on
     * @arg {string} feedback Feeback of the card
     * (See possible feedback values in {@link Card}.propTypes)
     */
    // Arrow function for binding
    handleKeyPress = (e, onClick, index, feedback) => {
        if (e.key === 'Enter' && feedback === 'hidden') {
            onClick(index)
        }
    }

    /**
     * Checking if both cards in the pair match
     * @param {number} index Index of the card that was clicked on
     */
    handleNewPair(index) {
        const {
            cards, currentPair, guesses, matchedCardIndices,
        } = this.state

        const newPair = [currentPair[0], index]
        const newGuesses = guesses + 1
        const matched = cards[newPair[0]] === cards[newPair[1]]
        this.setState({ currentPair: newPair, guesses: newGuesses })
        if (matched) {
            this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair] })
        }
        setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS)
    }

    /**
     * <p>Get the feeback of a card</p>
     * <p>See possible feedback values in {@link Card#propTypes}</p>
     * The variable `currentPair` should at maximum contain two elements (i.e. a pair)
     * @return {string} Feeback value
     */
    getFeedbackForCard(index) {
        const { currentPair, matchedCardIndices } = this.state
        const indexMatched = matchedCardIndices.includes(index)
        const currentFeedback = this.feedbacks[index]
        let newFeedback = ''

        if (currentFeedback === 'justMatched' || currentFeedback === 'disabled') {
            newFeedback = 'disabled'
        } else if (currentPair.length < 2) {
            newFeedback = currentPair.includes(index) ? 'visible' : 'hidden'
        } else if (currentPair.includes(index)) {
            // implicit (currentPair.length === 2) as a pair is at most composed of two elements
            newFeedback = indexMatched ? 'justMatched' : 'justMismatched'
        } else {
            // implicit (currentPair.length === 2) as a pair is at most composed of two elements
            newFeedback = indexMatched ? 'visible' : 'hidden'
        }
        this.feedbacks[index] = newFeedback
        return newFeedback
    }

    /**
     * <p>Display information about the winners</p>
     * @param {HallOfFame} hallOfFame Information about the winners
     */
    // Arrow function for binding
    // (i.e. to access `this` of the current object,
    // instead of doing
    // this.displayHallOfFame = this.displayHallOfFame.bind(this)
    // in the constructor)
    displayHallOfFame = (hallOfFame) => {
        this.setState({ hallOfFame })
        // where { hallOfFame } is shorthand for { hallOfFame: hallOfFame }
    }

    /**
     * Render the whole game
     */
    render() {
        const {
            cards, guesses, hallOfFame, matchedCardIndices,
        } = this.state
        // Game is won when there are as many matched cards as there are cards
        // in the game
        const won = matchedCardIndices.length === cards.length
        const table = []
        const copyCards = [...cards]

        // reshape 1D array to 2D array with SIDE rows
        // and SIDE columns
        while (copyCards.length) {
            table.push(copyCards.splice(0, SIDE))
        }
        return (
            <div className="memory">
                <GuessCount guesses={guesses} />
                <table>
                    <tbody>
                        { table.map((row, iRow) => (
                            <tr key={iRow}>
                                { row.map((card, iCol) => {
                                    const index = SIDE * iRow + iCol
                                    return (
                                        <td key={index}>
                                            <Card
                                                card={card}
                                                feedback={this.getFeedbackForCard(index)}
                                                key={index} // key must be unique and stable in time
                                                index={index}
                                                onClick={this.handleCardClick}
                                                onKeyPress={this.handleKeyPress}
                                            />
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {won && (hallOfFame ? (<HallOfFame entries={hallOfFame} />
                ) : (
                    <HighScoreInput
                        guesses={guesses}
                        onStored={this.displayHallOfFame}
                    />
                ))}
            </div>
        )
    }
}

export default App
