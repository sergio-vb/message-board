import React from 'react';

export default function ConnectedUsers(props){
	
	const usersList = props.users.map((user, index) => {
		return <li key={index}>{user}</li>;
	});

	return (
		<div className="usersList">
			<p>Connected Users:</p>
			<ul>{usersList}</ul>
		</div>
	);

}