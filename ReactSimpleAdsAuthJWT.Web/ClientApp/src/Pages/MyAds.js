import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Ad from '../Components/Ad';
import getAxios from '../AuthAxios';
import { useAuthContext } from '../AuthContext';
import { produce } from 'immer';



const MyAds = (props) => {

    const { user } = useAuthContext();
    const { id, firstName, lastName } = user;
    const [ads, setAds] = useState([]);

    const getAds = async () => {
        const { data } = await getAxios().get(`/api/ads/getadsforuser`, id);
        setAds(data);
    }

    useEffect(() => {
        getAds();
    }, []);

    const deleteClick = async (ad) => {
        await getAxios().post(`/api/ads/deletead`, ad);
        await getAds();
    }


    return (
        <>
            <div>
                <br />
                <br />
                <br />
                <br />
                <div className="container">
                    <div style={{ marginTop: 20 }}>
                        <div className="row">
                            <div className="col-md-12">
                                <h1>Welcome {firstName} {lastName}!</h1>
                                <Link to="/addad">
                                    <button className="btn btn-primary btn-block">Add Ad</button>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <div class="row">
                                <div class="col-md-6 offset-md-3">

                                    {ads.map(ad => <Ad ad={ad}
                                        key={ad.id}
                                        deleteClick={() => deleteClick(ad)}
                                    />)}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default MyAds;