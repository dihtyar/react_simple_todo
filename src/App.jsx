import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import Header from './components/Header';
import Todo from './components/Todo';
import Form from './components/Form';


class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            todos: this.props.initialData
        };

        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    nextId(){
        this._nextId = this._nextId || 4;
        return this._nextId++
    }

    handleStatusChange(id) {
        let todos = this.state.todos.map(todo =>{
           if(todo.id === id){
               todo.completed = !todo.completed;
           }
           return todo;
        });
        this.setState({todos});
    }

    handleDelete(id){
        let todos = this.state.todos.filter(todo => todo.id !== id);
        this.setState({todos});
    }

    handleAdd(title){
        let todo ={
            id: this.nextId(),
            title,
            completed: false
        };
        let todos = [...this.state.todos, todo];
        this.setState({todos});
    }

    handleEdit(id, title){

        let todos = this.state.todos.map(todo => {
            if(todo.id === id){
                todo.title = title;
            }
            return todo;
        });

        this.setState({todos});

    }

    render(){
        return (
            <main>
                <Header title={this.props.title} todos={this.state.todos}/>
                <CSSTransitionGroup
                    component="section"
                    className="todo-list"
                    transitionName="slide"
                    // transitionEnter={false}
                    // transitionLeave={false}
                    transitionApper={true}
                    transitionApperTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {this.state.todos.map(todo =>
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                            onStatusChange={this.handleStatusChange}
                            onDelete={this.handleDelete}
                            onEdit={this.handleEdit}
                        />
                    )}
                </CSSTransitionGroup>
                <Form onAdd={this.handleAdd}/>
            </main>
        );
    }
}

App.propTypes = {
    title: PropTypes.string,
    initialData: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    })).isRequired
};

App.defaultProps ={
    title: 'React Todo'
};


export default App;

