import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import Card from '../Card'

describe('<Card />', () => {
    it('should trigger its `onClick` prop when clicked', () => {
        const onClick = sinon.spy() // <=> jest.fn() // a spy
        const wrapper = shallow(
            <Card card="😀" feedback="hidden" index={0} onClick={onClick} />,
        )
        wrapper.simulate('click')
        // expect(onClick).toHaveBennCalledWith(0) // Jest syntax
        expect(onClick).to.have.been.calledWith(0) // Chai syntax
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
