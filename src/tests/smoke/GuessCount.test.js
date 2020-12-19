import React from 'react'

import { expect } from 'chai'
import { shallow } from 'enzyme'

import GuessCount from '../../GuessCount'

describe('<GuessCount />', () => {
    // Smoke test: test if rendering works
    it('renders without crashing', () => {
        const wrapper = shallow(<GuessCount guesses={0} />)
        expect(wrapper.find('div')).to.have.text('Number of guesses: 0')
    })
})
