<p align="center">
  <a href="https://linkedin.com/in/damien-toomey">
    <img
      alt="Memory"
      src="images/logo/logo.png"
      width="300px"
    />
  </a>
</p>

<p align="center">
      <a href="https://sonarcloud.io/dashboard?id=DamienToomey_memory2">
        <img src="https://sonarcloud.io/api/project_badges/measure?project=DamienToomey_memory2&metric=bugs">
      </a>
      <a href="https://sonarcloud.io/dashboard?id=DamienToomey_memory2">
        <img src="https://sonarcloud.io/api/project_badges/measure?project=DamienToomey_memory2&metric=code_smells">
      </a>
      <a href="https://sonarcloud.io/dashboard?id=DamienToomey_memory2">
        <img src="https://sonarcloud.io/api/project_badges/measure?project=DamienToomey_memory2&metric=coverage">
      </a>
</p>

<p align="center">
      <a href="https://sonarcloud.io/dashboard?id=DamienToomey_memory2">
        <img src="https://sonarcloud.io/api/project_badges/measure?project=DamienToomey_memory2&metric=duplicated_lines_density">
      </a>
      <a href="https://sonarcloud.io/dashboard?id=DamienToomey_memory2">
        <img src="https://sonarcloud.io/api/project_badges/measure?project=DamienToomey_memory2&metric=ncloc">
      </a>
      <a href="https://sonarcloud.io/dashboard?id=DamienToomey_memory2">
        <img src="https://sonarcloud.io/api/project_badges/measure?project=DamienToomey_memory2&metric=sqale_rating">
      </a>
</p>

<p align="center">
      <a href="https://sonarcloud.io/dashboard?id=DamienToomey_memory2">
        <img src="https://sonarcloud.io/api/project_badges/measure?project=DamienToomey_memory2&metric=alert_status">
      </a>
      <a href="https://sonarcloud.io/dashboard?id=DamienToomey_memory2">
        <img src="https://sonarcloud.io/api/project_badges/measure?project=DamienToomey_memory2&metric=reliability_rating">
      </a>
      <a href="https://github.com/DamienToomey/memory/actions">
        <img src="https://github.com/DamienToomey/memory/workflows/CI/badge.svg">
      </a>
</p>

