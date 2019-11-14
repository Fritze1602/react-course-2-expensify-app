import React from 'react'

import {Link} from 'react-router-dom'

const NotFoundPage = () => (
    <div>
        <p>404 This Page can't be found</p>
       <Link to="/">Go Home</Link>
    </div>
);

export default NotFoundPage;
