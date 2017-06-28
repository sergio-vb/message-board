import React from 'react';

const UserInput = (props) => {
	
	return (
		<div>
			<p>Type in the input and press enter to send a message.</p>
			<input type="text" placeholder='Enter a message...' onKeyUp={props.handleSubmit} />
		</div>
	);

}

export default UserInput;