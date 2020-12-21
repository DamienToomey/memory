import { expect } from 'chai'
import sinon from 'sinon'

import {
    saveHOFEntry, emptyHOF, HOF_MAX_SIZE, HOF_KEY,
} from '../../HallOfFame'

describe('<HallOfFame />', () => {
    it('saveHOFEntry', () => {
        const onStored = sinon.spy()
        let storage = null

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
            saveHOFEntry({ guesses, player }, onStored)
            const hallOfFame1 = [entries[0]]
            expect(onStored).to.have.been.calledWith(hallOfFame1)
            storage = JSON.parse(localStorage.getItem(HOF_KEY))
            expect(storage).to.deep.equal(hallOfFame1);
            // Why ; at the beginning of the line ?
            // How to destructure an object to an already defined variable? [duplicate]
            // https://stackoverflow.com/questions/32138513/
            // how-to-destructure-an-object-to-an-already-defined-variable

            // else
            // use array destructuring to get guesses and player from entries[1]
            ([, { guesses, player }] = entries)
            saveHOFEntry({ guesses, player }, onStored)
            const hallOfFame2 = [entries[1], entries[0]] // order entries depending on guesses value
            storage = JSON.parse(localStorage.getItem(HOF_KEY))
            expect(storage).to.deep.equal(hallOfFame2)
            expect(onStored).to.have.been.calledWith(hallOfFame2)
        } finally {
            clock.restore()
            emptyHOF()
            storage = JSON.parse(localStorage.getItem(HOF_KEY))
            expect(storage).to.deep.equal([])
        }
    })

    it('saveHOFEntry if (entries.length > HOF_MAX_SIZE)', () => {
        const onStored = sinon.spy()
        const entries = []
        let storage = null

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
                saveHOFEntry({ guesses, player }, onStored)
            }
            expect(onStored.firstCall).to.have.been.calledWith([entries[0]])
            const newEntry = {
                guesses: 5,
                player: `NAME OF WINNER${HOF_MAX_SIZE}`,
                date: now.toLocaleDateString(),
                id: Date.now(),
            }
            const { guesses, player } = newEntry
            saveHOFEntry({ guesses, player }, onStored)

            storage = JSON.parse(localStorage.getItem(HOF_KEY))
            expect(onStored.lastCall).to.have.been.calledWith(storage)

            // entryZero is sliced out of hallOfFame as the cut off size
            // of hallOfFame is HOF_MAX_SIZE
            expect(storage).not.to.contain(entries[0])
            expect(storage[0]).to.deep.equal(newEntry)
            expect(storage[storage.length - 1]).to.deep.equal(entries[1])
        } finally {
            clock.restore()
            emptyHOF()
            storage = JSON.parse(localStorage.getItem(HOF_KEY))
            expect(storage).to.deep.equal([])
        }
    })

    it('emptyHOF', () => {
        emptyHOF()
        const storage = JSON.parse(localStorage.getItem(HOF_KEY))
        expect(storage).to.deep.equal([])
    })
})
