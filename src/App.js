import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css'

import Card from './Card'
import GuessCount from './GuessCount'
import HallOfFame from './HallOfFame'
import HighScoreInput from './HighScoreInput'

const SIDE = 6
export const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_PAUSE_MSECS = 500

/**
 * Memory app
 * @component
 * @extends {Component}
 */
class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cards: this.generateCards(),
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
     * <p>Display information about the winners</p>
     * @param {HallOfFame} hallOfFame Information about the winners
     */
    // Arrow function for binding
    // (i.e. to access `this` of the current object)
    displayHallOfFame = hallOfFame => {
        this.setState({ hallOfFame })
        // where { hallOfFame } is shorthand for { hallOfFame: hallOfFame }
    }

    /**
     * Generate a shuffled array of pairs of cards
     * @return {Array} Shuffled array of pairs of cards
     */
    generateCards() {
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

    /**
     * <p>Get the feeback of a card</p>
     * <p>See possible feedback values in {@link Card#propTypes}</p>
     * @return {string} Feeback value
     */
    getFeedbackForCard(index) {
        const { currentPair, matchedCardIndices } = this.state
        const indexMatched = matchedCardIndices.includes(index)
        let currentFeedback = this.feedbacks[index]
        let newFeedback = ''

        if (currentFeedback === 'justMatched' || currentFeedback === 'disabled') {
            newFeedback = 'disabled'
        }
        else if (currentPair.length < 2) {
            newFeedback = currentPair.includes(index) ? 'visible' : 'hidden'
        }
        else if (currentPair.length === 2) {
            if (currentPair.includes(index)) {
                newFeedback = indexMatched ? 'justMatched' : 'justMismatched'
            }
            else {
                newFeedback = indexMatched ? 'visible' : 'hidden'
            }
        }
        this.feedbacks[index] = newFeedback
        return newFeedback
    }
    
    /**
     * <p>Handle event when card is clicked on</p>
     * @param {number} index Index of the card that was clicked on
     */
    // Arrow function for binding
    handleCardClick = index => {
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
     * Checking if both cards in the pair match
     * @param {number} index Index of the card that was clicked on
     */
    handleNewPair(index) {
        const { cards, currentPair, guesses, matchedCardIndices } = this.state

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
     * Render the whole game
     */
    render() {
        const { cards, guesses, hallOfFame, matchedCardIndices } = this.state
        // Game is won when there are as many matched cards as there are cards
        // in the game
        const won = matchedCardIndices.length === 4 //cards.length
        return ( 
            <div className="memory">
            {/* <span>{`Seconds ${new Date().getSeconds()}`}</span> */}
            <GuessCount guesses={guesses} />
            { cards.map((card, index) => ( 
              <Card card={card}
                  feedback={this.getFeedbackForCard(index)}
                  key={index} // key must be unique and stable in time
                  index={index}
                  onClick={this.handleCardClick}
              />
            ))}
            {won && (hallOfFame ? ( <HallOfFame entries={hallOfFame} />
                    ) : ( <HighScoreInput
                          guesses={guesses}
                          onStored={this.displayHallOfFame}
                        />
                    ))
            }
            </div>
        )
    }
}

export default App