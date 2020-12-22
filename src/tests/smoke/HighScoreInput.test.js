import React from 'react'

import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import HighScoreInput from '../../HighScoreInput'

describe('<HighScoreInput />', () => {
    it('renders without crashing', () => {
        const onStored = sinon.spy()
        const wrapper = shallow(<HighScoreInput
            guesses={0}
            onStored={onStored}
        />)
        expect(wrapper.find('form>p>label')).to.have.text('Well done!')
        expect(wrapper.find('form>p>label>input')).to.have.props(['placeholder'])
            .deep.equal(['Enter your name'])
        expect(wrapper.find('form>p>button')).to.have.text('You have won!')
    })
})
