import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card.jsx';

class OffersList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      offer: {
        name: `Beautiful & luxurious apartment at great location`,
        type: `Apartment`
      }
    };

    this._handleMouseHover = this._handleMouseHover.bind(this);
  }

  _handleMouseHover(name, type) {
    this.setState({
      offer: {
        name,
        type
      }
    });
  }

  render() {
    const {offers} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer, i) => (
          <OfferCard
            key={`offer-${i}`}
            offer={offer}
            onMouseHover={this._handleMouseHover}
          />
        ))}
      </div>
    );
  }
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
    premium: PropTypes.bool.isRequired
  })).isRequired
};

export default OffersList;
