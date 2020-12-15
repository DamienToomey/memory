// Use expect from chai not expect from Jest
import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import App, { SYMBOLS } from '../App'
import GuessCount from '../GuessCount'
import Card from '../Card'

describe('<App />', () => {
    // Smoke test: test if rendering works
    it('renders without crashing', () => {
    // What is the difference between a stub and a spy ?
    // for stub, we can specify what it returns
        const mock = sinon
            .stub(App, 'generateCards') // generateCards is static method
            // .stub(App.prototype, 'generateCards') // if generateCards were is instance method
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
            // expect(wrapper.find('Card').at(0)).to.have.props([ 'card', 'feedback',\
            // 'index', 'onClick' ])
            // .deep.equal([ "😀", 'hidden', 0, instance.handleCardClick ])
        } finally {
            // try/finally is enough as we are synchronous
            // so we do not need sandboxes
            mock.restore()
            // restore behaviour of generateCards for following tests
        }
    })

    it('has 36 cards', () => {
        const wrapper = shallow(<App />)
        // .find is a CSS selector
        expect(wrapper.find('Card')).to.have.length(36)
    })

    // ===== Snapshots =====

    // it('should match its reference snapshots', () => {
    //   // What is the difference between a stub and a spy ?
    //   // for stub, we can specify what it returns
    //   const mock = sinon
    //                .stub(App.prototype, 'generateCards')
    //                .returns([...SYMBOLS.repeat(2)])
    //   // .repeat(2) as we want pairs of symbols

    //   try {
    //     const wrapper = shallow(<App />)
    //     expect(wrapper).to.matchSnapshot()
    //   }
    //   finally {
    //     // try/finally is enough as we are synchronous
    //     // so we do not need sandboxes
    //     mock.restore()
    //     // restore behaviour of generateCards for following tests
    //   }
    // })
})
