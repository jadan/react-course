// HOC (Higher-order component)
// Component that renders another component
// 1. Reuses code.
// 2. Abstract state.
// 3. Render hijacking.

import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
  <div>
    <h1> Info </h1>
    <p> The info is: {props.info} </p>
  </div>
);

// const withAdminWarning = WrappedComponent => props => (
//   <div>
//     {props.isAdmin && <p>This is private info please don&apos;t share!</p>}
//     <WrappedComponent {...props} />
//   </div>
// );

// const AdminInfo = withAdminWarning(Info);


// requireAuthentication
const requireAuthentication = WrappedComponent => props => (
  <div>
    {props.isAuthenticated ?
      <WrappedComponent {...props} /> :
      <p>You need to be authenticated.</p>}
  </div>
);

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={false} info="These are the details" />, document.getElementById('app'));
