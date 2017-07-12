import React from 'react';
import ErrorMessage from './ErrorMessage';

export default function UserInput(props){

	let error = null;
	if (props.usernameError){
		console.log("UserInput found userNameError");
		error = <ErrorMessage message="This username has already been taken, please choose a different one." />;
	}

	if (props.username === ""){
		return (
			<div className="user-input">
				<p>Please enter your name: (Hit enter key to submit)</p>
				<input className="form-control" type="text" placeholder="Enter your name here" onKeyUp={props.onUsernameSubmit}/>
				{error}
			</div>
		);
	}else{
		return (
			<div className="user-input">
				<p>Type in the input and press enter to send a message. Alternatively, send an SMS or MMS to (929) 265-5691 (US phone number) to deliver it to this chat.</p>
				<input className="form-control" type="text" placeholder="Enter a message..." onKeyUp={props.onMessageSubmit} />
			</div>
		);
	}



}


/*

<span className="input-group-btn">
	<button className="btn btn-default" onClick={ onUsernameButtonClick } >Submit</button>
</span>
*/