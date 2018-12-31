import React from 'react'
import classes from './Cockpit.css'

const cockpit = (props) => {
    const assignedClasses = []
    if (props.persons.length <= 2) {
      assignedClasses.push( classes.red );
    }
    if (props.persons.length <= 1) {
      assignedClasses.push( classes.bold );
    }

    let btnClass = ''
    if (props.showPersons) {
        btnClass = classes.Red
    }


    return(
        <div className={classes.Cockpit}>
            <h1>Face the fear. Build the future.</h1>
            <p className={assignedClasses.join(' ')}>The future is yours if you are bold enought to take it.</p>
            <button 
                className={btnClass} 
                onClick={props.clicked}>
                Toggle Person
            </button>
        </div>
    );
};

export default cockpit