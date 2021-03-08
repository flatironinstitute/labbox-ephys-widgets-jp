- To release a new version of labbox_ephys_widgets_jp on PyPI:

```
python setup.py sdist
python set
```

Update _version.py (set release version, remove 'dev')
git add the _version.py file and git commit
`python setup.py sdist upload`
`python setup.py bdist_wheel upload`
`git tag -a X.X.X -m 'comment'`
Update _version.py (add 'dev' and increment minor)
git add and git commit
git push
git push --tags

- To release a new version of labbox-ephys-widgets-jp on NPM:

Update `js/package.json` with new npm package version

```
# clean out the `dist` and `node_modules` directories
git clean -fdx
npm install
npm publish
```