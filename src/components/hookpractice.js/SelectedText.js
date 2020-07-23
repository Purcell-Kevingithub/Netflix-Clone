import React from 'react';

const SelectedText = (props) => {
    return (
        <div>
            {props.cat}
            <br/>
            {props.dog}
        </div>
    );
}

export default SelectedText;