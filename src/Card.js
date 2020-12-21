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
 * @prop {function} onKeyPress Function called a card has the focus and a keyboard key is pressed
 * @returns {JSX} Information to display on the screen
 */
const Card = ({
    card, feedback, index, onClick, onKeyPress,
}) => (
    <div
        className={`card ${feedback}`}
        role="button"
        tabIndex={0} // a value of zero indicates that this element can be tabbed to
        onClick={() => onClick(index)}
        onKeyPress={(e) => onKeyPress(e, onClick, index, feedback)}
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
    onKeyPress: PropTypes.func.isRequired,
}

export default Card
