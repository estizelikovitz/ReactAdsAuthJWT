import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Ad from '../Components/Ad';
import getAxios from '../AuthAxios';
import { useAuthContext } from '../AuthContext';
import { produce } from 'immer';



const MyAds = (props) => {

    const { user } = useAuthContext();
    const { id, name } = user;
    const [ads, setAds] = useState([]);

    const getAds = async () => {
        const { data } = await getAxios().get(`/api/ads/getadsforuser?id=${id}`);
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
                                <h1>Welcome {name}!</h1>
                                <div className="col-md-2">
                                    <Link to="/addad" className="btn btn-primary btn-block">
                                        Add Ad
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
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