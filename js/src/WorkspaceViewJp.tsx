import { DOMWidgetModel, DOMWidgetView, ISerializers } from '@jupyter-widgets/base';
import { createExtensionContext, LabboxProvider } from 'labbox';
import React, { Suspense, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { WorkspaceRoute } from './extensions/pluginInterface';
import registerExtensions from './registerExtensions';
import version from './version'

export class WorkspaceViewJp extends DOMWidgetView {
    // _hitherJobManager: HitherJobManager
    _status = {active: true}
    initialize() {
        // this._hitherJobManager = new HitherJobManager(this.model)
    }
    async element() {
        const workspaceRoute = JSON.parse(this.model.get('workspaceRoute'))
        const workspaceUri: string = workspaceRoute.workspaceUri

        const WorkspaceViewWrapper = React.lazy(() => import('./WorkspaceViewWrapper'))

        const extensionContext = createExtensionContext()
        await registerExtensions(extensionContext)

        const apiConfig = {
            webSocketUrl: '',
            baseSha1Url: `/sha1`,
            baseFeedUrl: `/feed`,
            jupyterMode: true,
            jupyterModel: this.model
        }

        // cannot use a hook here because we are not in a react component
        const handleWorkspaceRouteChanged = (workspaceRoute: WorkspaceRoute) => {
            this.model.set('workspaceRoute', JSON.stringify(workspaceRoute))
            this.model.save_changes()
        }

        return (
            <Suspense fallback={<div>Importing workspace view</div>}>
                <LabboxProvider extensionContext={extensionContext} apiConfig={apiConfig} status={this._status}>
                    <WorkspaceViewWrapper
                        workspaceUri={workspaceUri}
                        onWorkspaceRouteChanged={handleWorkspaceRouteChanged}
                    />
                </LabboxProvider>
            </Suspense>
        )
    }
    render() {
        this.element().then((reactElement) => {
            const widgetHeight = 700

            this.el.classList.add('WorkspaceViewJp')

            renderJpWidget(this, reactElement, widgetHeight)
        })
    }
    remove() {
        this._status.active = false
    }
}

const renderJpWidget = (W: DOMWidgetView, reactElement: JSX.Element, widgetHeight: number) => {
    const style = W.el.style as { [key: string]: any }
    style.height = '100%'
    style['min-height'] = `${widgetHeight}px`
    ReactDOM.render(reactElement, W.el)
}

export class WorkspaceViewJpModel extends DOMWidgetModel {
    initialize(attributes: any, options: any) {
        super.initialize(attributes, options);
    }

    defaults() {
        return {
            ...super.defaults(),
            _model_name: WorkspaceViewJpModel.model_name,
            _model_module: WorkspaceViewJpModel.model_module,
            _model_module_version: WorkspaceViewJpModel.model_module_version,
            _view_name: WorkspaceViewJpModel.view_name,
            _view_module: WorkspaceViewJpModel.view_module,
            _view_module_version: WorkspaceViewJpModel.view_module_version,
            workspaceRoute: JSON.stringify({workspaceUri: '', page: 'recordings'})
        };
    }

    static serializers: ISerializers = {
        ...DOMWidgetModel.serializers,
        // Add any extra serializers here
    };

    static model_name = 'WorkspaceViewJpModel';
    static model_module = 'labbox-ephys-widgets-jp';
    static model_module_version = version;
    static view_name = 'WorkspaceViewJp'; // Set to null if no view
    static view_module = 'labbox-ephys-widgets-jp'; // Set to null if no view
    static view_module_version = version;
}