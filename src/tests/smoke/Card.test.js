import React from 'react'

import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import Card from '../../Card'

describe('<Card />', () => {
    it('renders without crashing', () => {
        const onClick = sinon.spy()
        const onKeyPress = sinon.spy()

        const wrapper = shallow(<Card
            card="😀"
            feedback="hidden"
            key={0}
            index={0}
            onClick={onClick}
            onKeyPress={onKeyPress}
        />)
        const expectedProps = {
            className: 'card hidden',
            role: 'button',
            tabIndex: 0,
        }
        expect(wrapper).to.have.props(['className', 'role', 'tabIndex'])
            .deep.equal([expectedProps.className, expectedProps.role, expectedProps.tabIndex])

        // We cannot directly compare onClick and onKeyPress from wrapper and expectedProps
        // as Card is a Functional Component, not an Class Component, so we cannot instantiate
        // Card
        // https://stackoverflow.com/questions/42707259/jest-enzyme-test-how-to-ensure-a-certain
        // -function-is-passed-as-prop-to-a-comp

        // Workaround: Let's make sure that onClick and onKeyPress events correspond to their
        // respective goal by simulating a click and keyboard event even if this makes this
        // test less a smoke test
        const enterKeyEvent = new KeyboardEvent('keypress', { key: 'Enter' })
        const index = 0
        const feedback = 'hidden'
        wrapper.simulate('keypress', enterKeyEvent)
        expect(onKeyPress).to.have.been.calledWith(enterKeyEvent, onClick, index, feedback)
        wrapper.simulate('click')
        expect(onClick).to.have.been.calledWith(index)
    })
})
