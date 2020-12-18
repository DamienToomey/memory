import PropTypes from 'prop-types'
import React from 'react'

import './Card.css'

export const HIDDEN_SYMBOL = '❓'

/**
 * <p>Flip a card when the card is selected (with tab) and enter key is pressed</p>
 * <p>The card can only be selected once (i.e. only if its current feedback is `hidden`)</p>
 * @arg {Event} event onKeyPress event
 * @arg {Event} onClick onClick event
 * @arg {number} index Index of card that was clicked on
 * @arg {string} feedback Feeback of the card
 * (See possible feedback values in {@link Card}.propTypes)
 */
function handleKeyPress(e, onClick, index, feedback) {
    if (e.key === 'Enter' && feedback === 'hidden') {
        onClick(index)
    }
}

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
        tabIndex={0} // a value of zero indicates that this element can be tabbed to
        onKeyPress={(e) => handleKeyPress(e, onClick, index, feedback)}
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
