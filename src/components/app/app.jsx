import React from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import OfferInformation from '../offer-information/offer-information.jsx';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = null;

    this._handleHeaderClick = this._handleHeaderClick.bind(this);
  }

  _handleHeaderClick(clickedOffer) {
    this.setState(clickedOffer);
  }

  _renderApp() {
    const {
      offers,
      city,
      cities,
      onCityClick,
      onSortTypeClick,
      currentSortType,
      onCardHover,
      currentCard
    } = this.props;
    const activeOffer = this.state;

    if (activeOffer) {
      return <OfferInformation
        offer={activeOffer}
        onHeaderClick={this._handleHeaderClick}
        currentSortType={currentSortType}
        onCardHover={onCardHover}
      />;
    }

    return <Main
      offers={offers}
      onHeaderClick={this._handleHeaderClick}
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
    const {offers, currentSortType, onCardHover} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer-information">
            <OfferInformation
              offer={offers[0]}
              onHeaderClick={this._handleHeaderClick}
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
  currentCard: PropTypes.object
};

const mapStateToProps = (state) => ({
  offers: state.currentOffers,
  city: state.city,
  cities: state.cities,
  currentSortType: state.currentSortType,
  currentCard: state.currentCard
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
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
