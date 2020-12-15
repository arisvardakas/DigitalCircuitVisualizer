import React from 'react';

let Checkbox = props => (
    <div className={props.containerClass}>
        <input type={props.inputType} id={props.inputId} className={props.inputClass} onChange={props.changed} checked={props.checked} disabled={props.disabled} />
        <label htmlFor={props.inputId} className={props.labelClass}>{props.labelText}</label>
    </div>
);

export default Checkbox;