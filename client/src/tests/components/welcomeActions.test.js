import React from 'react'
import ReactDOM from 'react-dom'
import WelcomeActions from '../../components/WelcomeActions.js'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WelcomeActions />, div);
});