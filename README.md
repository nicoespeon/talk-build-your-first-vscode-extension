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

## ❤️ You liked this workshop and want to build such a tool?

Come contribute to [my actual VS Code extension to automate JS & TS refactorings](https://github.com/nicoespeon/abracadabra).
