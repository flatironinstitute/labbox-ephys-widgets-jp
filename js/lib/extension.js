// This file contains the javascript that is run when the notebook is loaded.
// It contains some requirejs configuration and the `load_ipython_extension`
// which is required for any notebook extension.
//
// Some static assets may be required by the custom widget javascript. The base
// url for the notebook is not known at build time and is therefore computed
// dynamically.
window.__webpack_public_path__ = document.querySelector('body').getAttribute('data-base-url') + 'nbextensions/labbox-ephys-widgets-jp';
// Configure requirejs
if (window.require) {
    window.require.config({
        map: {
            "*": {
                "labbox-ephys-widgets-jp": "nbextensions/labbox-ephys-widgets-jp/index",
            }
        }
    });
}
// Export the required load_ipython_extension
export const load_ipython_extension = () => {
};
//# sourceMappingURL=extension.js.map