import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import getAxios from '../AuthAxios';
import { useAuthContext } from '../AuthContext';;



const Ad = ({ ad, deleteClick }) => {

    const { description, phonenumber, createdDate} = ad;

    return (
        <>
            <div class="jumbotron">
                <h5>Listed on {createdDate.ToLongDateString()}</h5>
                <h5>Phone Number: {phonenumber}</h5>
                <h3>Details:</h3>
                <p>{description}</p>
                    <button class="btn btn-danger" onClick={deleteClick}>Delete</button>
            </div>
        </>
    )
}


export default Ad;