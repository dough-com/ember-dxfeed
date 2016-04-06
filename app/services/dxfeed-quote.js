import Ember from 'ember';

export default Ember.Service.extend({
  dxfeed: Ember.inject.service(),

  init() {
    this._super()

    this
      ._dxListen('profile', ['description'])
      ._dxListen('quote', ['bidPrice', 'askPrice'])
      ._dxListen('trade', ['price'])
      ._dxListen('summary', ['dayOpenPrice', 'dayHighPrice', 'dayLowPrice', 'prevDayClosePrice'])
  },

  _quotes: Ember.computed(() => {
    return {};
  }),

  subscribe(symbol) {
    // TODO: reference counting?

    var quotes = this.get('_quotes');
    var quote = quotes[symbol];
    if (!quote) {
      quote = quotes[symbol] = Ember.Object.create({ symbol });
    }

    this.get('dxfeed').subscribeToAll(symbol);

    return quote;
  },

  unsubscribe(quote) {
    var quotes = this.get('_quotes');

    // TODO: reference counting?
    var symbol = quote.get('symbol');
    this.get('dxfeed').unsubscribeToAll(symbol);
    quotes[symbol] = null
  },

  _dxListen(eventName, fields) {
    var quotes = this.get('_quotes')
    this.get('dxfeed').on(eventName, (dxEvent) => {
      var quote = quotes[dxEvent.eventSymbol];
      if (!quote) {
        return;
      }

      var props = Ember.getProperties(dxEvent, fields);
      quote.setProperties(props);
    });
    return this;
  }
});
