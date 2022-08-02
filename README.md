# ✅ todo-fe 
App to manage todos - solution to the exercise given after interview.

## ✨ Technologies used in this project
(links with take you to the appropriate files)
- [TypeScript](https://github.com/lesad/todo-fe/blob/master/tsconfig.json)
- React
  - functional [components](https://github.com/lesad/todo-fe/blob/master/src/components/TodoList/TodoItem.tsx)
  - another [example](https://github.com/lesad/todo-fe/blob/master/src/components/Header/AddTodo.tsx)
- Redux
  - [store](https://github.com/lesad/todo-fe/blob/master/src/redux/store.ts) created with Toolkit
  - API acces throught [RTK Query](https://github.com/lesad/todo-fe/blob/master/src/redux/apiSlice.ts)
  - optimistic updates 
- Vite
- TailwindCSS
- [Eslint](https://github.com/lesad/todo-fe/blob/master/.eslintrc.cjs) + 
  [Prettier](https://github.com/lesad/todo-fe/blob/master/.prettierrc.json)
- Fortawesome icons

## ▶️ How to start
1. Clone and start the [backend](https://github.com/morosystems/todo-be)
2. `npm install`
3. `npm run dev`
4. visit http://127.0.0.1:5173/

### 🔜 What can be improved
- styles, animations
- error handling throught
- batched updates are not optimistic _enough_ (`createEntityAdapter` might fix this)
