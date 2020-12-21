import React from 'react'

import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import Card, { HIDDEN_SYMBOL } from '../../Card'

describe('<Card />', () => {
    it('should trigger its `onClick` prop when clicked', () => {
        const onKeyPress = sinon.spy()
        const onClick = sinon.spy() // <=> jest.fn() // a spy
        const wrapper = shallow(
            <Card card="😀" feedback="hidden" index={0} onClick={onClick} onKeyPress={onKeyPress} />,
        )
        wrapper.simulate('click')
        // expect(onClick).toHaveBennCalledWith(0) // Jest syntax
        expect(onClick).to.have.been.calledWith(0) // Chai syntax
    })

    it('should trigger its `onKeyPress` prop when card has focus and key is pressed', () => {
        // In this test, the Card already has the focus as we work directly on a
        // Card component
        const onKeyPress = sinon.spy()
        const enterKeyEvent = new KeyboardEvent('keypress', { key: 'Enter' })
        const index = 0
        const feedback = 'hidden'
        const onClick = sinon.spy()
        const wrapper = shallow(
            <Card card="😀" feedback="hidden" index={index} onClick={onClick} onKeyPress={onKeyPress} />,
        )
        wrapper.simulate('keypress', enterKeyEvent)
        expect(onKeyPress).to.have.been.calledWith(enterKeyEvent, onClick, index, feedback)
    })

    it('should display hidden symbol when card feedback is hidden', () => {
        const onKeyPress = sinon.spy()
        const onClick = sinon.spy()
        const wrapper = shallow(
            <Card card="😀" feedback="hidden" index={0} onClick={onClick} onKeyPress={onKeyPress} />,
        )
        expect(wrapper.find('span.symbol')).to.have.text(HIDDEN_SYMBOL)
    })

    it('should display card symbol when card feedback is visible, justMatched, justMismatched or disabled', () => {
        const feedbacks = ['visible', 'justMatched', 'justMismatched', 'disabled']
        const onKeyPress = sinon.spy()
        const onClick = sinon.spy()
        for (let i = 0; i < feedbacks.length; i += 1) {
            const feedback = feedbacks[i]
            const wrapper = shallow(
                <Card card="😀" feedback={feedback} index={0} onClick={onClick} onKeyPress={onKeyPress} />,
            )
            expect(wrapper.find('span.symbol')).to.have.text('😀')
        }
    })

    // ===== Snapshots =====

    // it('should match its reference snapshots', () => {
    //     const onClick =  sinon.spy()
    //     const wrapper = shallow(
    //         <Card card="😀" feedback="hidden" index={0} onClick={onClick}/>
    //         )
    //     expect(wrapper).to.matchSnapshot()
    // })
})
