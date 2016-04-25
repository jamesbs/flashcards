SystemJS.config({
  transpiler: false,
  packages: {
    "angular2-starter": {
      "format": "esm",
      "main": "angular2-starter.js"
    },
    "app": {
      "defaultExtension": "ts",
      "meta": {
        "*.ts": {
          "loader": "ts"
        }
      }
    }
  },
  meta: {
    "angular2/*": {
      "deps": [
        "zone.js",
        "reflect-metadata"
      ]
    }
  },
  typescriptOptions: {
    "target": "es5",
    "module": "system",
    "noImplicitAny": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "os": "github:jspm/nodelibs-os@0.2.0-alpha",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "readline": "github:jspm/nodelibs-readline@0.2.0-alpha",
    "ts": "github:frankwallis/plugin-typescript@4.0.7",
    "typescript": "npm:typescript@1.8.10",
    "angular2": "npm:angular2@2.0.0-beta.15",
    "es6-promise": "npm:es6-promise@3.1.2",
    "es6-shim": "npm:es6-shim@0.33.13",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "plugin-typescript": "github:frankwallis/plugin-typescript@4.0.7",
    "reflect-metadata": "npm:reflect-metadata@0.1.2",
    "rxjs": "npm:rxjs@5.0.0-beta.2",
    "zone.js": "npm:zone.js@0.6.6"
  },
  packages: {
    "github:frankwallis/plugin-typescript@4.0.7": {
      "map": {
        "typescript": "npm:typescript@1.8.10"
      }
    },
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.6.0"
      }
    },
    "github:jspm/nodelibs-os@0.2.0-alpha": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    },
    "npm:buffer@4.6.0": {
      "map": {
        "base64-js": "npm:base64-js@1.1.2",
        "ieee754": "npm:ieee754@1.1.6",
        "isarray": "npm:isarray@1.0.0"
      }
    },
    "npm:es6-promise@3.1.2": {
      "map": {}
    },
    "npm:es6-shim@0.33.13": {
      "map": {}
    },
    "npm:reflect-metadata@0.1.2": {
      "map": {}
    },
    "npm:rxjs@5.0.0-beta.2": {
      "map": {}
    },
    "npm:zone.js@0.6.6": {
      "map": {}
    }
  }
});
