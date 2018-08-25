import React from 'react'
import { shallow } from 'enzyme'
import WelcomeActions from '../../components/WelcomeActions.js'

it('renders without crashing', () => {
  shallow(<WelcomeActions />)
});