import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Review from './review';

const review = {
  id: 1,
  rating: 4,
  text: `A quiet cozy and picturesque that hides behind a a river by
  the unique lightness of Amsterdam. The building is green and
  from 18th century.`,
  date: new Date(2020, 3, 17).toISOString(),
  user: {
    name: `Max`,
    avatar: `img/avatar-max.jpg`,
    id: 1,
    superStar: true
  }
};

it(`Review should render correctly`, () => {
  const tree = renderer
    .create(<Review
      review={review}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
