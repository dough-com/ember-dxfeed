/* globals dx */
import Ember from 'ember';
import ENV from '../config/environment';

const URL = ENV['ember-dxfeed'].url;
const ALL_EVENTS = ['trade', 'quote', 'summary', 'profile'];

export default Ember.Service.extend(Ember.Evented, {
  init () {
    this._super()
    this._dxfeed = dx.createFeed().connect(URL);
  },

  _subscriptions: Ember.computed(() => {
    return {}
  }),

  subscribeToAll (...symbols) {
    ALL_EVENTS.forEach((name) => this.subscribeTo(name, symbols))
  },

  subscribeTo(name, symbols) {
    var subscriptions = this.get('_subscriptions');
    var subscription = subscriptions[name]
    if (!subscription) {
      var eventType = Ember.String.capitalize(name);
      subscription = subscriptions[name] = this.get('_dxfeed').createSubscription(eventType);
      subscription.onEvent = (data) => this.trigger(name, data);
    }
    subscription.addSymbols(...symbols);
  },

  unsubscribeToAll(...symbols) {
    ALL_EVENTS.forEach((name) => this.unsubscribeTo(name, symbols))
  },

  unsubscribeTo(name, symbols) {
    var subscriptions = this.get('_subscriptions');
    var subscription = subscriptions[name]
    if (subscription) {
      subscription.removeSymbols(...symbols);
    }
  }
});
