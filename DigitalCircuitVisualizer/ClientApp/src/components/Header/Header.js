import React, { useState } from 'react';
import {NavLink, Link} from 'react-router-dom';
import LineIcon from 'react-lineicons';
import './Header.css';

let Header = () => {
    let [navigationToggler, setNavigationToggler] = useState(false);

    let handleNavigationToggler = () =>{
        setNavigationToggler(!navigationToggler);
    }

    return (
        <nav className={navigationToggler ? "mi-header is-visible" : "mi-header"}>
            <button onClick={handleNavigationToggler} className="mi-header-toggler">
                {!navigationToggler ? <LineIcon name="menu" /> : <LineIcon name="close" />}
            </button>
            <div className="mi-header-inner">
                <div className="mi-header-image">
                    <Link to="/">
                        <img src="/images/logo.png" alt="Digital Circuit Visualizer" />
                    </Link>
                </div>
                <ul className="mi-header-menu">
                    <li>
                        <NavLink exact to="/">
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/visualization">
                            <span>Visualization</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">
                            <span>Contact</span>
                        </NavLink>
                    </li>
                </ul>
                <p className="mi-header-copyright">Developed by&nbsp;
                    <strong>
                        <a href="https://www.linkedin.com/in/aristeidis-vardakas/" rel="noopener noreferrer" target="_blank">Aristeidis Vardakas</a>
                    </strong>
                </p>
            </div>
        </nav>
    );
}

export default Header;