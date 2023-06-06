import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { Link, useHistory } from 'react-router-dom';
import getAxios from '../AuthAxios';


const AddBookmark = () => {
    const [ad, setAd] = useState({ description: '', phonenumber: '' });
    const history = useHistory();
    const onTextChange = (e) => {
        const newAd = { ...ad };
        newAd[e.target.name] = e.target.value;
        setAd(newAd);
    }

    const onSubmitClick = async (e) => {
        e.preventDefault();
        await getAxios().post('/api/ad/addad', ad);
        history.push('/myads');

    }

    const { phonenumber, description } = ad;

    return (

        <>
            <div >
                <br />
                <br />
                <br />
                <br />
                <div className="row" >
                    <div className="col-md-6 offset-md-3 card card-body bg-light">
                    <h3>New Ad</h3>
                        <form onSubmit={onSubmitClick}>
                            <input type="text" value={phonenumber} name="phonenumber" placeholder="Phone Number" className="form-control" onChange={onTextChange}/>
                        <br />
                            <textarea type="text" value={description} name="description" rows="10" placeholder="Description" className="form-control" onChange={onTextChange}/>
                        <br />
                        <button className="btn btn-primary" >Submit</button>
                        </form>
                       
                </div>
                </div>
                </div>
        </>
    )
}
export default AddBookmark;