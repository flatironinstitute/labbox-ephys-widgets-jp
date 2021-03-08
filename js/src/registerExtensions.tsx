// This file was automatically generated. Do not edit directly.


import { LabboxExtensionContext } from './extensions/pluginInterface'

const registerExtensions = async (context: LabboxExtensionContext) => {
    const {activate: activate_mainwindow} = await import('./extensions/mainwindow/mainwindow')
    activate_mainwindow(context)
    const {activate: activate_workspaceview} = await import('./extensions/workspaceview/workspaceview')
    activate_workspaceview(context)
    const {activate: activate_mountainview} = await import('./extensions/mountainview/mountainview')
    activate_mountainview(context)
    const {activate: activate_averagewaveforms} = await import('./extensions/averagewaveforms/averagewaveforms')
    activate_averagewaveforms(context)
    const {activate: activate_clusters} = await import('./extensions/clusters/clusters')
    activate_clusters(context)
    const {activate: activate_correlograms} = await import('./extensions/correlograms/correlograms')
    activate_correlograms(context)
    const {activate: activate_electrodegeometry} = await import('./extensions/electrodegeometry/electrodegeometry')
    activate_electrodegeometry(context)
    const {activate: activate_firetrack} = await import('./extensions/firetrack/firetrack')
    activate_firetrack(context)
    const {activate: activate_pythonsnippets} = await import('./extensions/pythonsnippets/pythonsnippets')
    activate_pythonsnippets(context)
    const {activate: activate_snippets} = await import('./extensions/snippets/snippets')
    activate_snippets(context)
    const {activate: activate_spikeamplitudes} = await import('./extensions/spikeamplitudes/spikeamplitudes')
    activate_spikeamplitudes(context)
    const {activate: activate_timeseries} = await import('./extensions/timeseries/timeseries')
    activate_timeseries(context)
    const {activate: activate_unitstable} = await import('./extensions/unitstable/unitstable')
    activate_unitstable(context)
    }

export default registerExtensions