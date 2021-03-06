import PropTypes from 'prop-types'
import React from 'react'

import './HallOfFame.css'

/**
 * Display information about the winners
 * @component
 * @prop {JSON} entries Information about the winners (See values in {@link HallOfFame}.propTypes)
 * @returns {JSX} Information to display on the screen
 */
const HallOfFame = ({ entries }) => (
    <table className="hallOfFame">
        <thead>
            <tr>
                <th>Date</th>
                <th>Guesses</th>
                <th>Player</th>
            </tr>
        </thead>
        <tbody>
            {entries.map(({
                date, guesses, id, player,
            }) => (
                <tr key={id}>
                    <td className="date">{date}</td>
                    <td className="guesses">{guesses}</td>
                    <td className="player">{player}</td>
                </tr>
            ))}
        </tbody>
    </table>
)

HallOfFame.propTypes = {
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            guesses: PropTypes.number.isRequired,
            id: PropTypes.number.isRequired,
            player: PropTypes.string.isRequired,
        }),
    ).isRequired,
}

export default HallOfFame

// ===== Internal helpers =====

export const HOF_KEY = '::Memory::HallOfFame'
export const HOF_MAX_SIZE = 10 // limit the number of winners to HOF_MAX_SIZE in the HallOfFame

/**
 * Save information about a player
 * @param {JSON} entry Information about a player (See parameter given
 * in code of function {@link HighScoreInput#persistWinner})
 * @param {function} onStored Function called after information
 * is stored in order to display information about the winners
 * (See parameter given in code of function {@link HighScoreInput#persistWinner})
 */
export function saveHOFEntry(entry, onStored) {
    const { guesses, player } = entry
    const date = new Date().toLocaleDateString()
    const id = Date.now()
    const newEntry = {
        guesses, player, date, id,
    }

    const entries = JSON.parse(localStorage.getItem(HOF_KEY) || '[]')

    const insertionPoint = entries.findIndex(
        (_entry) => _entry.guesses >= newEntry.guesses,
    )
    // findIndex does not execute the function for array elements without values
    // i.e. when entries === []

    if (insertionPoint === -1) {
        entries.push(newEntry)
    } else {
        entries.splice(insertionPoint, 0, newEntry)
    }
    if (entries.length > HOF_MAX_SIZE) {
        entries.splice(HOF_MAX_SIZE, entries.length)
    }
    localStorage.setItem(HOF_KEY, JSON.stringify(entries))
    onStored(entries)
}

/**
 * <p>Empty storage that contains Hall Of Fame</p>
 * <p>This function is used in test files to reset
 * the value of the local storage to make each test independent
 * of one another</p>
 */
export function emptyHOF() {
    localStorage.setItem(HOF_KEY, '[]')
}
