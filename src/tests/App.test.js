// Use expect from chai not expect from Jest
import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import App, { SYMBOLS, VISUAL_PAUSE_MSECS } from '../App'
import GuessCount from '../GuessCount'
import Card from '../Card'
import { FAKE_HOF } from './HallOfFame.test.js'

describe('<App />', () => {
    // Smoke test: test if rendering works
    it('renders without crashing', () => {
        // What is the difference between a stub and a spy ?
        // For a stub, we can specify what it returns

        // Modify return value of method generateCards to
        // have a constant set of cards instead of pulling
        // them randomly which would make testing impossible
        const mock = sinon
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
            mock.restore()
            // restore behaviour of generateCards for following tests
        }
    })

    it('app has 36 cards', () => {
        const wrapper = shallow(<App />)
        // .find is a CSS selector
        expect(wrapper.find('Card')).to.have.length(36)
    })

    it('handleCardClick with 2 indexes', () => {
        const wrapper = shallow(<App />)
        const instance = wrapper.instance()
        const index1 = 0
        const index2 = 5
        instance.setState({ currentPair: [index1, index2] })
        expect(wrapper).to.have.state('currentPair').deep.equal([index1, index2])
        const empty_return = undefined
        expect(instance.handleCardClick(index1)).to.be.equal(empty_return)
    })

    it('handleCardClick with 0 indexes', () => {
        const wrapper = shallow(<App />)
        const instance = wrapper.instance()
        const index = 0
        instance.setState({ currentPair: [] })
        expect(wrapper).to.have.state('currentPair').deep.equal([])
        instance.handleCardClick(index)
        expect(wrapper).to.have.state('currentPair').deep.equal([index])
        const empty_return = undefined
        expect(instance.handleCardClick(index)).to.be.equal(empty_return)
    })

    it("getFeedbackForCard for currentFeedback === 'justMatched' if statement", () => {
        const wrapper = shallow(<App />)
        const instance = wrapper.instance()
        instance.feedbacks = ["justMatched"]
        const index = 0
        expect(instance.getFeedbackForCard(index)).to.be.equal('disabled')
    })

    it("getFeedbackForCard for currentPair.includes(index) else statement", () => {
        const wrapper = shallow(<App />)
        const instance = wrapper.instance()
        const index = 10
        const index1 = 0
        const index2 = 5
        instance.setState({ currentPair: [index1, index2], matchedCardIndices: [index] })
        expect(wrapper).to.have.state('currentPair').deep.equal([index1, index2])
        instance.feedbacks = ["visible"]
        expect(instance.getFeedbackForCard(index)).to.be.equal('visible')
    })
    
    it("displayHallOfFame", () => {
        const wrapper = shallow(<App />)
        const instance = wrapper.instance()
        instance.displayHallOfFame(FAKE_HOF)
        expect(wrapper).to.have.state('hallOfFame').deep.equal(FAKE_HOF)
    })

    it("handleNewPair", () => {
        const wrapper = shallow(<App />)
        const instance = wrapper.instance()
        instance.setState({ currentPair: [4], matchedCardIndices: [0, 2] })
        const index = 3
        instance.handleNewPair(index)
        setTimeout(() => expect(wrapper).to.have.state('currentPair').deep.equal([]),
                                VISUAL_PAUSE_MSECS)
    })   

    // ===== Snapshots =====

    // it('should match its reference snapshots', () => {
    //   const mock = sinon
    //                .stub(App.prototype, 'generateCards')
    //                .returns([...SYMBOLS.repeat(2)])

    //   try {
    //     const wrapper = shallow(<App />)
    //     expect(wrapper).to.matchSnapshot()
    //   }
    //   finally {
    //     mock.restore()
    //   }
    // })
})


// interesting way of testing props values:
// expect(wrapper.find('Card').at(0)).to.have.props([ 'card', 'feedback',\
// 'index', 'onClick' ])
// .deep.equal([ "😀", 'hidden', 0, instance.handleCardClick ])