import React from 'react'

import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import App from '../../App'
import {
    saveHOFEntry, emptyHOF, HOF_MAX_SIZE, HOF_KEY,
} from '../../HallOfFame'

describe('<HallOfFame />', () => {
    it('saveHOFEntry', () => {
        let storage = null
        const wrapper = shallow(<App />)
        const app = wrapper.instance()
        // the line bellow does not work as displayHallOfFame is an arrow function
        // const spy = sinon.spy(App.prototype, 'displayHallOfFame')
        const spy = sinon.spy(app, 'displayHallOfFame')

        // freeze time
        const now = new Date()
        const clock = sinon.useFakeTimers(now.getTime())

        try {
            const entries = [
                {
                    guesses: 10,
                    player: 'NAME OF WINNER1',
                    date: now.toLocaleDateString(),
                    id: Date.now(),
                },
                {
                    guesses: 1,
                    player: 'NAME OF WINNER2',
                    date: now.toLocaleDateString(),
                    id: Date.now(),
                },
            ]
            // if (insertionPoint === -1)
            let { guesses, player } = entries[0]
            saveHOFEntry({ guesses, player }, spy)
            const hallOfFame1 = [entries[0]]
            expect(spy).to.have.been.calledWith(hallOfFame1)
            storage = JSON.parse(localStorage.getItem(HOF_KEY))
            expect(storage).to.deep.equal(hallOfFame1);
            // Why ; at the beginning of the line ?
            // How to destructure an object to an already defined variable? [duplicate]
            // https://stackoverflow.com/questions/32138513/
            // how-to-destructure-an-object-to-an-already-defined-variable

            // else
            // use array destructuring to get guesses and player from entries[1]
            ([, { guesses, player }] = entries)
            saveHOFEntry({ guesses, player }, spy)
            const hallOfFame2 = [entries[1], entries[0]] // order entries depending on guesses value
            storage = JSON.parse(localStorage.getItem(HOF_KEY))
            expect(storage).to.deep.equal(hallOfFame2)
            expect(spy).to.have.been.calledWith(hallOfFame2)

            const { hallOfFame } = app.state
            expect(hallOfFame).to.deep.equal(hallOfFame2)
        } finally {
            clock.restore()
            emptyHOF()
            storage = JSON.parse(localStorage.getItem(HOF_KEY))
            expect(storage).to.deep.equal([])
        }
    })

    it('saveHOFEntry if (entries.length > HOF_MAX_SIZE)', () => {
        let storage = null
        const wrapper = shallow(<App />)
        const app = wrapper.instance()
        const spy = sinon.spy(app, 'displayHallOfFame')
        const entries = []

        // freeze time
        const now = new Date()
        const clock = sinon.useFakeTimers(now.getTime())

        try {
            for (let i = 0; i < HOF_MAX_SIZE; i += 1) {
                entries.push({
                    guesses: 10,
                    player: `NAME OF WINNER${i}`,
                    date: now.toLocaleDateString(),
                    id: Date.now(),
                })
                const { guesses, player } = entries[i]
                saveHOFEntry({ guesses, player }, spy)
            }
            expect(spy.firstCall).to.have.been.calledWith([entries[0]])
            const newEntry = {
                guesses: 5,
                player: `NAME OF WINNER${HOF_MAX_SIZE}`,
                date: now.toLocaleDateString(),
                id: Date.now(),
            }
            const { guesses, player } = newEntry
            saveHOFEntry({ guesses, player }, spy)

            const { hallOfFame } = app.state
            expect(spy).to.have.been.calledWith(hallOfFame)

            // entryZero is sliced out of hallOfFame as the cut off size
            // of hallOfFame is HOF_MAX_SIZE
            expect(hallOfFame).not.to.contain(entries[0])
            expect(hallOfFame[0]).to.deep.equal(newEntry)
            expect(hallOfFame[hallOfFame.length - 1]).to.deep.equal(entries[1])
        } finally {
            clock.restore()
            emptyHOF()
            storage = JSON.parse(localStorage.getItem(HOF_KEY))
            expect(storage).to.deep.equal([])
        }
    })
})
