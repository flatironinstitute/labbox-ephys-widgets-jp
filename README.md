# labbox-ephys-widgets-jp

Jupyter widgets for [labbox-ephys](https://github.com/flatironinstitute/labbox-ephys).

---
## Prerequisites

It is recommended that you use a conda environment with Python >=3.8

You must use JupyterLab 3. If not already installed:

```bash
pip install jupyterlab==3
```

---
## Installation

Install labbox-ephys-widgets-jp and enable the labbox jupyter server extension:

```bash
pip install --upgrade labbox-ephys-widgets-jp
jupyter serverextension enable labbox --sys-prefix
```

---
## Development installation

For a development installation (requires NodeJS and yarn),

    $ git clone https://github.com/flatironinstitute/labbox-ephys-widgets-jp.git
    $ cd labbox-ephys-widgets-jp
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --overwrite --sys-prefix labbox_ephys_widgets_jp
    $ jupyter nbextension enable --py --sys-prefix labbox_ephys_widgets_jp

When actively developing your extension for JupyterLab, run the command:

    $ jupyter labextension develop --overwrite labbox_ephys_widgets_jp

Then you need to rebuild the JS when you make a code change:

    $ cd js
    $ yarn run build

You then need to refresh the JupyterLab page when your javascript changes.
