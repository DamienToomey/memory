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

    it('should display hidden symbol when card feedback is hidden', () => {
        const onKeyPress = sinon.spy()
        const onClick = sinon.spy()
        const wrapper = shallow(
            <Card card="😀" feedback="hidden" index={0} onClick={onClick} onKeyPress={onKeyPress} />,
        )
        expect(wrapper.find('span.symbol')).to.have.text(HIDDEN_SYMBOL)
    })

    it('should display card symbol when card feedback is visible', () => {
        const onKeyPress = sinon.spy()
        const onClick = sinon.spy()
        const wrapper = shallow(
            <Card card="😀" feedback="visible" index={0} onClick={onClick} onKeyPress={onKeyPress} />,
        )
        expect(wrapper.find('span.symbol')).to.have.text('😀')
    })

    it('should display card symbol when card feedback is justMatched', () => {
        const onKeyPress = sinon.spy()
        const onClick = sinon.spy()
        const wrapper = shallow(
            <Card card="😀" feedback="justMatched" index={0} onClick={onClick} onKeyPress={onKeyPress} />,
        )
        expect(wrapper.find('span.symbol')).to.have.text('😀')
    })

    it('should display card symbol when card feedback is justMismatched', () => {
        const onKeyPress = sinon.spy()
        const onClick = sinon.spy()
        const wrapper = shallow(
            <Card card="😀" feedback="justMismatched" index={0} onClick={onClick} onKeyPress={onKeyPress} />,
        )
        expect(wrapper.find('span.symbol')).to.have.text('😀')
    })

    it('should display card symbol when card feedback is disabled', () => {
        const onKeyPress = sinon.spy()
        const onClick = sinon.spy()
        const wrapper = shallow(
            <Card card="😀" feedback="disabled" index={0} onClick={onClick} onKeyPress={onKeyPress} />,
        )
        expect(wrapper.find('span.symbol')).to.have.text('😀')
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

// https://stackoverflow.com/questions/38960832/how-do-you-simulate-an-keydown-enter-event-or-others-in-enzyme
