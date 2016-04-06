/* globals dx */
import Ember from 'ember';
import ENV from '../config/environment';

const URL = ENV['ember-dxfeed'].url

export default Ember.Service.extend(Ember.Evented, {
  init () {
    this._super()
    this._dxfeed = dx.createFeed().connect(URL);
  },

  subscribeToTrade(...symbols) {
    this.get('_tradeSubscription').addSymbols(...symbols);
    return this;
  },

  subscribeToQuote(...symbols) {
    this.get('_quoteSubscription').addSymbols(...symbols);
    return this;
  },

  subscribeToSummary(...symbols) {
    this.get('_summarySubscription').addSymbols(...symbols);
    return this;
  },

  subscribeToProfile(...symbols) {
    this.get('_profileSubscription').addSymbols(...symbols);
    return this;
  },

  unsubscribeToTrade(...symbols) {
    this.get('_tradeSubscription').removeSymbols(...symbols);
    return this;
  },

  unsubscribeToQuote(...symbols) {
    this.get('_quoteSubscription').removeSymbols(...symbols);
    return this;
  },

  unsubscribeToSummary(...symbols) {
    this.get('_summarySubscription').removeSymbols(...symbols);
    return this;
  },

  unsubscribeToProfile(...symbols) {
    this.get('_profileSubscription').removeSymbols(...symbols);
    return this;
  },

  _createDxSubscription: function (dxEventType){
    var eventType = dxEventType.toLowerCase();
    var subscription = this.get('_dxfeed').createSubscription(dxEventType);
    subscription.onEvent = (data) => this.trigger(eventType, data);
    return subscription;
  },

  _tradeSubscription: Ember.computed(function () {
    return this._createDxSubscription('Trade');
  }),

  _quoteSubscription: Ember.computed(function () {
    return this._createDxSubscription('Quote');
  }),

  _summarySubscription: Ember.computed(function () {
    return this._createDxSubscription('Summary');
  }),

  _profileSubscription: Ember.computed(function () {
    return this._createDxSubscription('Profile');
  }),
});
