# Practical 5: Uncontrolled Form & Submission (Unit 4)

## Aim
Develop a Login Form using an uncontrolled component. On submission, retrieve the entered username and password and display the submitted information.

## GitHub Repository
`https://github.com/mayuri2907/u4-prac5.git`

## Concepts Implemented
- **Uncontrolled Component**: Form inputs manage their internal state in the DOM instead of React state.
- **useRef() Hook**: Creates direct references to the DOM elements (`usernameRef`, `passwordRef`, `rememberRef`).
- **Data Retrieval on Submit**: Reads input values on form submission via `usernameRef.current.value` without causing continuous re-renders during user typing.

## How to Run Locally
```bash
npm install
npm run dev
```

## Push to GitHub
```bash
git remote add origin https://github.com/mayuri2907/u4-prac5.git
git branch -M main
git push -u origin main
```
