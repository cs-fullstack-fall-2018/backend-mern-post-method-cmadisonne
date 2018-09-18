import React, {Component} from 'react';
import './App.css';
import ToDoList from "./ToDoList";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            stringInfo: ''
        }
    }

    submitChange =(event) =>{
        fetch('/api/todo',
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        username: this.state.username,
                        todo: this.state.stringInfo,
                        isDone: 'false'
                    }
                    ),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(data => data.json());
        event.preventDefault();
    };

    InputOnChange = (event) => {
        this.setState({stringInfo: event.target.value})
    };

    UsernameOnChange = (event) => {
        this.setState({username: event.target.value})
    };

    deleteByID(id) {
        fetch('/api/todo',
            {
                method: "DELETE",
                body: JSON.stringify({"id": id}),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(data => data.json());
    };

    render() {
        fetch('/api/todos/mcoope')
            .then(data => data.json())
            .then(response => this.setState({data: response}));

        return (
            <div className="App">
                <form onSubmit={this.submitChange}>
                    <label>Username</label>
                    <input type="text" value={this.state.username} onChange={this.UsernameOnChange} placeholder="Enter Username"/>
                    <label> ToDo: </label>
                    <input type="text" value={this.state.stringInfo} onChange={this.InputOnChange} placeholder="Enter New Task"/>
                    <input type="submit" value="Submit"/>
                </form>

                <ToDoList arr={this.state.data}
                          deleteFunction={this.deleteByID}/>
            </div>
        );
    }
}

export default App;
