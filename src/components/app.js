import React from 'react';
import io from 'socket.io-client';
//import io from 'socket.io/node_modules/socket.io-client';

import UserInput from './userInput';

export default class App extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			messages: [],
			username: "",
			usernameError: false
		};
	}

	componentDidMount(){
		this.socket = io('/');
		this.socket.on('message', message => {
			this.setState({
				messages: [message, ...this.state.messages]
			});
		});
	}

	render(){

		const messages = this.state.messages.map( (message, index) => {
			const img = message.img ? <img src={message.img} width='200px' /> : null;
			return <li key={index}><b>{message.from}:</b> {message.body} {img}</li>
		});

		return (

			<div className="intro-header">
		        <div className="container">

		            <div className="row">
		                <div className="col-lg-12">
		                    <div className="intro-message">
		                        <h1>Real Time Message Board</h1>
		                        
		                        <UserInput 
									username={this.state.username} 
									usernameError={this.state.usernameError}
									onMessageSubmit={this.onMessageSubmit}
									onUsernameSubmit={this.onUsernameSubmit} />

								
								<h3>Messages:</h3>
								<ul className="messages">
									{messages}
								</ul>
		                        
		                    </div>
		                </div>
		            </div>

		        </div>

		    </div>
			
		);
	}

	onMessageSubmit = event => {
		const body = event.target.value;
		if (event.keyCode === 13 && body){
			//console.log("Message submitted:", body, "This:", this);
			const message = {
				body,
				from: 'Me'
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
					console.log("Setting usernameError to true.");
					this.setState({
						usernameError: true
					});
				}
			});
			event.target.value = '';
		}
	}

}