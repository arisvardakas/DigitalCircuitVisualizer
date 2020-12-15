import React from 'react';

let Select = props => {
    let options = props.options.map(option => {
        if (option === "None") {
            return <option key="None" value="">None</option>;
        }
        return <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>;
    });

    return (
        <div className={props.containerClass}>
            <label htmlFor={props.selectId}>{props.labelText}</label>
            <select id={props.selectId} className={props.inputClass} onChange={props.changed} disabled={props.disabled}>{options}</select>
        </div>
    );
}

export default Select;