This app is based on an Openclassrooms:
  - Course: [Réalisez une application web avec React.js](https://openclassrooms.com/fr/courses/4664381-realisez-une-application-web-avec-react-js/4664801-demarrez-facilement-avec-create-react-app)
  - GitHub: [Memory game](https://github.com/deliciousinsights/ocr-memory)

This app uses [React](https://reactjs.org) and was created with [Create React App](https://reactjs.org/docs/create-a-new-react-app.html).

#### App

https://damientoomey.github.io/memory/app

#### Documentation

https://damientoomey.github.io/memory/docs

#### Coverage Report

https://damientoomey.github.io/memory/coverage/lcov-report



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
$ sudo npm install --global create-react-app
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

- Runtime type checking for React props and similar objects

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
    - Case1: If the previous snapshot is correct then we have just caught a regression in the code
    - Case2: If the new snapshot is correct then we can overwrite the previous snapshot

```
$ sudo npm install --save-dev chai-jest-snapshot enzyme-to-json
```

**WARNING**: the initial snapshot must be correct, otherwise we will be comparing future snapshots with an initial erroneous snapshot, thus not truly knowing which snapshot is correct.

**WARNING**: care must be taken when deciding which version of the snapshot is correct. This manual step can lead to adding a regression to the code.

I decide not to use snapshots in this project as I am using a CI pipeline to automatically run tests and evaluate code quality and snapshot updates are not automatic.

#### Run tests

```
$ sudo npm test -- --verbose
# --verbose: print console.log
```

#### Run tests on a single file

```
$ sudo npm test App.test.js -- --verbose
```

#### Run tests and generate a test coverage report

```
$ sudo npm test -- --coverage --watchAll --verbose
# --watchAll: rerun all tests, not just tests related to modified files
```

### V. [ESLint](https://www.npmjs.com/package/eslint) (Javascript linter)

(code quality)

#### Setting up ESLint in React

- References:
  - [ESLint](https://www.npmjs.com/package/eslint)
  - [Setting up ESLint in React](https://medium.com/@RossWhitehouse/setting-up-eslint-in-react-c20015ef35f7)

```
$ sudo npm install --save-dev eslint
```

You should then set up a configuration file:

```
$ ./node_modules/.bin/eslint --init
```

| Question | Answer |
|:---:|:---:|
| How would you like to use ESLint? | To check syntax, find problems, and enforce code style |
| What type of modules does your project use? | JavaScript modules (import/export) |
|  Which framework does your project use? | React |
| Does your project use TypeScript? | No |
| Where does your code run? | Browser |
| How would you like to define a style for your project? | Use a popular style guide |
| Which style guide do you want to follow? | Airbnb: https://github.com/airbnb/javascript |
| What format do you want your config file to be in? | JSON |
| Would you like to install them now with npm? | Yes |

The file `.eslintrc.json` has been created.

After that, you can run ESLint on any file or directory like this:

```
$ ./node_modules/.bin/eslint src/HighScoreInput.js
```

#### Adding ESLint script in `package.json` to run linter

```
"scripts": {
    "lint:js": "eslint"
}
```

#### Running ESLint on a single file

```
$ sudo npm run lint:js src/HighScoreInput.js
```

#### Running ESLint on all files

```
$ sudo npm run lint:js src/*.js src/tests/**/*.js 
# src/*.js: .js files in src 
# src/**/*.js: .js files in src subfolders
```

#### Generating ESLint HTML report

```
$ sudo npm run lint:js src/*.js src/tests/**/*.js  -- -f html -o js_lint_report.html
```

#### Troubleshooting

##### `Failed at the memory@0.1.0 lint script.`

- Reference: [Running eslint as an npm script results in ELIFECYCLE error.](https://github.com/eslint/eslint/issues/2409)

"I tried your scenario and what happens is that when eslint run ends with a exit code of 1 (that means you have eslint error(s) in your code) and then when npm tackles that error code then it throws an error because internal task returned an exit code 1.

It will for sure run fine if you don't have any eslint errors.

So to answer your questions, Yes its behaving as expected."

If you really want to remove the npm error, do:
- `eslint; exit 0` in `package.json`
or
- `npm run lint:js -s`

**WARNING**: when building the app with `npm run build`, this also runs the linter when the file `.eslintrc.json` exists.

Setting `npm run build` or `CI=false npm run build` does not turn off the linter when `.eslintrc.json` exists. (whereas according to the [Create React App Documentation](https://create-react-app.dev/docs/running-tests#continuous-integration), "When creating a build of your application with npm run build linter warnings are not checked by default [...]" so `CI=false` should work but it does not)

This means that the linter will fail the build job in the CI pipeline if there are any linter related errors.

#### Fix ESLint related errors

```
$ sudo npm run lint:js src/*.js src/tests/**/*.js -- --fix
```

This will fix linting errors that can be automatically fixed. You might have to fix other errors manually.

---

##### `error 'expect' is not defined` or `error 'it' is not defined`

Add the following code in `eslintrc.json`:

```
"env": {
    "jasmine": true
}
```

---

##### `error  Parsing error: Unexpected token =`

- Reference: [ESLint Parsing error: Unexpected token | Stack Overflow](https://stackoverflow.com/questions/36001552/eslint-parsing-error-unexpected-token)

```
$ sudo npm install --save-dev babel-eslint 
```

Add the following code in `.eslintrc`:

```
"parser": "babel-eslint"
```

---

##### `error Missing semicolon`

- References:
  - [allow semi colons in javascript eslint | Stack Overflow](https://stackoverflow.com/questions/40453894/allow-semi-colons-in-javascript-eslint)
  - [ESLint Documentation](https://eslint.org/docs/rules/semi#options)

Add the following rule in `.eslintrc`:

```
"rules": {
    "semi": ["error", "never"]
}
```

---

##### `error Expected indentation of 2 spaces but found 4`

- Reference: [Eslint AirBNB with 4 spaces for indent](https://stackoverflow.com/questions/48902050/eslint-airbnb-with-4-spaces-for-indent)

Change default indent value of 2 from AirBnB rules with a value of 4.

Add the following rules in `.eslintrc`:

```
"rules": {
  // Indent with 4 spaces
  "indent": ["error", 4],
  // Indent JSX with 4 spaces
  "react/jsx-indent": ["error", 4],
  // Indent props with 4 spaces
  "react/jsx-indent-props": ["error", 4]
}
```

---

##### `error 'sinon-chai' should be listed in the project's dependencies, not devDependencies`

Add the following rule in `.eslintrc` to allow devDependencies to be used by test files only:

```
"rules": {
  "import/no-extraneous-dependencies": ["error", { "devDependencies": ["src/*.test.*", "src/**/*.test.*", "src/setupTests.js"] }
}
```

### VI. [stylelint](https://www.npmjs.com/package/stylelint) (CSS linter)

- Reference: [stylelint/docs/user-guide/get-started.md](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/get-started.md)

#### Setting up stylelint

```
$ sudo npm install --save-dev stylelint stylelint-config-standard
```

#### Create a `.stylelintrc.json` configuration file in the root of your project:

```
{
  "extends": "stylelint-config-standard"
}
```

#### Adding stylelint script in `package.json` to run linter on CSS

```
"scripts": {
    "lint:css": "npx stylelint"
}
```

#### Run stylelint on, for example, all the CSS files in your project:

```
$ sudo npm run lint:css src/*.css public/*.css
```

#### Fix stylelint related errors

```
$ sudo npm run lint:css src/*.css public/*.css -- --fix
```

#### Generating stylelint HTML report

```
sudo npm run lint:css src/*.css public/*.css -- -o css_lint_report.html
# WARNING: generates report only if there are linting errors
```

### VII. [HTMLHint](https://github.com/htmlhint/HTMLHint)
- Reference: [stylelint/docs/user-guide/get-started.md](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/get-started.md)

#### Setting up HTMLHint

```
$ sudo npm install htmlhint --save-dev
```

#### Adding HTMLHint script in `package.json` to run linter on CSS

```
"scripts": {
    "lint:html": "htmlhint"
}
```

#### Run HTMLHint on, for example, all the CSS files in your project:

```
$ sudo npm run lint:html src/*.html public/*.html
```

### VIII. SonarCloud

(code quality)

#### Setup SonarCloud project

- Go to https://sonarcloud.io
- Sign in
- Create SonarCloud project
- Import GitHub project
- Follow instructions
- Create file `sonar-project.properties`

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

#### Modify the quality gate on [SonarCloud](sonarcloud.io)

- Go to https://sonarcloud.io/dashboard?id=DamienToomey_memory2
- Click on the url under the label `Quality Gate`

### IX. Documentation

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
    "docs": "jsdoc -c jsdoc.conf.json"
}
```

#### Generate documentation

```
$ sudo npm run docs
```
 
### X. Docker deployment (with static server)

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

### XI. Deployment (without any server)

- References:
  - [Stack Overflow | Run React application without server](https://stackoverflow.com/questions/40342100/run-react-application-without-server)
  - [Create React App Documentation | Deployment](https://create-react-app.dev/docs/deployment)

(not used in this repository but interesting for future projects)

### XII. Deployment on GitHub Pages

- Reference: [Create React App Documentation | Deployment](https://create-react-app.dev/docs/deployment/#github-pages)

**WARNING**: follow the steps bellow to create empty `gh-pages` branch where HTML/CSS/JS content will be stored and deployed to GitHub Pages. This manual step is only necessary for the first time you deploy to GitHub Pages.

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

This repository uses GitHub Actions for CI/CD purposes (see `.github/workflows/github-ci.yml`). In the `deploy` job of the pipeline, `build`, `coverage`, `docs` folders (generated in previous jobs) are pushed to the branch `gh-pages`.

**WARNING**: the content on the branch `gh-pages` will be available on GitHub Pages only after:
- Step1: configuring GitHub Pages (as described above)
- Step2: pushing HTML/CSS/JS content to the branch `gh-pages`

Step1 and Step2 must be done in this order.

In our case, HTML/CSS/JS content is pushed to the branch `gh-pages` in our CI pipeline by doing:

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

#### Troubleshooting

- I get a 404 error when going on at least one of the links above.

Try adding `/index.html` at the end of the link. If you can now access the webpage, enter the following commands to trigger a GitHub Pages rebuild.

```
git commit -m 'rebuild pages' --allow-empty
git push origin gh-pages
```

- Reference:
  - [How to force GitHub Pages build?](https://stackoverflow.com/questions/24098792/how-to-force-github-pages-build/61706020#61706020)
    - "It's not currently possible to manually trigger a rebuild, without pushing a commit to the appropriate branch."

### XIII. General Information

- The Dockerfile was created for educational purposes as I have not pushed an image for this app on any registry

- `.gitlab-ci.yml` is also for educational purposes as I started this app on GitLab and finally decided to migrate to GitHub to use GitHub Actions instead of GitLab CI.
  - FYI:`.gitlab-ci.yml` and `.github/workflows/github-ci.yml` do not exaclty match as I had not reached the deployment step when working with GitLab CI

### XIV. References

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

- [Setting up a CI/CD workflow on GitHub Actions for a React App (with GitHub Pages and Codecov)](https://dev.to/dyarleniber/setting-up-a-ci-cd-workflow-on-github-actions-for-a-react-app-with-github-pages-and-codecov-4hnp)

- [What is Codecov score and how it is measured?](https://stackoverflow.com/questions/38281319/what-is-codecov-score-and-how-it-is-measured)

- [codeclimate](https://codeclimate.com)

- [Setting up ESLint in React](https://medium.com/@RossWhitehouse/setting-up-eslint-in-react-c20015ef35f7)

### XV. Known issues

#### Keypress event is not fired in `Card.test.js` when testing Enter and Tab keypresses with Enzyme

Most likely lead: `enzyme-adapter-react-16` and `react 17` are not compatible so I cannot use `mount`.

```
const wrapper = mount(<App />)
wrapper.find('Card').at(0).simulate('keypress', {key: 'Enter'})
```

- [How do you simulate an keyDown enter event (or others) in Enzyme?](https://stackoverflow.com/questions/38960832/how-do-you-simulate-an-keydown-enter-event-or-others-in-enzyme)
- [.simulate(event[, mock]) => Self](https://github.com/enzymejs/enzyme/blob/master/docs/api/ReactWrapper/simulate.md)
- [Mount does not work in enzyme with next js](https://stackoverflow.com/questions/64586111/mount-does-not-work-in-enzyme-with-next-js)
- [ wojtekmaj/enzyme-adapter-react-17 ](https://github.com/wojtekmaj/enzyme-adapter-react-17)

This makes the test of the tab key event impossible to test the change of focus on another card.

#### Emojis are displayed as empty boxes

- [Emojis don't display on Google Chrome in Windows](https://github.com/twitter/twemoji/issues/205)

If the following emoji 😀 is not displayed as a smiley face then your browser does not display emojis properly.

Solution: use svg images of emojis given on [twitter/twemoji](https://github.com/twitter/twemoji/tree/gh-pages) instead of using a list of emoji characters in `App.js` (`SYMBOLS` constant).