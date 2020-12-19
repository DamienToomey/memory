import React from 'react'

import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import App from '../../App'
import HighScoreInput from '../../HighScoreInput'

describe('<HighScoreInput />', () => {
    it('handleWinnerUpdate performs lower case to upper case', () => {
        const wrapper = shallow(<HighScoreInput
            guesses={0}
            onStored={new App().displayHallOfFame}
        />)
        const instance = wrapper.instance()
        const input = wrapper.find('input')
        input.simulate('change', { target: { value: 'name of winner' } }) // calls handleWinnerUpdate
        // event.target.value => { target: { value: } }
        const { winner } = instance.state
        expect(winner).to.equal('NAME OF WINNER')
    })

    it('persistWinner', () => {
        const appWrapper = shallow(<App />)
        const app = appWrapper.instance()
        const wrapper = shallow(<HighScoreInput
            guesses={0}
            onStored={app.displayHallOfFame}
        />)
        const input = wrapper.find('input')
        input.simulate('change', { target: { value: 'name of winner' } })

        // Freeze time
        const now = new Date()
        const clock = sinon.useFakeTimers(now.getTime())

        try {
            const form = wrapper.find('form')
            form.simulate('submit', { preventDefault: () => {} }) // calls persistWinner
            const { hallOfFame } = app.state

            const newEntry = {
                guesses: 0, player: 'NAME OF WINNER', date: now.toLocaleDateString(), id: Date.now(),
            }
            const hallOfFame2 = [newEntry]
            expect(hallOfFame).to.deep.equal(hallOfFame2)
        } finally {
            clock.restore()
        }
    })
})
