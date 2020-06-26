<p align="center">
  <img src="./images/pancakes.png">
</p>

<h1 align="center">
  Hero Editor
</h1>

<p align="center">
  <img src="https://github.com/Thinkei/hero-editor/workflows/CI/badge.svg">
  <img src="https://img.shields.io/badge/node-10.16.0-brightgreen">
  <img src="https://img.shields.io/badge/npm-6.9.0-red">
  <img src="https://img.shields.io/badge/yarn-1.22.4-blue">
</p>

Hero editor is a WYSIWYG built on top of Slate (v0.58.3). It's designed for mobile-first, hence all of the communications from plugins to the editor must go through message channel. This package also includes serializers and renderers for the Slate content.

## Development

- Start bundler
```
yarn dev
```
- Start playground
```
yarn storybook
```

## Usage

```javascript
import HeroEditor, {
  JsonViewer,
  bold,
  italic,
  underline,
  logger,
  listItem,
  bulletedList,
  numberedList,
  mention,
  editorPlaceholder,
} from 'hero-editor';

const App = () => {
  const plugins = useMemo(
    () => [
      logger,
      bold,
      italic,
      underline,
      bulletedList,
      numberedList,
      listItem,
      mention({
        renderMentionList: (search, onSelect) => {
          const results = sampleMentions.filter(({ name }) =>
            name.toLowerCase().includes(search.toLowerCase()),
          );

          if (!results.length)
            return (
              <div style={styles.list}>
                <div style={{ ...styles.listItem, textAlign: 'center' }}>
                  No result
                </div>
              </div>
            );

          return (
            <div style={styles.list}>
              {results.map(({ id, name }) => (
                <div
                  key={id}
                  style={styles.listItem}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSelect({ id, name });
                  }}
                >
                  {name}
                </div>
              ))}
            </div>
          );
        },
      }),
      editorPlaceholder({
        value:
          'Has someone brightened up your day? Type @ to give them a Shout Out!',
      }),
    ],
    [],
  );
  const [value, setValue] = useState(defaultValue);

  return (
    <div>
      <HeroEditor
        id="interactive"
        plugins={plugins}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      ></HeroEditor>
    </div>
  );
};
```

## Plugins

- [x] bold
- [x] italic
- [x] underline
- [x] bulleted list
- [x] numbered list
- [x] mention/placeholder
- [x] editor placeholder
- [ ] heading
- [ ] table
- [ ] link
