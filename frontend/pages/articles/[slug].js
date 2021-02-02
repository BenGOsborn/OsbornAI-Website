import React from 'react';
import fs from 'fs';

export default function Article(props) {
    return (
        <div>
            I am a {props.slug}!
        </div>
    );
};

