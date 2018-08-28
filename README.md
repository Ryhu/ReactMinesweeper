# ReactMinesweeper
Minesweeper in React

process:
first, create the containers:
board for the entire thing,
sizeInput for the input of height, width, Mines
Grid for actual clickable game board,
Tile for the clickable tiles

first up is the input, make the input send data to the Grid component


create basic tile, has size, background color, borders
next step is to add functionality, try to multiply tiles by grid data
before that, an array has to be generated.

to save processing power, the array will be generated before the render is done.
mines have to be put on the board, and then the numbers are added based on the mines.

for randomness, upon array creation, each square will have a  ((# of mines) / (board size)) chance of being a mine.
a counter will increment with the creation process.
at the end, if counter >  mines, then all mine squares will be gathered, put into an array, shuffled, and extra mines will be poped out of the mines array. those coordinates will then be changed to empties

if counter < mines, then all empties will be arrayed, shuffled, and excess will be popped out, and changed.

After the mine laying process, the array will be looped through and numbered based on surrounding mines.

Only after the array is done will it be rendered.

...vs brute force

make 1d array, height x width long. first x slots are mines, x =  # of mines. array is then shuffled and cut into 2x array
shuffle = fisher-yates

going with easier one atm, just for ...why not

once the array is done, putting it in the components isnt hard.

just did...react stuff, and I had the basic fully revealed board in an ugly coloring on the page.

next step is to cover it, which i can do one of two ways:
1: have a separate array to do visibility, an array of 1's and 0's -  easiest
2: do a double array of the original
3: double up and have everything in the first array contain 2 things, the value and 1/0, like "50"

i think im going to have 2 separate arrays to save time and sanity. readability over performance this time

visibilityGrid is installed, moving on to clickable functionality
clickable will change the visibility from 0 to 1, making it not-zero, and making it visible.

clicking a tile should trigger an event that targets that tile, pulls info, and use that info to change state. therefore, i'll put an id on every square for info to be pulled.

once the id is put on, the click action needs to be installed.
click action is pulled down from the parent grid into the child tile, and when tile is clicked,
the parent updates it's visibility grid in the state, and tile is shown.

after that, its on to the blank square explosions- blank squares trigger other adjacent
blank squares to reveal, chaining.

brute force is simple, write a fucntion for one sqaure to check it's adjacent, and call it recursively
problem is that there will be multiple false positives, squares that were already checked
solution...queue?
click first square, all valid adj goes into the queue, then if queue is not empty, queue gets popped, and that square
gets checked, all valid adj gets checked: is it in the queue? if yes, nothing, if no, goes into queue

or

copy the state into a variable so i dont have to deal with it, and do the brute force

or

queue solution, on each blank square, run the function and call function on all the valid children. instead of handling them, we'll just throw them all into an array, and then once all the functions are done and we have a massive array, just do a unique filter, and then flip all remaining

that last one sounds the most bug free, so im going with that one
on second thought, it sounds like a memory nightmare at higher scales
going back to bruteforce, sounds the simplest

bruteforce done, all adj blanks are revealed upon click, now to show adj numbers
