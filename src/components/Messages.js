import React from 'react';

export default function Messages(props){

	const messages = props.messages.map( (message, index) => {
		const img = message.img ? <img src={message.img} width='200px' /> : null;
		return (
			<li key={index}>
				<p className={message.isOwnMessage ? "messageContainerOwn" : "messageContainer"}>
					<b>{message.from}:</b> {message.body} {img}
				</p>
			</li>
		);
	});

	return (
		<div>
			<h3>Messages:</h3>
			<ul className="messages">
				{messages}
			</ul>
		</div>
	);

}