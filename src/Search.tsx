import React, { useEffect, useState } from 'react';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  // some field may be missing overriding required rule from interface defined above
  //const [todos, setTodos] =useState<Partial<Todo>[]>([])
  // Load from localStorage or fetch
  useEffect(() => {
    const storedTodos = localStorage.getItem('myTodos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
     // to simulate else block run
     
      
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then((res) => res.json())
        .then((data: Todo[]) => {
          localStorage.setItem('myTodos', JSON.stringify(data));
          setTodos(data);
        })
        .catch((error) => console.error('Fetch error:', error));
    }
  }, []);

  // Filter by search term
  const filteredTodos = todos.filter(todo =>
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

export default Todos;
