import React from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import OfferInformation from '../offer-information/offer-information.jsx';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';

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
      onHeaderClick
    } = this.props;

    if (activeOffer) {
      return <OfferInformation
        offer={activeOffer}
        onHeaderClick={onHeaderClick}
        currentSortType={currentSortType}
        onCardHover={onCardHover}
      />;
    }

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
    />;
  }

  render() {
    const {offers, currentSortType, onCardHover, onHeaderClick} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer-information">
            <OfferInformation
              offer={offers[0]}
              onHeaderClick={onHeaderClick}
              currentSortType={currentSortType}
              onCardHover={onCardHover}
            />
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
  activeOffer: PropTypes.object
};

const mapStateToProps = (state) => ({
  offers: state.currentOffers,
  city: state.city,
  cities: state.cities,
  currentSortType: state.currentSortType,
  currentCard: state.currentCard,
  activeOffer: state.activeOffer
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(evt, city) {
    evt.preventDefault();
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.getOffers(city));
  },
  onSortTypeClick(sortType) {
    dispatch(ActionCreator.changeSortType(sortType));
  },
  onCardHover(offer) {
    dispatch(ActionCreator.setCurrentCard(offer));
  },
  onHeaderClick(offer) {
    dispatch(ActionCreator.changeActiveOffer(offer));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
