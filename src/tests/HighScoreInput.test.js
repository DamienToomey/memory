// Use expect from chai not expect from Jest
import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import App from '../App'
import HighScoreInput from '../HighScoreInput'

describe('<HighScoreInput />', () => {
  // Smoke test: test if rendering works
  it('renders without crashing', () => {
    const wrapper = shallow(<HighScoreInput guesses={0} onStored={new App().displayHallOfFame} />)
    expect(wrapper.find('form>p>label')).to.have.text('Well done! Please enter your name:')
    expect(wrapper.find('form>p>button')).to.have.text('I have won!')
  })
})