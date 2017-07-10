import React from 'react';

const onUsernameButtonClick = (event) => {console.log("Oh hai!!")}
	

export default function UserInput(props){

	if (props.username === ""){
		return (
			<div className="user-input">
				<p>Please enter your name:</p>
				<div className="input-group">
					<input className="form-control" type="text" placeholder="Enter your name here" />
					<span className="input-group-btn">
						<button className="btn btn-default" onClick={ onUsernameButtonClick } >Submit</button>
					</span>
				</div>
				<div className="alert alert-danger" role="alert">
				  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
				  <span className="sr-only">Error:</span>
				  This username has already been taken, please choose a different one.
				</div>
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