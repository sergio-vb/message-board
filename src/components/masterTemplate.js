import React from 'react';

export default function MasterTemplate(props){
	return (
		<div className="intro-header">
	        <div className="container intro-message">
				
				{props.children}
	        
	        </div>
	    </div>
	);
}