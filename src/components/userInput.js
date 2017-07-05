import React from 'react';

const UserInput = (props) => {

	const onUsernameButtonClick = (event) => {console.log("Oh hai!!")}
	
	if (props.username === ""){
		return (
			<div>
				<p>Please enter your name:</p>
				<input type="text" placeholder="Enter your name here" />
				<button onClick={ onUsernameButtonClick } >Submit</button>
			</div>
		);
	}else{
		return (
			<div className="user-input">
				<p>Type in the input and press enter to send a message. Alternatively, send an SMS or MMS to (929) 265-5691 (US phone number) to deliver it to this chat.</p>
				<input className="form-control" type="text" placeholder="Enter a message..." onKeyUp={props.handleSubmit} />
			</div>
		);
	}



}

export default UserInput;