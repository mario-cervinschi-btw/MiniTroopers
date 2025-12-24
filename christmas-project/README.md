# Santa's Employee Management System

A JavaScript project for managing Santa's workshop employees - tracking who's been naughty or nice!

## Setup

Install node.js from Company Portal

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Other commands**
   ```bash
   npm run lint       # Check for errors
   npm run lint:fix   # Auto-fix errors
   npm run format     # Format code
   ```

## VS Code Setup

### 1. Install Extensions

- **ESLint** : https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- **Prettier - Code formatter** https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

### 2. Configure Settings

Open VS Code Settings (`Ctrl+,` or File > Preferences > Settings):

1. Search for **"Default Formatter"** → Select **"Prettier - Code formatter"**
2. Search for **"Format On Save"** → Enable it if u want (check the box)
3. Test if eslint works - declare a variable with var :)) 

**Config files:** The project includes `eslint.config.mjs` and `.prettierrc` in the root.

**Command line:** You can also run `npm run lint:fix` and `npm run format` directly in the terminal.

## HELPER COMMENTS

You'll find `// HELPER:` comments throughout the code to guide you. **Remove these before submitting** - they're just scaffolding. Find them all with `Ctrl+Shift+F` and search for "HELPER:".

## Project Structure

This is a **skeleton project** - you complete it! Follow this architecture:

```
src/
├── main.js                    # Entry point - call everything here
├── state/state.js             # Centralized state management
├── features/                  # Feature-specific logic
│   ├── employee-card/
│   ├── employee-list/
│   ├── filter-form/
│   ├── pagination/
│   ├── recently-viewed/
│   └── statistics/
└── helpers/                   # Reusable utility functions
```

### Guidelines

- **State**: Manage all data in `state.js` (employees, filters, pagination, etc.)
- **Features**: Implement logic in feature files, then import into `main.js`
- **Helpers**: Put reusable functions here (pure functions, no DOM manipulation)
- **Clean Code**: Follow https://github.com/ryanmcdermott/clean-code-javascript, eslint will warn you in some cases. Especially with constants ;)

## Requirements

### 1. Filter System
- Select dropdown: All / Naughty / Nice
- Search input: **Only trigger when 2+ characters** are typed
- Both filters work together
- Do a simple string search using [String methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### 2. Pagination
- Display **10 items per page**
- Show Previous/Next buttons and page numbers

### 3. Statistics
- Total employees count
- Naughty count
- Nice count

### 4. Recently Viewed
- Track last **5 employees** Santa views (clicks/expands)
- Show in accordion/collapsible section
- Most recent first, no duplicates

### 5. Design
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

We have Bootstrap Icons installed in the project: https://icons.getbootstrap.com/
Use icons from there, like https://icons.getbootstrap.com/icons/chevron-up/

Use the Arial font.

## Extra Mile (if you finish everything)
- Try changing the default Arial font with a nicer one from https://fonts.google.com/ try installing it in the project and set it up (not link).
- Update employees: Add edit functionality for an employee's fields.
- Add Delete functionality and button for an employee item.
- Advanced pagination: Implement patterns from:
  - [Atlassian Design System](https://atlassian.design/components/pagination/examples)
  - [Pagination Pattern](https://ui-patterns.com/patterns/Pagination)
- bonus points if you put a nice arrow also in the filter dropdown, the one from demo is ugly :(

## Clean Code

Read: https://github.com/ryanmcdermott/clean-code-javascript or/and Clean Code book from O'Reilly

## Tips

Use as much as you can VS Code's LSP features:
-  features like right click -> find all references or shift-alt-f12
- use the Rename feature - richt click -> rename or F2. This will do the changes in other files too
- use the Refactor feature - right click -> Refactor or ctrl-shift-r

Use the debugger:
- type "debugger;" in code
- https://developer.chrome.com/docs/devtools/javascript
- https://www.youtube.com/watch?v=H0XScE08hy8

Happy coding! 🎅 DOM DOM, să-nălțăm!
