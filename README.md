# ember-fullcalendar

[![CircleCI](https://img.shields.io/circleci/build/github/Mariana-Tek/ember-fullcalendar?style=flat-square)](https://circleci.com/gh/mariana-tek/ember-fullcalendar)

An Ember addon that wraps [Fullcalendar (v4)](https://fullcalendar.io/) in a component.


## Compatibility

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


## Installation

### 1. Install Ember Addon

```
ember install ember-fullcalendar
```

This addon includes `@fullcalendar/core` as a dependency, but does not include any fullcalendar plugins which you will need to install manually.

### 2. Install additional fullcalendar plugins

As Fullcalendar v4 has a more "a la carte" structure, you will need to install the plugins you plan to use. Documentation can be found at https://fullcalendar.io/docs/initialize-es6 and https://fullcalendar.io/docs/plugin-index.

### 3. Import stylesheets from plugins that have styles

```js
// ember-cli-build.js

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
    // ...all your configuration

    // If you install the @fullcalendar/daygrid plugin,
    // you would import it's stylesheet like so:
    app.import('node_modules/@fullcalendar/daygrid/main.css');

    return app.toTree();
};
```


## Usage

Inspired by [`fullcalendar-react`](https://github.com/fullcalendar/fullcalendar-react) this addon is written as a very lightweight wrapper around Fullcalendar v4. With one exception (`getFullCalendarRef`) the addon simply passes attributes through to Fullcalendar. If Fullcalendar has a complimentary option it will be utilized, otherwise the attribute will simply be ignored. To use this plugin you will need to be familiar with [Fullcalendar's API](https://fullcalendar.io/docs).

```hbs
<FullCalendar
    @defaultDate={{this.defaultDate}}
    @defaultView={{this.defaultView}}
    @events={{this.events}}
    @plugins={{this.plugins}}
/>
```

### `getFullCalendarRef`

```hbs
<FullCalendar
    @defaultDate={{this.defaultDate}}
    @getFullCalendarRef={{action (mut this ourCalendarRef)}}
/>
```

Most attributes (e.g. [`eventClick`](https://fullcalendar.io/docs/eventClick), [`slotDuration`](https://fullcalendar.io/docs/slotDuration)) can be passed directly to the component. A few parts of Fullcalendar's API (e.g. `changeView`, `gotoDate`) will require you to pass an action or function to `getFullCalendarRef` that stores the reference to fullcalendar so that you can call it directly:

```js
this.ourCalendarRef.gotoDate(new Date(1999, 1, 1))
```


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


# License

This project is licensed under the [MIT License](LICENSE.md).
