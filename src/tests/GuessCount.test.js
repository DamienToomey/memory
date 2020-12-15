// Use expect from chai not expect from Jest
import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'

import GuessCount from '../GuessCount'

describe('<GuessCount />', () => {
    // Smoke test: test if rendering works
    it('renders without crashing', () => {
        const wrapper = shallow(<GuessCount guesses={0} />)
        expect(wrapper.find('div')).to.have.text('0')
    })
})
