import React, { ChangeEvent, FC, useState } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Interfaces";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "task") {
      setTask(e.target.value);
    } else {
      setDeadline(Number(e.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );
  };

  return (
    <div className="App">
      <h1>To Do List</h1>
      <div className="header">
        <div className="inputContainer">
          <label htmlFor="deadline">Tarefa</label>
          <input
            className="inputTask"
            type="text"
            placeholder="Digite a tarefa..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            className="inputTime"
            id="deadline"
            type="number"
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
          <label htmlFor="deadline">Deadline (em dias)</label>
        </div>
        <button className="btnAdd" onClick={addTask}>
          Adicionar Tarefa
        </button>
      </div>

      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
