import React from 'react';
import renderer from 'react-test-renderer';
import MainEmpty from './main-empty.jsx';

it(`MainEmpty should render correctly`, () => {
  const tree = renderer
    .create(<MainEmpty/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
