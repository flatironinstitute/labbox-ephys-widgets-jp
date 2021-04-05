import json
# this is how the hither functions get registered
import labbox_ephys as le
import labbox as lb
from labbox_ephys.workspace.workspace import Workspace
from ipywidgets import DOMWidget
from traitlets import Float as FloatTrait
from traitlets import Unicode
from ._version import __version__

module_name = 'labbox-ephys-widgets-jp'
module_version = __version__

labbox_config = {
        'job_handlers': {
            'default': {
                'type': 'local'
            },
            'partition1': {
                'type': 'local'
            },
            'partition2': {
                'type': 'local'
            },
            'partition3': {
                'type': 'local'
            },
            'timeseries': {
                'type': 'local'
            }
        }
    }

def WorkspaceView(*, workspace: Workspace, height: float=0):
    return create_workspace_view(workspace_uri=workspace.get_uri(), height=height)

def create_workspace_view(
    *,
    workspace_uri: str,
    height: float=0
):
    initial_workspace_route = {
        'page': 'recordings',
        'workspaceUri': workspace_uri
    }
    class WorkspaceViewJp(DOMWidget):
        _model_name = Unicode('WorkspaceViewJpModel').tag(sync=True)
        _model_module = Unicode(module_name).tag(sync=True)
        _model_module_version = Unicode(module_version).tag(sync=True)
        _view_name = Unicode('WorkspaceViewJp').tag(sync=True)
        _view_module = Unicode(module_name).tag(sync=True)
        _view_module_version = Unicode(module_version).tag(sync=True)
        workspaceRoute = Unicode(json.dumps(initial_workspace_route)).tag(sync=True)
        widgetHeight = FloatTrait(height).tag(sync=True)
        def __init__(self) -> None:
            super().__init__()
            self.on_msg(self._handle_message)
            self._worker_session = lb.WorkerSession(labbox_config=labbox_config, default_feed_name='labbox-ephys-default')
            def on_msgs(msgs):
                self.send(msgs)
            self._worker_session.on_messages(on_msgs)
        def _handle_message(self, widget, msg, buffers):
            if msg['type'] == 'iterate':
                self._worker_session.iterate()
            else:
                self._worker_session.handle_message(msg)
                self._worker_session.iterate()
        @property
        def workspace_uri(self):
            wr = json.loads(self.workspaceRoute)
            return wr.get('workspaceUri', workspace_uri)
        @property
        def current_page(self):
            wr = json.loads(self.workspaceRoute)
            return wr['page']
        @property
        def current_recording_id(self):
            wr = json.loads(self.workspaceRoute)
            return wr.get('recordingId', None)
        @property
        def current_sorting_id(self):
            wr = json.loads(self.workspaceRoute)
            return wr.get('sortingId', None)
    X = WorkspaceViewJp()
    return X
