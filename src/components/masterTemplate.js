import React from 'react';

export default function MasterTemplate(props){
	return (
		<div className="intro-header">
	        <div className="container">

	            <div className="row">
	                <div className="col-lg-12 column">
	                    <div className="intro-message">

	                    	{props.children}

	                    </div>
	                </div>
	            </div>

	        </div>

	    </div>
	);
}