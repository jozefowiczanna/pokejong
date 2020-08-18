import React from 'react'

export default function Layout(props) {
    return (
        <div className="container" {...props}>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}
