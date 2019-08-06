# wooden-web

![License](https://img.shields.io/github/license/jpavon/react-scripts-ts.svg)
[![Build Status](https://travis-ci.com/WeirdMachine/wooden-web.svg?branch=master)](https://travis-ci.com/WeirdMachine/wooden-web)

This is my github pages project.

I will try some web frontend stuff here.

The name wooden-web comes from the first idea i had: building a webgl application which shows a forest. 

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## TicTacToe

To learn reactjs I started with this tutorial: [reactjs.org/tutorial](https://reactjs.org/tutorial/tutorial.html)

That's why you can still find the TicTacToe game inside my page.

The Tutorial came with some differences because i use typescript integration and linting. 

I was able to learn even more than the tutorial, because i was challenged with types in react from beginning on which
 helped me to understand the framework.
 
## WebGL

I want to try some WebGL with custom shader configurations.

As Scenario i choose a forest because i think there are a lot of things you can render inside.

Later I will use [Phong reflection model](https://en.wikipedia.org/wiki/Phong_reflection_model) in this shaders.

##Docker

`docker run --rm -ti -u="node" -w="/home/node/ww" -v %cd%:/home/node/ww -p 3000:3000 node /bin/bash`

Change %cd% with $(pwd) in Linux
