import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';
import { HelloModel, HelloView, WorkspaceViewJp, WorkspaceViewJpModel } from './index';

const activate = (app: any, widgets: any) => {
  widgets.registerWidget({
    name: 'labbox-ephys-widgets-jp',
    version: '0.1.4',
    exports: {HelloModel, HelloView, WorkspaceViewJpModel, WorkspaceViewJp}
  });
}

const labPlugin = {
  id: 'labbox-ephys-widgets-jp:plugin',
  requires: [IJupyterWidgetRegistry],
  activate,
  autoStart: true,
};
// the "as unknown as ..." typecast above is solely to support JupyterLab 1
// and 2 in the same codebase and should be removed when we migrate to Lumino.
export default labPlugin