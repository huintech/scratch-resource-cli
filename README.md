# openblock-resource-cli

[![Publish npm package](https://github.com/openblockcc/openblock-resource-cli/actions/workflows/publish.yml/badge.svg)](https://github.com/openblockcc/openblock-resource-cli/actions/workflows/publish.yml)
![GitHub](https://img.shields.io/github/license/openblockcc/openblock-resource-cli)

Provide some cli tools for resource translation and pre-process before release.

## Instructions

- Pre-process tools for release

  - **opt-size** used to delete useless files to reduce the expansion size

  - **gen-config** used to rewrite the configuration file that records the update parameters and folder hash

      eg: `gen-config --version=v0.0.1`

- Translation tools

  - **i18n-extract** used to extract all i18n content within resources identified as community official extensions

  - **i18n-push** used to push the extracted i18n content to transifex

  - **i18n-update** used to pull the translation content on transifex, generate and update the local translation file

- Release tools

  - **upload-releaseInfo** used to fetch latest release info and upload it to digital ocean spaces. Used in updates in China.

    eg: `upload-releaseInfo --repo=openblockcc/external-resources-v2 --endPoint=https://sgp1.digitaloceanspaces.com --bucket=openblock`

  - **upload-file** used to upload a file to digital ocean spaces. Used in updates in China.
