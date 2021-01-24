import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Logo.module.css';

const logo = (props) => (
    <Link style={{textDecoration: 'none'}} to='/'>
    <div className={classes.Logo}>
        HI
    </div>
    </Link>
);

export default logo;