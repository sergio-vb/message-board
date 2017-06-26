import React from 'react';
import ReactDom from 'react-dom';
//import io from 'socket.io-client';
import io from 'socket.io/node_modules/socket.io-client';

class App extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			messages: []
		}
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

		const messages = this.state.messages.map( (message, index) => 
			<li key={index}><b>{message.from}:</b>{message.body}</li>
		)
		return (
			<div>
				<h1>Hello, World!</h1>
				{messages}
				<input type="text" placeholder='Enter a message...' onKeyUp={this.handleSubmit} />
				<p>Test woof</p>
			</div>
		);
	}

	handleSubmit = event => {
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

}

ReactDom.render(<App />, document.getElementById('root'));