// Higher Order Components

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info ist: {props.info}</p>
    </div>
)

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info, please don't share</p>}
            <WrappedComponent {...props }/>
                            {/* das ist gleich info="Geheime props ..."  */}
        </div>
    )
}; 

// requireAuthentication
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please login to see the info</p>}
       </div>
    )
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);


// ReactDOM.render(<AdminInfo isAdmin={true} info="Geheime Info aus den Props" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="Geheime Info aus den Props" />, document.getElementById('app'))