import React from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import OfferInformation from '../offer-information/offer-information.jsx';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/app/app.js';
import {Operation} from '../../reducer/operation.js';
import {getSortType, getActiveCity, getCurrentCard, getActiveOffer} from '../../reducer/app/selectors.js';
import {getNearbyOffers, getReviews, getCities} from '../../reducer/data/selectors.js';
import {getOffersByCity} from '../../reducer/selectors.js';
import SignIn from '../sign-in/sign-in.jsx';
import {getUser, getAuthoriationStatus} from '../../reducer/user/selectors.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';

const fakeOffer = {
  name: `Beautiful & luxurious apartment at great location`,
  type: `Apartment`,
  bedrooms: 3,
  adults: 4,
  price: 120,
  picture: `img/apartment-01.jpg`,
  premium: true,
  gallery: [
    `img/room.jpg`,
    `img/apartment-01.jpg`,
    `img/apartment-02.jpg`,
    `img/apartment-03.jpg`,
    `img/studio-01.jpg`,
    `img/apartment-01.jpg`
  ],
  rating: 4.8,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
  inside: [`Wi-FI`, `Washing machine`, `Towels`, `Heating`],
  user: {
    avatar: `img/avatar-angelina.jpg`,
    name: `Angelina`,
    superStar: true
  },
  id: 1
};

class App extends React.PureComponent {
  _renderApp() {
    const {
      offers,
      city,
      cities,
      onCityClick,
      onSortTypeClick,
      currentSortType,
      onCardHover,
      currentCard,
      activeOffer,
      onHeaderClick,
      reviews,
      nearbyOffers,
      userData,
      authorizationStatus,
      login,
      onReviewSubmit
    } = this.props;

    if (activeOffer) {
      return <OfferInformation
        offer={activeOffer}
        onHeaderClick={onHeaderClick}
        currentSortType={currentSortType}
        onCardHover={onCardHover}
        reviews={reviews}
        nearbyOffers={nearbyOffers}
        onReviewSubmit={onReviewSubmit}
      />;
    }

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return <SignIn
        onSubmit={login}
      />;
    } else if (authorizationStatus === AuthorizationStatus.AUTH) {
      return <Main
        offers={offers}
        onHeaderClick={onHeaderClick}
        city={city}
        cities={cities}
        onCityClick={onCityClick}
        currentSortType={currentSortType}
        onSortTypeClick={onSortTypeClick}
        onCardHover={onCardHover}
        currentCard={currentCard}
        userData={userData}
        authorizationStatus={authorizationStatus}
      />;
    }

    return null;
  }

  render() {
    const {currentSortType, onCardHover, reviews, nearbyOffers, onHeaderClick, onReviewSubmit} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-login">
            <SignIn
              onSubmit={() => {}}
            />
          </Route>
          <Route path="/dev-offer">
            <OfferInformation
              offer={fakeOffer}
              onHeaderClick={onHeaderClick}
              currentSortType={currentSortType}
              onCardHover={onCardHover}
              reviews={reviews}
              nearbyOffers={nearbyOffers}
              onReviewSubmit={onReviewSubmit}
            />;
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: PropTypes.array.isRequired,
  city: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onCityClick: PropTypes.func.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
  currentSortType: PropTypes.string.isRequired,
  onCardHover: PropTypes.func.isRequired,
  currentCard: PropTypes.object,
  onHeaderClick: PropTypes.func.isRequired,
  activeOffer: PropTypes.object,
  reviews: PropTypes.array,
  nearbyOffers: PropTypes.array,
  userData: PropTypes.object,
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  onReviewSubmit: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  offers: getOffersByCity(state),
  city: getActiveCity(state),
  cities: getCities(state),
  currentSortType: getSortType(state),
  currentCard: getCurrentCard(state),
  activeOffer: getActiveOffer(state),
  reviews: getReviews(state),
  nearbyOffers: getNearbyOffers(state),
  userData: getUser(state),
  authorizationStatus: getAuthoriationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(Operation.login(authData));
  },
  onReviewSubmit(reviewData, id) {
    dispatch(Operation.postReview(reviewData, id));
  },
  onCityClick(evt, city) {
    evt.preventDefault();
    dispatch(ActionCreator.changeCity(city));
  },
  onSortTypeClick(sortType) {
    dispatch(ActionCreator.changeSortType(sortType));
  },
  onCardHover(offer) {
    dispatch(ActionCreator.setCurrentCard(offer));
  },
  onHeaderClick(offer) {
    dispatch(ActionCreator.changeActiveOffer(offer));
    dispatch(Operation.loadReviews(offer));
    dispatch(Operation.loadNearbyOffers(offer));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
