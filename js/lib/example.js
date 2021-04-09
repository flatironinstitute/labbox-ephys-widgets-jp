import { DOMWidgetModel, DOMWidgetView } from '@jupyter-widgets/base';
import _ from 'lodash';
import version from './version';
// See example.py for the kernel counterpart to this file.
// const extensionContext = createExtensionContext<LabboxPlugin>()
// registerExtensions(extensionContext)
// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including
//
//  - `_view_name`
//  - `_view_module`
//  - `_view_module_version`
//
//  - `_model_name`
//  - `_model_module`
//  - `_model_module_version`
//
//  when different from the base class.
// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be specified.
export const HelloModel = DOMWidgetModel.extend({
    defaults: _.extend(DOMWidgetModel.prototype.defaults(), {
        _model_name: 'HelloModel',
        _view_name: 'HelloView',
        _model_module: 'hello',
        _view_module: 'labbox-ephys-widgets-jp',
        _model_module_version: version,
        _view_module_version: version,
        value: `Hello World (from typescript) - ${version}!`
    })
});
// Custom View. Renders the widget model.
export const HelloView = DOMWidgetView.extend({
    // Defines how the widget gets rendered into the DOM
    render: function () {
        this.value_changed();
        // Observe changes in the value traitlet in Python, and define
        // a custom callback.
        this.model.on('change:value', this.value_changed, this);
    },
    value_changed: function () {
        this.el.textContent = this.model.get('value') + (' [from typescript]');
    }
});
//# sourceMappingURL=example.js.map