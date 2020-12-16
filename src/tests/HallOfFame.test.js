// Use expect from chai not expect from Jest
import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'

import HallOfFame from '../HallOfFame'

export const FAKE_HOF = [
    {
        id: 3, guesses: 18, date: '10/10/2017', player: 'Jane',
    },
    {
        id: 2, guesses: 23, date: '11/10/2017', player: 'Kevin',
    },
]

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
})
