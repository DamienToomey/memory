import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import App from '../App'
import HallOfFame, { saveHOFEntry, emptyHOF, HOF_MAX_SIZE } from '../HallOfFame'

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

    it('saveHOFEntry with two winners', () => {
        const appWrapper = shallow(<App />)
        const app = appWrapper.instance()

        // freeze time
        const now = new Date()
        const clock = sinon.useFakeTimers(now.getTime())

        try {
            saveHOFEntry({ guesses: 10, player: 'NAME OF WINNER1' }, app.displayHallOfFame)
            saveHOFEntry({ guesses: 1, player: 'NAME OF WINNER2' }, app.displayHallOfFame)
            const { hallOfFame } = app.state
            const hallOfFame2 = [{
                guesses: 1,
                player: 'NAME OF WINNER2',
                date: now.toLocaleDateString(),
                id: Date.now(),
            },
            {
                guesses: 10,
                player: 'NAME OF WINNER1',
                date: now.toLocaleDateString(),
                id: Date.now(),
            },
            ]
            expect(hallOfFame).to.deep.equal(hallOfFame2)
        } finally {
            clock.restore()
            emptyHOF()
        }
    })

    it('saveHOFEntry for winner HOF_MAX_SIZE', () => {
        const appWrapper = shallow(<App />)
        const app = appWrapper.instance()

        // freeze time
        const now = new Date()
        const clock = sinon.useFakeTimers(now.getTime())

        try {
            for (let i = 0; i < HOF_MAX_SIZE; i += 1) {
                saveHOFEntry({ guesses: 10, player: `NAME OF WINNER${i}` }, app.displayHallOfFame)
            }
            let newEntry = { guesses: 5, player: `NAME OF WINNER${HOF_MAX_SIZE}` }
            saveHOFEntry(newEntry, app.displayHallOfFame)
            const { hallOfFame } = app.state
            newEntry = {
                guesses: 5,
                player: `NAME OF WINNER${HOF_MAX_SIZE}`,
                date: now.toLocaleDateString(),
                id: Date.now(),
            }
            const entryZero = {
                guesses: 10,
                player: `NAME OF WINNER${0}`,
                date: now.toLocaleDateString(),
                id: Date.now(),
            }
            const entryOne = {
                guesses: 10,
                player: `NAME OF WINNER${1}`,
                date: now.toLocaleDateString(),
                id: Date.now(),
            }
            // entryZero is sliced out of hallOfFame as the cut off size
            // of hallOfFame is HOF_MAX_SIZE
            expect(hallOfFame).not.to.contain(entryZero)
            expect(hallOfFame[0]).to.deep.equal(newEntry)
            expect(hallOfFame[hallOfFame.length - 1]).to.deep.equal(entryOne)
        } finally {
            clock.restore()
            emptyHOF()
        }
    })
})
