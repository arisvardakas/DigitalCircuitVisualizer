import React from 'react';
import './SectionTitle.css';

let SectionTitle = props => (
    <div className="mi-sectiontitle">
        <h2>{props.title}</h2>
        <span>{props.title}</span>
    </div>
);

export default SectionTitle;