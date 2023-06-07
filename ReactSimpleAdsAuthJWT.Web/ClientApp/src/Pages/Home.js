import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Ad from '../Components/Ad';
import getAxios from '../AuthAxios';
import { useAuthContext } from '../AuthContext';


const Home = (props) => {
    //const { user } = useAuthContext();
    //const { id } = user;
    const [ads, setAds] = useState([]);

    const getAds = async () => {
        const { data } = await getAxios().get(`/api/ads/getads`);
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
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        {ads.map(ad => <Ad ad={ad}
                            key={ad.id}
                            deleteClick={() => deleteClick(ad)}
                        />)}
                    </div>
                </div>
            </div>

        </>
    )
}
export default Home;