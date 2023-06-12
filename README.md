# Quasar App (scriberabbit)

A Quasar Framework app

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Deploy to firebase
```bash
npm install -g firebase-tools  
firebase login  
# we have the json files available so there is no need to init.
# firebase init  
firebase deploy --only hosting:scriberabbitdev  
```

### Customize the configuration
See [Configuring quasar.conf.js](https://v2.quasar.dev/quasar-cli/quasar-conf-js).
