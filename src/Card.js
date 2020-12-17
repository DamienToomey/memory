import PropTypes from 'prop-types'
import React from 'react'

import './Card.css'

export const HIDDEN_SYMBOL = '❓'

/**
 * Display a card on the screen
 * @component
 * @prop {string} card Content of the card
 * @prop {string} feedback Feeback of the card
 * (See possible feedback values in {@link Card}.propTypes)
 * @prop {number} index Index of the card
 * @prop {function} onClick Function called when the card is clicked on
 * @returns {JSX} Information to display on the screen
 */
const Card = ({
    card, feedback, index, onClick,
}) => (
    <div
        className={`card ${feedback}`}
        role="button"
        onClick={() => onClick(index)}
    >
        <span className="symbol">{feedback === 'hidden' ? HIDDEN_SYMBOL : card}</span>
    </div>
)

Card.propTypes = {
    card: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
        'visible',
        'hidden',
        'justMatched',
        'justMismatched',
        'disabled',
    ]).isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Card
