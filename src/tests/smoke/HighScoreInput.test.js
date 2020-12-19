import React from 'react'

import { expect } from 'chai'
import { shallow } from 'enzyme'

import HighScoreInput from '../../HighScoreInput'
import App from '../../App'

describe('<HighScoreInput />', () => {
    // Smoke test: test if rendering works
    it('renders without crashing', () => {
        const wrapper = shallow(<HighScoreInput
            guesses={0}
            onStored={new App().displayHallOfFame}
        />)
        expect(wrapper.find('form>p>label')).to.have.text('Well done! Please enter your name:')
        expect(wrapper.find('form>p>button')).to.have.text('I have won!')
    })
})
