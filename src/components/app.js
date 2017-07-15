import React from 'react';
import io from 'socket.io-client';
//import io from 'socket.io/node_modules/socket.io-client';

import MasterTemplate from './masterTemplate';
import UserInput from './userInput';
import Messages from './messages';
import ConnectedUsers from './connectedUsers';


export default class App extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			messages: [],
			username: "",
			usernameError: false,
			connectedUsers: []
		};
	}

	componentDidMount(){
		this.socket = io('/');
		this.socket.on('message', message => {
			this.setState({
				messages: [message, ...this.state.messages]
			});
		});
		this.socket.on('connected_users_update', users => {
			this.setState({
				connectedUsers: users
			});
		});

	}

	render(){

		const showUsers = this.state.username !== "" ? <ConnectedUsers users={this.state.connectedUsers} /> : null;

		return (
			<MasterTemplate>
			
                <h1>Real Time Message Board</h1>
                
                <UserInput 
					username={this.state.username} 
					usernameError={this.state.usernameError}
					onMessageSubmit={this.onMessageSubmit}
					onUsernameSubmit={this.onUsernameSubmit} />

				<Messages messages={this.state.messages} />
				
				{showUsers}

			</MasterTemplate>
		);
	}

	onMessageSubmit = event => {
		const body = event.target.value;
		if (event.keyCode === 13 && body){
			//console.log("Message submitted:", body, "This:", this);
			const message = {
				body,
				from: this.state.username,
				isOwnMessage: true
			};
			this.setState({
				messages: [message, ...this.state.messages]
			});
			this.socket.emit('message', body);
			event.target.value = '';
		}
	}

	onUsernameSubmit = event => {
		
		const username = event.target.value;
		
		if (event.keyCode === 13 && username){
			
			//console.log("Username submitted:", username, "This:", this);
			this.socket.emit('new_user', username, (data) => {
				
				if (data.isValidUser){
					this.setState({
						username,
						usernameError: false
					});
				}else{
					this.setState({
						usernameError: true
					});
				}
			});
			event.target.value = '';
		}
	}

}