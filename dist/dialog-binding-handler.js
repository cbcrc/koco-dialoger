'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _dialoger = require('dialoger');

var _dialoger2 = _interopRequireDefault(_dialoger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Simple use: dialog: 'dialog-name'
// Advanced use: dialog: { name: 'dialog-name', params: { ..params to pass to the dialog }, closed: func, failed: func }

// Options properties
//  options.name: Name of the dialog to be shown (must have been registered).
//  options.params: Parameters to be passed to the dialoger.show() function.
//  options.closed: Function to be called when the dialog has been closed.
//  options.failed: Function to be called when the dialog failed to open.
// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

_knockout2.default.bindingHandlers.dialog = {
    update: function update(element, valueAccessor) {
        var options = getOptions(valueAccessor);

        if (!options.name) {
            throw 'Dialog binding handler requires a name to be set.';
        }

        _knockout2.default.applyBindingsToNode(element, {
            click: function click() {
                _dialoger2.default.show(options.name, options.params).then(options.closed, options.failed).always(function () {
                    element.focus();
                });
            },
            clickBubble: false
        });
    }
};

function getOptions(valueAccessor) {
    var value = _knockout2.default.unwrap(valueAccessor());
    var options = {};

    if (typeof value === 'string') {
        options.name = value;
    } else {
        options = {
            name: _knockout2.default.unwrap(value.name),
            params: _knockout2.default.unwrap(value.params),
            closed: _knockout2.default.unwrap(value.closed),
            failed: _knockout2.default.unwrap(value.failed)
        };
    }

    return options;
}