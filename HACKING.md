## Code structure

```
├── public/
├── src/
│   ├── api/
│   ├── cnxml/
│   ├── components/
│   ├── persistence/
│   ├── plugins/
│   └── util/
└── test/
```

Where

- `api/` contains abstract classes describing what interface this library 
  expects for communicating with the document store (to be implemented
  by consumer).
- `cnxml/` contains parser and serializer for [CNXML](CNXML).

  > TODO: This should probably be somewhere else.
  
- `components/` contains [React](react) components.
- `persistence/` contains implementation of a browser-local crash-resistant
  storage for edit history.

  > TODO: This should probably be somewhere else.
  
- `plugins/` contains all [Slate](slate) plugins used by the editor.
- `util/` is a place for utilities which don't neatly fit anywhere else.
- `test/` contains all tests, see [test/README.md].

[React]: https://reactjs.org/
[Slate]: https://www.slatejs.org
[CNXML]: https://legacy.cnx.org/help/authoring/xml#cnxml

### Slate plugins

Plugins are divided (by convention) into a number of files:

- `index.js` exports (by `default`) the plugin function.
- `index.styl` contains primary styling for plugin; i.e. the style necessary
  for the plugin to work at all, additional styling will come from themes.
- `render.js` contains all rendering code.
- `schema.js` defines schema and its validation and normalization routines.
- `changes.js` defines all document transforms.
- `utils.js` contains utility functions not otherwise fitting into other
  files, such as querying state of a document.
- `handlers.js` defined event handlers.
- `xref.js` provides `renderXRef` for rendering cross-reference labels. 
  See [slate-counters](slate-counters) for details.

[slate-counters]: https://github.com/katalysteducation/slate-counters
