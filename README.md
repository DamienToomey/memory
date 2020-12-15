# Memory

Based on a Openclassrooms course: [Réalisez une application web avec React.js](https://openclassrooms.com/fr/courses/4664381-realisez-une-application-web-avec-react-js/4664801-demarrez-facilement-avec-create-react-app)

- Open App: https://damientoomey.github.io/memory/app
- Open Documentation: https://damientoomey.github.io/memory/docs
- Open Coverage Report: https://damientoomey.github.io/memory/coverage/lcov-report

This app uses [React](https://reactjs.org) and was created with Create React App.

### Badges

|  |  |  |
|:---:|:---:|:---:|
| [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=DamienToomey_memory2&metric=bugs)](https://sonarcloud.io/dashboard?id=DamienToomey_memory2) | [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=DamienToomey_memory2&metric=code_smells)](https://sonarcloud.io/dashboard?id=DamienToomey_memory2) | [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=DamienToomey_memory2&metric=coverage)](https://sonarcloud.io/dashboard?id=DamienToomey_memory2) |
| [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=DamienToomey_memory2&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=DamienToomey_memory2) | [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=DamienToomey_memory2&metric=ncloc)](https://sonarcloud.io/dashboard?id=DamienToomey_memory2) | [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=DamienToomey_memory2&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=DamienToomey_memory2) |
| [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=DamienToomey_memory2&metric=alert_status)](https://sonarcloud.io/dashboard?id=DamienToomey_memory2) | [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=DamienToomey_memory2&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=DamienToomey_memory2) | [![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/dashboard?id=DamienToomey_memory2) |

### I. How was the project created?

#### Install nodejs

(to have `npm` command)

```
$ sudo apt install nodejs
$ node -v
v12.16.2
```

#### Update `npm` version

```
$ sudo npm install --global npm
$ npm -v
6.14.4
```

#### Display React version

```
$ npm view react version
17.0.1
```

#### Install Create-React-App

```
sudo npm install --global create-react-app
```

#### Create app skeleton with Create-React-App

```
$ create-react-app memory
```

```
.
├── node_modules
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
```

#### Start app

```
$ sudo npm start
```

### II. How was this repository created?

- Go to https://github.com
- Create a blank project named `memory`
- `$ create-react-app memory` already initialized a git repository (`.git` folder)

```
$ git remote add origin https://github.com/DamienToomey/memory.git
$ git add .
$ git commit -m "Initial commit`
$ git push --set-upstream origin master
```

### III. Install app specific modules

- Shuffle values in a collection

```
$ sudo npm install --save lodash.shuffle
```

- Runtime type checking for React props and similar objects.

```
$ sudo npm install --save prop-types
# PropTypes are only for developpers during development
# They will be automatically removed when building the app for production
```

### IV. Tests

#### [Jest](https://jestjs.io)

(already installed with Create React App)

#### [Chai](https://www.chaijs.com)

```
$ sudo npm install --save-dev chai 
```

- Pros
    - Has more assertions than Jest
    - Has more plugins than Jest
    - Can chain assertions
- Cons
    - A spelling mistake in the name of an assertion is not always made explicit, thus making the developper believe that the test was a success eventhough is was not
    - Compared to Jest, chai does not print a `diff`, a precise output about the test that failed to help the developper debug the app
    - Chai does not help us test React components

#### [Dirty Chai](https://www.npmjs.com/package/dirty-chai)

To overcome chai's first drawback, one can install a plugin, `dirty-chai`, which converts chai assertion accessors to assertion functions which will throw exceptions when necessary (when an assertion is misspelled for example).

```
$ sudo npm install --save-dev dirty-chai 
```

#### [Chai Jest Diff](https://www.npmjs.com/package/chai-jest-diff)

To overcome chai's second drawback, one can install a plugin, `chai-jest-diff`.

```
$ sudo npm install --save-dev chai-jest-diff
```

#### [Enzyme](https://enzymejs.github.io/enzyme)

(by AirBnb)

To overcome chai's third drawback, one can install a plugin, `enzyme`.

- Pros
    - test components individually without going into child components (instanciate components and check if they correspond to what we wanted)

```
$ sudo npm install --save-dev enzyme enzyme-adapter-react-16 react-test-renderer chai-enzyme
# enzyme: install enzyme
# enzyme-adapter-react-16: adapter for react 16
# react-test-renderer: overlay on top of React's test stack
# chai-enzyme: use enzyme assertions in chai
```

#### [Sinon](sinonjs.org)

- Pros
    - Make sure components respond correctly to events (we use Enzyme and Sinon to do this) (use `sinon.spy()` instead of `jest.fn()`)
    - can also simulate network constraints
    - can be used for asynchronous tests

```
$ sudo npm install --save-dev sinon sinon-chai
# sinon-chai: use sinon in chai
```

#### Snapshots

Snapshots are available with Jest as a safety net and does not replace any tests.

We will use them with Chai.

Snapshots work with anything that can be serialized into JSON.

Steps:
- Serialize a version of the app that works (components, API reponses, ...) and save it (called snapshot)
- Version snapshots with code
- Compare previous snapshot with new snapshot
    - Case1: previous snapshot is correct: we have just caught a regression in the code
    - Case2: new snapshot is correct: we can overwrite the previous snapshot

```
sudo npm install --save-dev chai-jest-snapshot enzyme-to-json
```

**WARNING**: the initial snapshot must be correct, otherwise we will be comparing future snapshots with an initial erroneous snapshot, thus not truly knowing which snapshot is correct.

**WARNING**: care must be taken when deciding which version of the snapshot is correct. This manual step can lead to adding a regression to the code.

I decide not to use snapshots in this project as I am using a CI pipeline to automatically run tests and evaluate code quality and snapshot updates are not automatic.

#### Run tests

```
$ sudo npm test --verbose
# --verbose: print console.log
```

#### Run tests on a single file

```
$ sudo npm test --verbose -- App.test.js
```

#### Run tests and generate a test coverage report

```
$ sudo npm test -- --coverage --watchAll --verbose
# --watchAll: rerun all tests, not just tests related to modified files
```

### V. SonarCloud (code quality)

#### Setup SonarCloud project

- Go to https://sonarcloud.io
- Sign in / Sign up
- Create SonarCloud project
- Import GitHub project
- Follow instructions

#### Create SonarCloud compatible test coverage report

- Reference: [SonarQube Documentation](https://docs.sonarqube.org/latest/analysis/coverage)

```
$ sudo npm install --save-dev jest-sonar-reporter
```

Add the following code at the end of `package.json` to save `test-reporter.xml` in a dedicated folder named `reports`:

```
{
  "jestSonar": {
    "reportPath": "reports",
    "reportFile": "test-reporter.xml",
    "indent": 4
  }
}
```

```
$ sudo npm test -- --coverage --watchAll --verbose --testResultsProcessor jest-sonar-reporter
```

### VI. Documentation

#### [JSDoc](https://jsdoc.app)

- Reference: [A Guide to using JSDoc for React.js | Better Documentation in React](https://www.inkoop.io/blog/a-guide-to-js-docs-for-react-js)

```
$ sudo npm install --save-dev jsdoc
```

```
$ sudo npm install --save-dev better-docs
# better-docs is a theme for JSDocs that provides a custom @component plugin.
```

Create `jsdoc.conf.json`:

```
touch jsdoc.conf.json
```

The content in `jsdoc.conf.json` comes from [A Guide to using JSDoc for React.js | Better Documentation in React](https://www.inkoop.io/blog/a-guide-to-js-docs-for-react-js). 

Add the following command in `package.json`:

```
"scripts": {
  ...
    "docs": "jsdoc -c jsdoc.conf.json"
  ...
}
```

#### Generate documentation

```
$ sudo npm run docs
```
 
### VII. Docker deployment (with static server)

- Reference: [https://create-react-app.dev/docs/deployment/#static-server](https://create-react-app.dev/docs/deployment)

See content of `Dockerfile`.

In the commands below, `b398f4f1c4ed` is the container id given by `$ sudo docker ps`.

```
$ sudo docker ps
$ sudo docker stop b398f4f1c4ed
$ sudo docker system prune --all
$ sudo docker volume prune
$ sudo docker build -t memory .
$ sudo docker run -d -p 3000:3000 memory
$ sudo docker container logs b398f4f1c4ed -f # wait until server is ready
```

#### Access app

- `localhost:3000`
or
- `{IP address of computer on which Docker container is running}:3000`

### VIII. Deployment (without any server)

- References:
  - [Stack Overflow | Run React application without server](https://stackoverflow.com/questions/40342100/run-react-application-without-server)
  - [Create React App Documentation | Deployment](https://create-react-app.dev/docs/deployment)

(not used in this repository but interesting for future projects)

### IX. Deployment on GitHub Pages

- Reference: [Create React App Documentation | Deployment](https://create-react-app.dev/docs/deployment/#github-pages)

**WARNING**: follow the steps bellow to create empty `gh-pages` branch where HTML/CSS/JS content will be stored and deployed to GitHub Pages.

The branch `gh-pages` will contain the app, its documentation and the coverage report.

```
$ git pull # make sure your local repository is up to date
$ git branch -D gh-pages # delete local branch gh-pages
$ git push origin --delete gh-pages # delete remote branch gh-pages
$ git checkout --orphan gh-pages # create new branch with no history called gh-pages
$ git rm -rf . # delete content of this branch
$ git commit --allow-empty -m "Initialize gh-pages branch"
$ git push origin gh-pages
$ git branch
$ git checkout master
```

At this stage, branch `gh-pages` is empty.

#### Add `homepage` to package.json

```
"homepage": "https://damientoomey.github.io/memory/app"
```

#### Configure GitHub Pages

Go to https://github.com/DamienToomey/memory/settings > Scroll down to GitHub Pages > Select `gh-pages` branch and (root) folder.

#### Push to master branch to kick off CI pipeline

This repository uses GitHub Actions for CI/CD purposes (see `.github/workflows/github-ci.yml`). In the `deploy` job of the pipeline, `build`, `coverage`, `docs` folders are generated and pushed on the branch `gh-pages`.

**WARNING**: content on the branch `gh-pages` will be available only after:
- Step1: configuring GitHub Pages (as described above)
- Step2: pushing HTML/CSS/JS content to the branch `gh-pages`

Step1 and Step2 must be done in this order.

In our case, HTML/CSS/JS content is pushed to the branch `gh-pages` in our CI pipeline.

```
$ git add .
$ git commit -m "Update"
$ git push # to kick off CI pipeline
```

"**Note**: It can take up to 20 minutes for changes to your site to publish after you push the changes to GitHub."
[GitHub Pages | Creating your site](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/creating-a-github-pages-site#creating-your-site)

At this stage, you can access the content of the branch `gh-pages` via:
- Open App: https://damientoomey.github.io/memory/app
- Open Documentation: https://damientoomey.github.io/memory/docs
- Open Coverage Report: https://damientoomey.github.io/memory/coverage/lcov-report

### X. Troubleshooting

- I get a 404 error when going on at least one of the following links above.

Try adding `/index.html` at the end of the link. If you can now access the webpage, enter the following commands to trigger a GitHub Pages rebuild.

```
git commit -m 'rebuild pages' --allow-empty
git push origin gh-pages
```

- Reference:
  - [How to force GitHub Pages build?](https://stackoverflow.com/questions/24098792/how-to-force-github-pages-build/61706020#61706020)
    - "It's not currently possible to manually trigger a rebuild, without pushing a commit to the appropriate branch."

### XI. References

- [actions/cache for nmp | GitHub](https://github.com/actions/cache/blob/main/examples.md#using-multiple-systems-and-npm-config)

- [How to cache node_modules in GitHub Actions with Yarn ](https://dev.to/mpocock1/how-to-cache-nodemodules-in-github-actions-with-yarn-24eh)
  - "Note: It is not recommended to cache `node_modules`, as it can break across Node versions and won't work with `npm ci`" ([actions/cache for nmp | GitHub](https://github.com/actions/cache/blob/main/examples.md#using-multiple-systems-and-npm-config))

- [Run jobs in Docker containers in GitHub Actions | GitHub Docs](https://docs.github.com/en/free-pro-team@latest/actions/guides/building-and-testing-nodejs#running-on-a-different-operating-system)
  - "You can also run jobs in Docker containers [...]"

- [sonarcloud-github-action | GitHub](https://github.com/SonarSource/sonarcloud-github-action)

- [peterjgrainger/action-create-branch | GitHub](https://github.com/peterjgrainger/action-create-branch/blob/master/.github/workflows/codeql-analysis.yml)
  - `github/codeql-action` code quality example

- [How to force GitHub Pages build? | Stack Overflow](https://stackoverflow.com/questions/24098792/how-to-force-github-pages-build/61706020#61706020)

- [Can I have my GitHub Pages index.html in a subfolder of the repository? | Stack Overflow](https://stackoverflow.com/questions/25320356/can-i-have-my-github-pages-index-html-in-a-subfolder-of-the-repository)

- [JamesIves/github-pages-deploy-action | GitHub](https://github.com/JamesIves/github-pages-deploy-action)
  - https://img.shields.io (nice badges)
  - https://codecov.io
  - [codecov/codecov-action](https://github.com/codecov/codecov-action)
  - [github/codeql-action](https://github.com/github/codeql-action)