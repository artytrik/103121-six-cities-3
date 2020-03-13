import ModelOffer from '../model-offer.js';
import ModelReview from '../model-review.js';
import {ActionCreator as DataActionCreator} from './data/data.js';
import {ActionCreator as AppActionCreator} from './app/app.js';

export const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const offers = ModelOffer.parseOffers(response.data);
        dispatch(DataActionCreator.loadOffers(offers));
        dispatch(DataActionCreator.getCities(offers));
        dispatch(AppActionCreator.changeCity(offers.length > 0 ? offers[0].city : ``));
      });
  },
  loadReviews: (activeOffer) => (dispatch, getState, api) => {
    return api.get(`/comments/${activeOffer.id}`)
      .then((response) => {
        const reviews = ModelReview.parseReviews(response.data);
        dispatch(DataActionCreator.loadReviews(reviews));
      });
  },
  loadNearbyOffers: (activeOffer) => (dispatch, getState, api) => {
    return api.get(`/hotels/${activeOffer.id}/nearby`)
      .then((response) => {
        const nearbyOffers = ModelOffer.parseOffers(response.data);
        dispatch(DataActionCreator.loadNearbyOffers(nearbyOffers));
      });
  }
};