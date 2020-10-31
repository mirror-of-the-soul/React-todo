import React, { useEffect } from 'react'
import Todolist from './Todo/Todolist'
import Context from './context'
import Loader from './Loader'
import Modal from './Modal/Modal'

const AddTodo = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('./Todo/AddTodo'))
      }, 2000)
    })
)

function App() {
  //создадим массив todos для динамичности списка li
  //отобразим данный массив в компоненте Todolist, для этого в этом компоненте необходимо обохначить какие свойства нам необходмо принимать
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((response) => response.json())
      .then((todos) => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 2000)
      })
  }, [])
  // опишем свойства в компоненте Todolist c помощью придуманного названия свойства todos = {todos}, в качестве занчения указываем какой либо jsx,
  //в данном случае массив todos, после необходимо их принять в компоненте Todolist

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.complited = !todo.complited
        }
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    )
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>React tutorial</h1>
        <Modal />
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>
        {loading && <Loader />}
        {todos.length ? (
          <Todolist todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No ToDos!!!</p>
        )}
      </div>
    </Context.Provider>
  )
}

export default App
