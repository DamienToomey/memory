import React from 'react'

import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import App, { SYMBOLS } from '../../App'
import GuessCount from '../../GuessCount'
import Card from '../../Card'
import FAKE_HOF from './HallOfFame.test'
import HallOfFame from '../../HallOfFame'
import HighScoreInput from '../../HighScoreInput'

describe('<App />', () => {
    // Smoke test: test if rendering works
    it('renders without crashing', () => {
        // What is the difference between a stub and a spy ?
        // For a stub, we can specify what it returns

        // Modify return value of method generateCards to
        // have a constant set of cards instead of pulling
        // them randomly which would make testing impossible
        const stub = sinon
            .stub(App, 'generateCards') // generateCards is a static method
            // .stub(App.prototype, 'generateCards') // if generateCards were an instance method
            .returns([...SYMBOLS.repeat(2)])
            // .repeat(2) as we want pairs of symbols

        try {
            const wrapper = shallow(<App />)
            const instance = wrapper.instance()
            expect(wrapper).to.contain(<GuessCount guesses={0} />)
            expect(wrapper).to.contain(<Card
                card="😀"
                feedback="hidden"
                key={0}
                index={0}
                onClick={instance.handleCardClick}
            />)
        } finally {
            // try/finally is enough as we are synchronous
            // so we do not need sandboxes
            stub.restore()
            // restore behaviour of generateCards for following tests
        }
    })

    it('render for won === true and non null FAKE_HOF', () => {
        const wrapper = shallow(<App />)
        const instance = wrapper.instance()
        const { cards } = instance.state
        instance.setState({ hallOfFame: FAKE_HOF, matchedCardIndices: new Array(cards.length) })
        expect(wrapper).to.contain(<HallOfFame entries={FAKE_HOF} />)
    })

    it('render for won === true and null FAKE_HOF', () => {
        const wrapper = shallow(<App />)
        const instance = wrapper.instance()
        const { cards } = instance.state
        instance.setState({ hallOfFame: null, matchedCardIndices: new Array(cards.length) })
        expect(wrapper).to.contain(<HighScoreInput
            guesses={0}
            onStored={instance.displayHallOfFame}
        />)
    })
})
