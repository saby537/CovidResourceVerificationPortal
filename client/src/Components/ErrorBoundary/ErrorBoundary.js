import React from 'react';
import { Component } from 'react';
import './ErrorBoundary.css';
class ErrorBoundary extends Component {
	constructor() {
		super();
		this.state = {
			hasErrored: false,
		};
	}

	static getDerivedStateFromError(Error) {
		return { hasErrored: true };
	}

	componentDidCatch(error, info) {
		console.log(error);
	}

	render() {
		if (this.state.hasErrored) {
			return (
				<div className="ErrorImageOverlay">
					<div className="ErrorImageContainer" />
					<h2>Something Went Wrong. Please refresh the page</h2>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
