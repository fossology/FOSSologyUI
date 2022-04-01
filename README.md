# Welcome to FOSSology UI 👋

<p style="text-align:center;" align="center">
  <img align="center" src="https://github.com/fossology/FOSSologyUI/blob/main/public/logo192.png" width="30%" />
</p>


[![GPL-2.0](https://img.shields.io/github/license/fossology/fossology)](LICENSE)
[![Slack Channel](https://img.shields.io/badge/slack-fossology-blue.svg?longCache=true&logo=slack)](https://join.slack.com/t/fossology/shared_invite/enQtNzI0OTEzMTk0MjYzLTYyZWQxNDc0N2JiZGU2YmI3YmI1NjE4NDVjOGYxMTVjNGY3Y2MzZmM1OGZmMWI5NTRjMzJlNjExZGU2N2I5NGY)
[![YouTube Channel](https://img.shields.io/badge/youtube-FOSSology-red.svg?&logo=youtube&link=https://www.youtube.com/channel/UCZGPJnQZVnEPQWxOuNamLpw)](https://www.youtube.com/channel/UCZGPJnQZVnEPQWxOuNamLpw)

## About FOSSology

FOSSology is an open source license compliance software system and toolkit. As a toolkit, you can run license, copyright and export control scans from the command line. As a system, a database and web UI are provided to give you a compliance workflow. In one click you can generate an SPDX file or a ReadMe with all the copyrights notices from your software. FOSSology deduplication means that you can scan an entire distro, rescan a new version, and only the changed files will get rescanned. This is a big time saver for large projects.

[Check out Who Uses FOSSology!](https://www.fossology.org)

FOSSology does not give legal advice.
https://fossology.org/

## Overview

The UI Migration project is an effort focused on generating the new component-based architecture with the integration of the APIs. To make the project more **efficient** and **easily accessible**, an entire code base shift from Symfony-Twig to React.js is proposed. React.js features an incrementally adaptable architecture that focuses on declarative rendering and component composition. React.js component system will enable us to organize the current working APIs appropriately.

## Objectives

- Working on good interactive design, with a modern look.
- Integrating the APIs to the new component-based UI structure.
- Seamless routing and page transitions.
- Giving the power of the node engine to our UI. Making all NPM accessible.
- Writing detailed ​ documentation of the project, to make the
  codebase simpler for other contributors.

## Requirements

- [NodeJS](https://nodejs.org/en/download/) and NPM or [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

## Installation

### Docker

#### Development

FOSSology comes with a Dockerfile allowing for containerized execution.

This method only requires that you have the `Docker engine` and `docker-compose` installed on your machine.

- Added benefits to this method other than the ones that docker already provides is you are not confined to developing in the docker container. You can also develop using your local modules as defined above.

```zsh
docker-compose -f docker-compose.dev.yml pull fossology_server && docker-compose -f docker-compose.dev.yml up     #Starts the react-dev-server on localhost:3000
```

On Windows you might have to forego the `&&` and run both commands individually.

Running the `docker-compose pull ...` command each time you run the docker container isn't required but recommended so as to get the latest fossology image.

This will start the react-dev-server on localhost on `port:3000`.

The docker image can then be used using http://IP_OF_DOCKER_HOST:3000/ user fossy password fossy. (IP_OF_DOCKER_HOST is generally localhost)

You can even run it detached in the background using the -d option.

```zsh
docker-compose -f docker-compose.dev.yml up -d
docker-compose logs  #To view server logs
```

npm packages can be installed using `docker-compose exec`

```zsh
docker-compose -f docker-compose.dev.yml exec -w /usr/src/fossologyui fossologyui_server yarn add --save <package name> #Install npm package for react-dev-server
```

Once done developing, you can clean up running containers and networks using:

```zsh
docker-compose -f docker-compose.dev.yml down
```

#### Production

For production level deployment you can use:

```zsh
docker build \
-t fossologyui:react1.0 \
--build-arg REACT_APP_SERVER_URL="localhost/repo/api/v2" \
--build-arg REACT_APP_HTTPS="false" .
```

for building the image and then host the image using:

```zsh
docker run -p 3000:3000 fossologyui:react1.0
```

The docker image would then be hosted on http://IP_OF_DOCKER_HOST:3000/ user fossy password fossy. (IP_OF_DOCKER_HOST is generally localhost)

Alternatively, you can also deploy it using docker-compose:

```zsh
docker-compose up
```

You can even run it detached in the background using the -d option.

```zsh
docker-compose up -d
docker-compose logs  #To view server logs
```

Deployed image can be pulled down using:

```zsh
docker-compose down
```

This will clean up running containers and networks.

### Project Setup

- Create a `.env` in root directory of project and copy the contents from `.env.sample`

- Installs the packages:

```sh
 yarn
```

- Runs the app in the development mode at [http://localhost:3000](http://localhost:3000)

```sh
yarn start
```

### Deployment

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```sh
yarn test
```

Builds the app for production to the `build` folder.

```sh
yarn build
```

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Support

Mailing lists, FAQs, Release Notes, and other useful info is available
by clicking the documentation tab on the project website. We encourage
all users to join the mailing list and participate in discussions.
There is also a #fossology IRC channel on the freenode IRC network if
you'd like to talk to other FOSSology users and developers.
See [Contact Us](https://www.fossology.org/about/contact/)

## Contributing

We really like contributions in several forms, see [CONTRIBUTING.md](CONTRIBUTING.md)

## Licensing

FOSSology and FOSSologyUI are licensed under [GPL-2.0](https://tldrlegal.com/license/gnu-general-public-license-v2)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; version 2 of the License

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

Please see the LICENSE file included with this software for the full texts of
these licenses.
