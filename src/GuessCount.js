import PropTypes from 'prop-types'
import React from 'react'

import './GuessCount.css'

/**
 * Dislay the number of guesses done by the user
 * @component
 * @prop {number} guesses Number of guesses done by the user
 * @returns {JSX} Information to display on the screen
 */
const GuessCount = ({ guesses }) => <div className="guesses">{guesses}</div>

// GuessCount.defaultProps = {
//     guesses: 0,
// }

GuessCount.propTypes = {
    guesses: PropTypes.number.isRequired,
}

export default GuessCount
