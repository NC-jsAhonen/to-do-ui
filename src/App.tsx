import "./App.css";
import { ToDoItemProps } from "./components/ToDoItem";
import { ToDoItemList } from "./components/ToDoItemList";

function App() {
  const items: ToDoItemProps[] = [{ text: "Morjens Mualima!" }];
  return (
    <>
      <h1>To Do App</h1>
      <ToDoItemList items={items} />
    </>
  );
}

export default App;
