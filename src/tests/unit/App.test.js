import React from 'react'

// Use expect from chai, not expect from Jest
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import App, { VISUAL_PAUSE_MSECS, SIDE, SYMBOLS } from '../../App'
import FAKE_HOF from '../smoke/HallOfFame.test'

const BUFFER_MSECS = 10
export default BUFFER_MSECS

describe('<App />', () => {
    it('SIDE * SIDE should be an even number as each card must be present twice to make pairs', () => {
        const nCards = SIDE * SIDE
        expect(nCards % 2 === 0).to.be.equal(true)
    })

    it('each card symbol should be present twice to make pairs', () => {
        const cards = App.generateCards()
        // define function to count occurences of a given value in an array
        const count = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)

        const occurences = []

        for (let i = 0; i < cards.length; i += 1) {
            occurences.push(count(cards, cards[i]))
        }
        expect(count(occurences, 2)).to.equal(cards.length) // i.e. every card is present twice
    })

    it('generateCards', () => {
        // Why is “👍”.length === 2?
        // https://stackoverflow.com/questions/38345372/why-is-length-2
        const emojiStringLength = 2 // WARNING: the length of an emoji is 2 (i.e. "😀".length === 2)
        const nCards = SIDE * SIDE
        const cards = App.generateCards()
        // number of cards is correct
        expect(cards).to.have.length(nCards)
        // all cards are strings
        expect(cards.map((card) => typeof (card))).to.deep.equal(new Array(nCards).fill('string'))
        // all cards correspond to one emoji symbol
        expect(cards.map((card) => card.length)).to.deep.equal(
            new Array(nCards).fill(emojiStringLength),
        )
    })

    it('constructor', () => {
        const cards = [...SYMBOLS.repeat(2)]
        // Modify return value of method generateCards to
        // have a constant set of cards instead of pulling
        // them randomly which would make testing impossible
        const stub = sinon
            .stub(App, 'generateCards')
            .returns(cards)

        try {
            const expectedState = {
                cards: App.generateCards(),
                currentPair: [],
                guesses: 0,
                hallOfFame: null,
                matchedCardIndices: [],
            }
            // const app = new App()
            const wrapper = shallow(<App />)
            const app = wrapper.instance()
            expect(app.state).to.deep.equal(expectedState)
            expect(app.feedbacks).to.deep.equal(Array(cards.length).fill('hidden'))
        } finally {
            stub.restore()
            // restore behaviour of generateCards for following tests
        }
    })

    it('handleCardClick function called with currentPair.length === 2', () => {
        const wrapper = shallow(<App />)
        const instance = wrapper.instance()
        const nCards = SIDE * SIDE
        const index1 = 0
        const index2 = nCards - 1
        instance.setState({ currentPair: [index1, index2] })
        expect(wrapper).to.have.state('currentPair').to.deep.equal([index1, index2])
        const emptyReturn = undefined
        expect(instance.handleCardClick(index1)).to.equal(emptyReturn)
    })

    it('handleCardClick function called with currentPair.length === 1', () => {
        const spy = sinon.spy(App.prototype, 'handleNewPair')
        const wrapper = shallow(<App />)
        const instance = wrapper.instance()

        try {
            const nCards = SIDE * SIDE
            const index1 = 0
            const index2 = nCards - 1
            instance.setState({ currentPair: [index2] })
            instance.handleCardClick(index1)
            expect(spy).to.have.been.calledWith(index1)
        } finally {
            spy.restore()
        }
    })

    it('handleCardClick called with currentPair.length === 0', () => {
        const wrapper = shallow(<App />)
        const instance = wrapper.instance()
        const index = 0
        instance.setState({ currentPair: [] })
        expect(wrapper).to.have.state('currentPair').to.deep.equal([])
        instance.handleCardClick(index)
        expect(wrapper).to.have.state('currentPair').to.deep.equal([index])
        const emptyReturn = undefined
        expect(instance.handleCardClick(index)).to.equal(emptyReturn)
    })

    it("handleKeyPress if (e.key === 'Enter' && feedback === 'hidden')", () => {
        const wrapper = shallow(<App />)
        const instance = wrapper.instance()
        const onClick = sinon.spy()
        const index = 0
        const feedback = 'hidden'
        const e = new KeyboardEvent('keypress', { key: 'Enter' })
        instance.handleKeyPress(e, onClick, index, feedback)
        expect(onClick).to.have.been.calledWith(index)
    })

    it("handleKeyPress not if (e.key === 'Enter' && feedback === 'hidden')", () => {
        const wrapper = shallow(<App />)
        const instance = wrapper.instance()
        const e = new KeyboardEvent('keypress', { key: 'a' })
        const index = 0
        const feedback = 'visible'
        const onClick = sinon.spy()
        instance.handleKeyPress(e, onClick, index, feedback)
        expect(onClick).not.to.have.been.calledWith(index)
    })

    it('handleNewPair if (matched) statement', () => {
        const cards = [...SYMBOLS.repeat(2)]
        const stub = sinon
            .stub(App, 'generateCards')
            .returns(cards)

        const index1 = 0
        const index2 = Math.floor(cards.length / 2)
        // index2 will always match card at index1 thanks to stub

        const wrapper = shallow(<App />)
        const instance = wrapper.instance()
        instance.setState({ currentPair: [index1], matchedCardIndices: [] })

        const clock = sinon.useFakeTimers()
        instance.handleNewPair(index2)
        clock.tick(VISUAL_PAUSE_MSECS + BUFFER_MSECS)
        try {
            expect(wrapper).to.have.state('matchedCardIndices').deep.equal([index1, index2])
            expect(wrapper).to.have.state('currentPair').deep.equal([])
        } finally {
            clock.restore()
            stub.restore()
        }
    })

    it('handleNewPair not if (matched) statement', () => {
        const cards = [...SYMBOLS.repeat(2)]
        const nCards = cards.length
        const stub = sinon
            .stub(App, 'generateCards')
            .returns(cards)

        const index1 = 0
        const index2 = nCards - 1
        // index2 will never match card at index1 thanks to stub

        const wrapper = shallow(<App />)
        const instance = wrapper.instance()
        instance.setState({ currentPair: [index1], matchedCardIndices: [] })

        const clock = sinon.useFakeTimers()
        instance.handleNewPair(index2)
        clock.tick(VISUAL_PAUSE_MSECS + BUFFER_MSECS)
        try {
            expect(wrapper).to.have.state('matchedCardIndices').deep.equal([])
            expect(wrapper).to.have.state('currentPair').deep.equal([])
        } finally {
            clock.restore()
            stub.restore()
        }
    })

    it('getFeedbackForCard', () => {
        const nCards = SIDE * SIDE
        const index1 = 0
        const index2 = nCards - 1
        const index3 = nCards - 2
        const index4 = nCards - 3
        const wrapper = shallow(<App />)
        const instance = wrapper.instance()
        const inputs = [
            // if (currentFeedback === 'justMatched' || currentFeedback === 'disabled')
            {
                state: { currentPair: [], matchedCardIndices: [] }, feedbacks: ['justMatched'], expectedFeeback: 'disabled', index: index1,
            },
            {
                state: { currentPair: [], matchedCardIndices: [] }, feedbacks: ['disabled'], expectedFeeback: 'disabled', index: index1,
            },
            // else if (currentPair.length < 2)
            {
                state: { currentPair: [index1], matchedCardIndices: [] }, feedbacks: ['anyfeedback'], expectedFeeback: 'visible', index: index1,
            },
            {
                state: { currentPair: [], matchedCardIndices: [] }, feedbacks: ['anyfeedback'], expectedFeeback: 'hidden', index: index1,
            },
            // if (currentPair.includes(index))
            {
                state: { currentPair: [index1, index2], matchedCardIndices: [index1, index2] }, feedbacks: ['anyfeedback'], expectedFeeback: 'justMatched', index: index1,
            },
            {
                state: { currentPair: [index1, index2], matchedCardIndices: [] }, feedbacks: ['anyfeedback'], expectedFeeback: 'justMismatched', index: index1,
            },
            // else
            {
                state: { currentPair: [index1, index2], matchedCardIndices: [index3, index4] }, feedbacks: ['anyfeedback'], expectedFeeback: 'visible', index: index3,
            },
            {
                state: { currentPair: [index1, index2], matchedCardIndices: [] }, feedbacks: ['anyfeedback'], expectedFeeback: 'hidden', index: index3,
            },
        ]

        for (let i = 0; i < inputs.length; i += 1) {
            const {
                state, feedbacks, index, expectedFeeback,
            } = inputs[i]
            instance.setState(state)
            instance.feedbacks = feedbacks
            expect(instance.getFeedbackForCard(index)).to.equal(expectedFeeback)
        }
    })

    it('displayHallOfFame', () => {
        const wrapper = shallow(<App />)
        const instance = wrapper.instance()
        instance.displayHallOfFame(FAKE_HOF)
        expect(wrapper).to.have.state('hallOfFame').deep.equal(FAKE_HOF)
    })

    // ===== Snapshots =====

    // it('should match its reference snapshots', () => {
    //     const cards = [...SYMBOLS.repeat(2)]
    //     const mock = sinon
    //                 .stub(App.prototype, 'generateCards')
    //                 .returns(cards)

    //     try {
    //     const wrapper = shallow(<App />)
    //     expect(wrapper).to.matchSnapshot()
    //     }
    //     finally {
    //     mock.restore()
    //     }
    // })
})
