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
    <tbody>
      {entries.map(({ date, guesses, id, player }) => (
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
    })
  ).isRequired,
}

export default HallOfFame

// ===== Internal helpers =====

const HOF_KEY = '::Memory::HallOfFame'
const HOF_MAX_SIZE = 10

/**
 * Save information about a player
 * @param {JSON} entry Information about a player (See parameter given in code of function {@link HighScoreInput#persistWinner})
 * @param {function} onStored Function called after information is stored in order to display information about the winners (See parameter given in code of function {@link HighScoreInput#persistWinner})
 */
export function saveHOFEntry(entry, onStored) {
  entry.date = new Date().toLocaleDateString()
  entry.id = Date.now()

  const entries = JSON.parse(localStorage.getItem(HOF_KEY) || '[]')
  const insertionPoint = entries.findIndex(
    ({ guesses }) => guesses >= entry.guesses
  )

  if (insertionPoint === -1) {
    entries.push(entry)
  } else {
    entries.splice(insertionPoint, 0, entry)
  }
  if (entries.length > HOF_MAX_SIZE) {
    entries.splice(HOF_MAX_SIZE, entries.length)
  }

  localStorage.setItem(HOF_KEY, JSON.stringify(entries))
  onStored(entries)
}