import React from 'react';
import { Link } from 'react-router-dom';

class AddUser extends React.Component {
    saveUser () {
        console.log(this.nameInput.value);
        fetch('/api/users', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.nameInput.value,
            }),
        });
    };

    render () {
        return (
            <div>
                <Link to="/">Home</Link>
                    <br/>
                <Link to="/user/list">List users</Link>
                    <br/>

                <input type="text" ref={el => this.nameInput = el} name="name"/>
                <button onClick={() => this.saveUser()}>Add</button>
            </div>
        );
    }
}

export default AddUser;