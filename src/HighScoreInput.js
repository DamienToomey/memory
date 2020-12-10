import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './HighScoreInput.css'

import { saveHOFEntry } from './HallOfFame'

/**
 * Get winner information, save it and display it
 * @component
 * @prop {number} guesses Number of guesses done by the user
 * @prop {function} onStored Function called after information is stored in order to display information about the winners 
 * @extends {Component}
 */
class HighScoreInput extends Component {

    constructor(props) {
        super(props)
        this.state = { winner: '' }
    }
    
    /**
     * <p>Handle onChange event from user input</p>
     * <p>Transform lower case letters to upper case</p>
     * @param {event} event onChange event
     */
    // Arrow function for binding
    handleWinnerUpdate = event => {
        this.setState({ winner: event.target.value.toUpperCase() })
    }

    /**
     * <p>Handle onSubmit event after the winner submits his information</p>
     * @param {event} event onSubmit event
     */
    // Arrow function for binding
    persistWinner = event => {
        event.preventDefault()
        const newEntry = { guesses: this.props.guesses, player: this.state.winner }
        saveHOFEntry(newEntry, this.props.onStored)
    }

    /**
     * Render the winner information form
     */
    render() {
        return (
        <form className="highScoreInput" onSubmit={this.persistWinner}>
            <p>
            <label>
                Well done! Please enter your name:
                <input
                    autoComplete="given-name"
                    onChange={this.handleWinnerUpdate}
                    type="text"
                    value={this.state.winner}
                />
            </label>
            <button type="submit">I have won!</button>
            </p>
        </form>
        )
    }
}

HighScoreInput.propTypes = {
    guesses: PropTypes.number.isRequired,
    onStored: PropTypes.func.isRequired,
}

export default HighScoreInput