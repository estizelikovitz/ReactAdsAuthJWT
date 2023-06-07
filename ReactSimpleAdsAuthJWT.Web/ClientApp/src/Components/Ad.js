import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import getAxios from '../AuthAxios';
import { useAuthContext } from '../AuthContext';
import { format } from 'date-fns';




const Ad = ({ ad, deleteClick }) => {
    const { user } = useAuthContext();
    const { id } = user;

    const { description, phoneNumber, createdDate, userId} = ad;

    return (
        <>
            <div className="jumbotron">
                <h5>Listed on {format(new Date(createdDate), 'cccc MMMM Lo, yyyy')}</h5>
                <h5>Phone Number: {phoneNumber}</h5>
                <h3>Details:</h3>
                <p>{description}</p>
                {id==userId&&<button className="btn btn-danger" onClick={deleteClick}>Delete</button>}
            </div>
        </>
    )
}


export default Ad;