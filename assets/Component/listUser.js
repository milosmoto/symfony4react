import React from 'react';
import { Link } from 'react-router-dom';

class ListUser extends React.Component {
    constructor(){
        super();
        this.state = {
            isLoading: true,
            users: {}
        };
    }
    componentDidMount() {
        fetch('/api/users.json')
            .then((responseJson) => {
                //Promise untill is done return from API
                responseJson.json().then(json => ({
                    json: json,
                    status: responseJson.status
                })).then(response => {
                    console.log(response);
                    this.setState({
                        isLoading: false,
                        users: response.json,
                    });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    deleteUser(userId, key){
        fetch('/api/users/' + userId, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if(response.status === 204){
                let users = this.state.users;
                delete users[key];
                this.setState({
                    users: users
                })
            }
        });
    }
    render () {
        return (
            <div>
                <Link to="/">Home</Link>
                <br/>
                <Link to="/user/add">Add user</Link>
                <br/>

                { Object.keys(this.state.users).map(function(key){
                        return(
                            <p key={key}>{this.state.users[key].name} <a href="javascript:void(0)" onClick={() => this.deleteUser(this.state.users[key].id, key)}>Delete</a></p>
                        );
                    }.bind(this))
                }

            </div>
        );
    }
}

export default ListUser;