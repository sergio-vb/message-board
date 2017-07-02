import React from 'react';

const UserInput = (props) => {

	/*if (props.username === ""){
		return (
			<div>
				<p>Please enter your name:</p>
				<input type="text" placeholder="Enter your name here"/>
				<button onClick={onUsernameButtonClick} >Submit</button>
			</div>
		);
	}else{*/
		return (
			<div className="user-input">
				<p>Type in the input and press enter to send a message.</p>
				<input className="form-control" type="text" placeholder="Enter a message..." onKeyUp={props.handleSubmit} />
			</div>
		);
	//}

	const onUsernameButtonClick = (event) => {
		console.log("Test button click");
	}


}

export default UserInput;