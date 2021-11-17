# Let's build a VS Code extension for automated refactorings

> aka _Let's build your first VS Code extension_

This repository contains the source code to follow along my workshop.

In this workshop, I'm teaching you to:

- Create a VS Code extension
- Use VS Code's API to read & write code
- Parse JS code into AST and back into JS code
- What we mean when we say "Refactoring"
- Transform the AST to refactor the code

## 🎤 I presented this workshop at

- [WeAreDevs JS Congress 2021](https://www.wearedevelopers.com/javascript-congress)
- [Node+JS Interactive 2019](https://www.youtube.com/watch?v=udNV7zPN1H8&list=PLaaTTW4ElDZgudTGGc24KYvq6uq_FFwh_&index=7)

## 💁‍♂️ How to use this repository?

### Pre-requisite

To run it locally, you need to:

- Have [node.js with npm](https://nodejs.org/en/download/) installed
- Have [VS Code]() installed
- Clone this repository
- In the repository folder, install dependencies with `npm install`

### Following along

Each meaningful step of the workshop is tagged for easy access.

To checkout to a specific tag, use `git checkout tag-name`. For instance `git checkout 1-yeoman` will put you at step 1, where we quickstart the code with Yeoman.

**ℹ️ For each step, a section will be added in this README, below, to explain what we did.**

Then, follow along the talk you are watching. You may checkout the different tags on your own, or implement it yourself from any checkpoint.

If you have changed the code and want to go back to a specific checkpoint, you can either:

- Stash your changes with `git stash`
- Create a git branch and commit your work

### Step 1: scaffold code with Yeoman

As instructed in [VS Code docs on creating your first extension](https://code.visualstudio.com/api/get-started/your-first-extension), you don't have to write the boilerplate code yourself.

Instead, you can use [Yeoman](https://yeoman.io/) to do the work for you!

```
# Install Yeoman globally to use its commands
npm install -g yo

# Install VS Code specific generator
npm install -g generator-code

# Scaffold a new VS Code extension
# Just answer its questions interactively
yo code
```

In this worskhop, I picked a "New Extension (TypeScript)" with webpack.

The resulting code is what I versioned here. It already contains a basic behavior: show the user an information message when triggered!

**Run `npm install` to install the new dependencies.**

I also recommend you **install the [TypeScript + Webpack Problem Matchers](https://marketplace.visualstudio.com/items?itemName=amodio.tsl-problem-matcher)** to debug the extension.

## Step 2: Read & write code

[VS Code API](https://code.visualstudio.com/api/references/contribution-points) allows us to read from and write to the active editor. It takes some practice to familiarize with the different components, so play around.

In this step, we defined our high-level extension logic:

```ts
const code = read();
const transformedCode = transform(code);
write(transformedCode);
```

That logic won't change. Now the goal is to implement each function!

We implemented `read()` and `write()` using VS Code API.

Finally, we exposed the command [through a keybinding](https://code.visualstudio.com/api/references/contribution-points#contributes.keybindings). We changed the `package.json` to do so.

ℹ️ Finding a keybinding that will fit everyone is really, really hard. That's fine, users can configure the shortcut themselves. But mention it in your extension's README.

## Step 3: Parse code into AST, transform, print AST into code

There are many libraries that can parse JavaScript code into AST. We are using [Babel.js](https://babeljs.io/) in this workshop.

Implementing the `transform()` method really has 3 steps:

1. Parse the code into AST
2. Traverse the AST, transform it
3. Print the AST into code again

[AST Explorer](https://astexplorer.net/) is very handy to visualize what the AST looks like for a specific code. Types also help. The rest will come with practice.

In this step, we implemented custom transformations of the code. When triggered, it will:

- Convert any `result` identifier into a `response` one
- Capitalize all identifiers

To achieve that, we typically mutate the AST nodes or replace them with new ones.

## Step 4: Implement "Introduce Guard Clauses" refactoring

Now that we can manipulate the code via the AST, we can implement automated refactorings that VS Code misses!

One example would be [Introduce Guard Clauses](https://refactoring.guru/fr/replace-nested-conditional-with-guard-clauses) that would replace nested IfStatements with early exits. This doesn't change the behavior of the code, but make it easier to reason about—and to maintain!

For instance, we would turn this code:

```js
function getPayAmount() {
  let result;

  if (isDead) {
    result = deadAmount();
  } else {
    if (isSeparated) {
      result = separatedAmount();
    } else {
      if (isRetired) {
        result = retiredAmount();
      } else {
        result = normalPayAmount();
      }
    }
  }

  return result;
}
```

Into this one, with a single keyboard shortcut:

```js
function getPayAmount() {
  if (isDead) {
    return deadAmount();
  }

  if (isSeparated) {
    return separatedAmount();
  }

  if (isRetired) {
    return retiredAmount();
  }

  return normalPayAmount();
}
```

#### Implementing changes… guided by tests!

To code faster, we will be adding automated tests strategically. Some parts of the code are harder to test. In particular, the `read()` and `write()` functions depend on VS Code API. To run these tests, you need to download VS Code automatically, launch an instance and run your tests scenarios inside.

The VS Code teams did a good job to help you get started with that. In fact, there already is a test suite that you can run with `npm test`.

But these tests will be slow and fragile. Ultimately, having a few of these will be great. For the rest, we want "isolated" tests with faster feedback. Also, in the case of this workshop, we tested `read()` and `write()` manually. Since we won't have to touch these functions anymore, we are good not writing tests for it here.

Turns out the `transform()` function takes a code string as an input, and outputs a code string.

We don't care _how_ the `transform()` method is implemented. You may be using babel, another parser, or RegExp, it doesn't matter. What matters is that the behavior is preserved!

Thus, we can write automated tests for this function.

Since mocha was already installed, we decided to:

- Not use the whole `npm test` that would launch a full-fledged VS Code to run tests
- Add a custom `npm run test-isolated` script to launch these super-fast tests on the `transform()` logic
- Write tests first to document the behavior we want to implement (what's the input code, what's the expected output)

We went for simplicity with the standard `assert` library and the already-installed `mocha` one.

#### Running the tests

To run the tests:

1. Open a terminal and run `npm run compile-tests` so the code get compiled to regular JS
2. In another terminal, run `npm run test-isolated` to launch these tests in watch mode

You may decide to go fancier with other libs to do a better error-reporting job, or to directly compile TS code so you don't have to run `compile-tests` on the side.

This was good enough for the workshop.

#### Wallaby.js

We also demonstrated how [Wallaby.js](https://wallabyjs.com/) can reduce the feedback loop, but that's out of scope (you don't need it to do the work).

Wallaby requires some configuration that is not versioned here:

```js
module.exports = function () {
  return {
    files: ["src/**/*.ts", "!src/**/*.test.ts"],

    tests: ["src/**/*.test.ts"],

    env: {
      type: "node",
    },
  };
};
```

## ❤️ You liked this workshop and want to build such a tool?

Come contribute to [my actual VS Code extension to automate JS & TS refactorings](https://github.com/nicoespeon/abracadabra).
