import React from 'react';

export default function ErrorMessage(props){
	
	return (
		<div className="alert alert-danger" role="alert">
		  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
		  <span className="sr-only">Error:</span>
		  {props.message}
		</div>
	);
}