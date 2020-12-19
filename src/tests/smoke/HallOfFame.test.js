import React from 'react'

import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import HallOfFame, { saveHOFEntry, emptyHOF } from '../../HallOfFame'
import App from '../../App'

const FAKE_HOF = [
    {
        id: 3, guesses: 18, date: '10/10/2017', player: 'Jane',
    },
    {
        id: 2, guesses: 23, date: '11/10/2017', player: 'Kevin',
    },
]

export default FAKE_HOF

describe('<HallOfFame />', () => {
    // Smoke test: test if rendering works
    it('renders without crashing', () => {
        const wrapper = shallow(<HallOfFame entries={FAKE_HOF} />)

        expect(wrapper.find('table>tbody>tr').at(0).key()).to.equal('3')
        expect(wrapper.find('table>tbody>tr').at(0).find('td.guesses')).to.have.text('18')
        expect(wrapper.find('table>tbody>tr').at(0).find('td.date')).to.have.text('10/10/2017')
        expect(wrapper.find('table>tbody>tr').at(0).find('td.player')).to.have.text('Jane')

        expect(wrapper.find('table>tbody>tr').at(1).key()).to.equal('2')
        expect(wrapper.find('table>tbody>tr').at(1).find('td.guesses')).to.have.text('23')
        expect(wrapper.find('table>tbody>tr').at(1).find('td.date')).to.have.text('11/10/2017')
        expect(wrapper.find('table>tbody>tr').at(1).find('td.player')).to.have.text('Kevin')
    })

    it('saveHOFEntry with only one winner', () => {
        const appWrapper = shallow(<App />)
        const app = appWrapper.instance()

        // freeze time
        const now = new Date()
        const clock = sinon.useFakeTimers(now.getTime())

        try {
            saveHOFEntry({ guesses: 0, player: 'NAME OF WINNER' }, app.displayHallOfFame)
            const { hallOfFame } = app.state
            const newEntry = {
                guesses: 0, player: 'NAME OF WINNER', date: now.toLocaleDateString(), id: Date.now(),
            }
            const hallOfFame2 = [newEntry]
            expect(hallOfFame).to.deep.equal(hallOfFame2)
        } finally {
            clock.restore()
            emptyHOF()
        }
    })
})
