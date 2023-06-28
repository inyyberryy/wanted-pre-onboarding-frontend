import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTodos, updateTodo, deleteTodo, createTodo } from "../apis/todoAPI";

function App() {
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
    getTodos().then((result) => {
      setTodoList(result);
    });
  }, [todoList]);

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = async () => {
    await createTodo(newTodo);
    setNewTodo("");
  };

  return (
    <div className="App">
      <div>
        <input
          data-testid="new-todo-input"
          value={newTodo}
          onChange={handleNewTodoChange}
        />
        <button data-testid="new-todo-add-button" onClick={handleAddTodo} id="new-todo-add-button">
          추가
        </button>
      </div>
      {todoList.map((data) => (
        <div key={data.id}>
          <Todo data={data} />
        </div>
      ))}
    </div>
  );
}

function Todo({ data }) {
  const [modify, setModify] = useState(true);
  const [check, setCheck] = useState(data.isCompleted);
  const [inputM, setInputM] = useState("");

  const handleSubmitChange = async () => {
    data.todo = inputM;
    await updateTodo(data);
    setModify(true);
    setInputM("");
  };

  const handleDelete = async () => {
    await deleteTodo(data);
  };

  const handleNewInputMChange = (e) => {
    setInputM(e.target.value);
  };

  const handleCheckboxChange = async (e) => {
    setCheck(!check);
    data.isCompleted = !data.isCompleted;
    await updateTodo(data);
  };

  return (
    <div className="Todo">
      <li>
        <label>
          <input
            type="checkbox"
            checked={check}
            onChange={() => handleCheckboxChange()}
          />
          <span>{data.todo}</span>
        </label>
        {modify ? (
          <span className="ButtonGroup">
            <button
              data-testid="modify-button"
              onClick={() => setModify(!modify)}
            >
              수정
            </button>
            <button data-testid="delete-button" onClick={() => handleDelete()}>
              삭제
            </button>
          </span>
        ) : (
          <span className="ButtonGroup">
            <input
              data-testid="modify-input"
              value={inputM}
              onChange={handleNewInputMChange}
            />
            <button
              data-testid="submit-button"
              onClick={() => handleSubmitChange()}
            >
              제출
            </button>
            <button
              data-testid="cancel-button"
              onClick={() => setModify(!modify)}
            >
              취소
            </button>
          </span>
        )}
      </li>
    </div>
  );
}

export default App;
