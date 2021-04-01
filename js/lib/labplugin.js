import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';
import { HelloModel, HelloView, WorkspaceViewJp, WorkspaceViewJpModel } from './index';
import version from './version';
const activate = (app, widgets) => {
    widgets.registerWidget({
        name: 'labbox-ephys-widgets-jp',
        version: version,
        exports: { HelloModel, HelloView, WorkspaceViewJpModel, WorkspaceViewJp }
    });
};
const labPlugin = {
    id: 'labbox-ephys-widgets-jp:plugin',
    requires: [IJupyterWidgetRegistry],
    activate,
    autoStart: true,
};
// the "as unknown as ..." typecast above is solely to support JupyterLab 1
// and 2 in the same codebase and should be removed when we migrate to Lumino.
export default labPlugin;
//# sourceMappingURL=labplugin.js.map