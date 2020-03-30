import React from 'react';
import PropTypes from 'prop-types';
import {getStarRating, LivingType, MAX_PHOTOS, AppRoute} from '../../utils.js';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import Map from '../map/map.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import withForm from '../../hocs/with-form/with-form.jsx';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import Header from '../header/header.jsx';
import {connect} from 'react-redux';
import {getActiveOffer} from '../../reducer/selectors.js';
import {ActionCreator} from '../../reducer/app/app.js';
import {Operation} from '../../reducer/operation.js';
import {Link} from 'react-router-dom';

const ReviewFormWrapped = withForm(ReviewForm);

const OfferInformation = (props) => {
  const {
    currentSortType,
    reviews,
    nearbyOffers,
    onReviewSubmit,
    authorizationStatus,
    loadingStatus,
    onLoadingStatusClear,
    offer,
    match,
    setActiveOffer,
    currentCard,
    onFavoriteClick
  } = props;

  const offerId = parseInt(match.params.id, 10);

  if (!offer || offer && offer.id !== offerId) {
    setActiveOffer(offerId);
    return (<React.Fragment></React.Fragment>);
  }

  const {name, type, price, premium, gallery, rating, bedrooms, adults,
    description, inside, user, id, favorite} = offer;
  const {avatar, name: userName, superStar} = user;
  const limitedGallery = gallery.slice(0, MAX_PHOTOS);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {limitedGallery.map((picture, i) => (
                <div key={`picture-${i}`} className="property__image-wrapper">
                  <img
                    className="property__image"
                    src={picture}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {premium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {name}
                </h1>
                {authorizationStatus === AuthorizationStatus.AUTH ?
                  <button
                    className={`property__bookmark-button button${favorite ? ` property__bookmark-button--active` : ``}`}
                    type="button"
                    onClick={(evt) => onFavoriteClick(evt, id, favorite ? false : true)}
                  >
                    <svg className="property__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button> :
                  <Link to={AppRoute.LOGIN} className={`property__bookmark-button button`}>
                    <svg className="property__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </Link>
                }
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: getStarRating(rating)}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {LivingType[type]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {adults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {inside.map((item, i) => (
                    <li key={`item-${i}`} className="property__inside-item">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${superStar ? `property__avatar-wrapper--pro` : ``}`}>
                    <img
                      className="property__avatar user__avatar"
                      src={avatar}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{userName}</span>
                </div>
                <div className="property__description">
                  {description}
                </div>
              </div>
              <section className="property__reviews reviews">
                {reviews.length > 0 &&
                  <ReviewsList
                    reviews={reviews}
                  />
                }
                {authorizationStatus === AuthorizationStatus.AUTH &&
                  <ReviewFormWrapped
                    id={id}
                    onReviewSubmit={onReviewSubmit}
                    loadingStatus={loadingStatus}
                    onLoadingStatusClear={onLoadingStatusClear}
                  />
                }
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              offers={nearbyOffers}
              activeOffer={offer}
              currentCard={currentCard}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OffersList
              className="near-places__list"
              offers={nearbyOffers}
              currentSortType={currentSortType}
              nearbyFor={id}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

OfferInformation.propTypes = {
  offer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    premium: PropTypes.bool.isRequired,
    favorite: PropTypes.bool.isRequired,
    gallery: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    rating: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    adults: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    inside: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ),
    user: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      superStar: PropTypes.bool.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired
  }),
  currentSortType: PropTypes.string.isRequired,
  reviews: PropTypes.array,
  nearbyOffers: PropTypes.array,
  onReviewSubmit: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  loadingStatus: PropTypes.string.isRequired,
  onLoadingStatusClear: PropTypes.func.isRequired,
  match: PropTypes.object,
  setActiveOffer: PropTypes.func.isRequired,
  currentCard: PropTypes.object,
  onFavoriteClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  offer: getActiveOffer(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActiveOffer(offer) {
    dispatch(ActionCreator.changeActiveOffer(Number(offer)));
    dispatch(Operation.loadReviews(offer));
    dispatch(Operation.loadNearbyOffers(offer));
  },
  onFavoriteClick(evt, id, status) {
    evt.preventDefault();
    if (status) {
      dispatch(Operation.addFavorite(id));
    } else {
      dispatch(Operation.removeFavorite(id));
    }
  }
});

export {OfferInformation};
export default connect(mapStateToProps, mapDispatchToProps)(OfferInformation);
