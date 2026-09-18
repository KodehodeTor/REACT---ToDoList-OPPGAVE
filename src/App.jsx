import ToDoList from "./components/ToDoList.jsx";
import Header from "./components/Header.jsx";
import DarkModeToggle from "./components/ThemeSwitch.jsx";

function App() {
  return (
    <>
      <DarkModeToggle />
      <Header />
      <ToDoList />
    </>
  );
}

export default App;
