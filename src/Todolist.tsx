import React, { useEffect, useState } from 'react';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  storageKey: string;
  dataSource: string;
}

const TodoList: React.FC<TodoListProps> = ({ storageKey, dataSource }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem(storageKey);

    if (storedTodos) {
      try {
        const parsed = JSON.parse(storedTodos);
        if (
          Array.isArray(parsed) &&
          parsed.every(
            (todo) =>
              typeof todo === 'object' &&
              todo !== null &&
              typeof todo.id === 'number' &&
              typeof todo.userId === 'number' &&
              typeof todo.title === 'string' &&
              typeof todo.completed === 'boolean'
          )
        ) {
          setTodos(parsed);
          return;
        }
      } catch (err) {
        console.error('Error parsing localStorage data:', err);
      }
    }

    // Fallback fetch if no valid local data
    fetch(dataSource)
      .then((res) => res.json())
      .then((data: Todo[]) => {
        localStorage.setItem(storageKey, JSON.stringify(data));
        setTodos(data);
      })
      .catch((error) => console.error('Fetch error:', error));
  }, [storageKey, dataSource]);

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Todos</h2>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;