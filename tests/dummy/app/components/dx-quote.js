import Ember from 'ember';

export default Ember.Component.extend({
  dxfeedQuote: Ember.inject.service(),

  symbol: null,
  quote: Ember.computed('symbol', 'dxfeedQuote', function () {
    return this.get('dxfeedQuote').subscribe(this.get('symbol'));
  })
}).reopenClass({
  positionalParams: ['symbol']
});
