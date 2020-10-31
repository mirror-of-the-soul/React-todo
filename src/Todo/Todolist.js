import React from 'react'
import Todoitem from './Todoitem'
import PropTypes from 'prop-types'

const styles = {
  ul: {
    //camelCase так описываются  стли в JS в css было бы list-style
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
}
//принимаем элементы массива в функцию, для этого указываем в (props)
function Todolist(props) {
  //для вывода множества компонентов реализуем цикл
  return (
    <ul style={styles.ul}>
      {props.todos.map((todo, index) => {
        return (
          <Todoitem
            todo={todo}
            key={todo.id}
            index={index}
            onChange={props.onToggle}
          />
        )
      })}
    </ul>
  )
}

Todolist.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default Todolist
