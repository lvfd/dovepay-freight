module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "jquery": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:json/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "json",
        "html",
    ],
    "rules": {
    },
    "globals": {
        "UIkit": "readonly",
        "WdatePicker": "readonly",
    }
}
