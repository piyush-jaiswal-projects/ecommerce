import React from 'react'
import ErrorComponent from './errorComponent';

class ErrorBoundary extends React.Component{
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error) {
        console.log(error);
    }

    render() {
        if (this.state.hasError) {
            return <ErrorComponent />
        }
        return this.props.children;
    }
}

export default ErrorBoundary