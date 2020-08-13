import React from 'react';
import ReactDOM from 'react-dom';

export default function Error(props){
	return <p className={"error"}>{props.message}</p>
}