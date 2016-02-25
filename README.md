## Website Performance Optimization portfolio project

### The Challenge

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

### Part 1: Optimize PageSpeed Insights score for index.html

#### Objective
Achieve a PageSpeed score of 90 on Mobile and Desktop for index.html

#### Actions taken
1. Created a gulp build workflow to build a **dist** tree from the original **src**
 *gulp build* creates the **dist** tree
 *gulp* will use **browserSync** to run a local http server to assist with development
2. Used **gulp-htmlmin**, **gulp-cssnano**, **gulp-uglify** and **gulp-useref** to minify all html, css and javascript
3. Used **gulp-inline-css** to inline the css for the main *index.html* file
4. Used **gulp-responsive** to create resized and optimised images

The above changes result in a PageSpeed Insights score of **96/100 Mobile** and **97/100 Desktop**

The active **dist** site can be viewed at this [link](http://ritchmct.github.io/frontend-nanodegree-mobile-portfolio/dist/index.html)

### Part 2: Optimize Frames per Second in pizza.html

#### Objective
To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js.

#### Actions taken
1. Improved the speed at which pizzas are resized with the resize slider with the following changes in main.js:
 Changed *determineDx* function to *determineWidth* and made it return just the new percentage width required without doing any width queries.
 Changed the *changePizzaSizes* function to call *determineWidth*.
2. Improved the scroll speed by improving movement of the background pizzas:
 Changed *updatePositions* function so that the value of scrollTop is only queried once outside of the loop


