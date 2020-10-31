import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Context from '../context'

//стилизуем элементы по ключам инлайн стилями
const styles = {
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.5rem 1rem',
    border: '2px solid #ccc',
    borderRadius: '5px',
    marginBottom: '.5rem',
    background: '#41ecdc',
  },
  input: {
    marginRight: '15px',
  },
}

function TodoItem({ todo, index, onChange }) {
  const { removeTodo } = useContext(Context)
  const classes = []

  if (todo.complited) {
    classes.push('done')
  }

  return (
    <li style={styles.li}>
      <span className={classes.join(' ')}>
        <input
          type="checkbox"
          style={styles.input}
          onChange={() => onChange(todo.id)}
          checked={todo.complited}
        />
        <strong>{index + 1}</strong>
        &nbsp;
        {todo.title}
      </span>
      {/*onClick={removeTodo.bind(null, todo.id)} данный код можно так же описать при помози call back функции - () => removeTodo(todo.id) */}
      <button className="rm" onClick={removeTodo.bind(null, todo.id)}>
        &times;
      </button>
    </li>
  )
  //&times; - отображает крестик
}
//todo: PropTypes.object.isRequired массив типа объект, isRequired - необходим для работы этого компонента
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}

export default TodoItem
