# Bible Plan

https://emeraldwalk.github.io/bible-plan/

## Project Setup

- npx degit solidjs/templates/ts bible-plan
- update packages to latest
- package.json
  - `"type": "module"` - this fixes error with importing esm in vite.config
  - Add overrides to enable Vite 5 support
    ```json
    "overrides": {
        "solid-devtools": {
            "vite": "^5.0.0"
        },
        "vite-plugin-solid": {
            "vite": "^5.0.0"
        }
    }
    ```
