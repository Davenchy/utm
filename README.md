# Universal Tabs Manager - UTM

- A simple, clean and powerful tabs manager

## Development and Debugging

- Download dependencies and start the server

```bash
npm install
npm start
```

- Start firefox with the extension installed for debugging

```bash
npm run browser
# OR open with developer tools
npm run browser:dev
```

### Chromium Based Browsers (Untested)

- To run on chromium based browser for debugging

```bash
npm run browser -- --target chromium
```

- You can run multiple browsers by defining the target twice

```bash
npm run browser -- --target chromium --target firefox
```

### Browser Binary Path (Untested)

- Set the path to the browser binary

| Browser  | Option                                     |
| :------: | :----------------------------------------- |
| Firefox  | --firefox /path/to/firefox                 |
| Chromium | --chromium-binary /path/to/chromium-binary |

## More Soon

- More information will be added soon
