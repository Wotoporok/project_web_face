import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const load = async () => {
    const res = await fetch(`${API}/todos`);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    await fetch(`${API}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: text })
    });
    setText("");
    load();
  };

  const remove = async (id) => {
    await fetch(`${API}/todos/${id}`, {
      method: "DELETE"
    });
    load();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App</h1>

      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={add}>Add</button>

      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.title}
            <button onClick={() => remove(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}