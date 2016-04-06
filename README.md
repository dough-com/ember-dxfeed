# ember-dxfeed

Thin wrapper around dxfeed for use in Ember.

## Usage

Command-line:

```bash
$ ember install git://github.com/dough-com/ember-dxfeed
$ export DXFEED_URL='http://path.to/qds/cometd'
```

Code:

```javascript
const RawApi = Ember.Object.extend({
  dxfeed: Ember.inject.service(),

  init () {
    this.get('dxfeed')
      .subscribeTo('trade', 'AAPL')
      .on('trade', (dxEvent) => {
        console.log(dxEvent.price);
      });
  }
});

const QuoteApi = Ember.Object.extend({
  dxfeedQuote: Ember.inject.service(),

  init () {
    this.set('quote', this.get('dxfeed').subscribe('SPY'));
  },

  quotePriceObserver: Ember.observer('quote.price', function () {
    console.log(this.get('quote.price'));
  })
})
```

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
