import React from 'react';
import BackgroundLines from '../BackgroundLines/BackgroundLines';
import Header from '../Header/Header';

let Layout = props => (
    <div className="mi-wrapper">
        <BackgroundLines />
        <Header />
        {props.children}
    </div>
);

export default Layout;