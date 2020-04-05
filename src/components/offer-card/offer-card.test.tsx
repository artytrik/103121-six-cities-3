import * as React from 'react';
import * as renderer from 'react-test-renderer';
import OfferCard from './offer-card';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space';
import {BrowserRouter} from 'react-router-dom';
import {noop} from '../../utils';

const mockStore = configureStore([]);

const offer = {
  id: 1,
  name: `Beautiful & luxurious apartment at great location`,
  type: `apartment`,
  price: 120,
  picture: `img/apartment-01.jpg`,
  premium: true,
  rating: 4,
  favorite: false
};

it(`OfferCard should render correctly`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`
    }
  });

  const tree = renderer
    .create(
        <BrowserRouter>
          <Provider store={store}>
            <OfferCard
              offer={offer}
              onMouseHover={noop}
              favoriteCard={false}
            />
          </Provider>
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
