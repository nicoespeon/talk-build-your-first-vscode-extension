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

- [DDD EU 2023](https://2023.dddeurope.com/program/lets-craft-automated-refactorings-ourselves/)
- [ConFoo 2022](https://confoo.ca/en/2022/session/let-s-build-your-own-vs-code-automated-refactorings)
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

## ❤️ You liked this workshop and want to build such a tool?

Come contribute to [my actual VS Code extension to automate JS & TS refactorings](https://github.com/nicoespeon/abracadabra).
