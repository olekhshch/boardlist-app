# Description

Pet project inspired by the Monday application. Helps with creating of customizable lists of items.

## Demonstration

Link to the project with prepared demonstration data:

To load prepared data choose "Demo" in the right top corner.

## Getting started

Each item (list element) is stored in a customizable group while groups can be sorted in individual boards depending on the purpose set by a user.

At the very beginning, the app creates initial board with one empty group.

### Boards

To create a new `board` you have to provide it's name in an input field in the sidebar and press Enter. A new board with initial empty group will be created.

To change the group's title and description you should set the group as active (by clicking on it in the sidebar list) and change those values in the header section of the active board (changes should be confirmed by pressing the Enter).

### Groups

To create a new group in the active board choose "New group" button in the header section. A new empty group will be created.

To change group's title click it, provide new (non-empty) value, and confirm your choice with Enter.

You can access group's manipulation menu by pressing three dots `…` icon on the left to the group's title (visible after hovering a mouse over the group). There you can:

- Collapse/expand a group
- Change a colour theme
- Move a group to a different board
- Create a new (empty) group with group's layout (Duplicate layout)
- Copy a group
- Delete a group

Each group is represented by a table with items. By default each group has one (main) column with the name of an item (can't be empty). Additional columns can be added to a group by clicking + icon in a last column of a table, and choosing a type of the new column from opened menu:

> All of the non-main inputs values in a table (text, number) are setting by changing their input value in the table - no need in confirmation of changes with Enter. Each column has it's own configuration menu which can be accessed by pressing the three dots `...` in the header cell of this column. Also, width of each column (except the very last one) can be changed using slider of the right side of each table header cell.

#### Text

Creates a column which takes a text as an input value. Pressing the "expand" button on the right side of the cell opens a small text area which helps with editing.

#### Number

A bit similar to a text column, however excepts numbers only as an input. If the column represents values in the same unit (e.g. km, g, s) it can be added using "Set parameters" option in the column editing menu. Also, if you plan on changing the value of the cell by a specific amount, you can set it in the same window as an increment (default value: 1). By pressing arrow icons on the right of a cell, the value of a cell will increase/decrease by a set increment.

#### Status

Creates a column where each cell can have an assigned status. By default there are 3 statuses available for each item (Done, In progress, Cancelled) - this list can be edited by clicking on any status cell and choosing "Edit" in the opened menu.

#### Link

Creates a cell which can store a link to a different page with a name set by a user.

#### Checkbox

Creates a cell with a checkbox which can represent different purposes (e.g. the item's status is Completed, item is available etc).

### Items

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
