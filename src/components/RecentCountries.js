import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import "../static/css/RecentCountries.css";
import { useDispatch, useSelector } from 'react-redux';
import { saveRecent, selectRecentsList } from '../features/recentsSlice';


const RecentCountries = ({ countries, recentCountryClick }) => {
    const [recentCountries, setRecentCountries] = useState([{}]);
    const recents = useSelector(selectRecentsList);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const getCountriesData = () => {
    //         recents.map(item => {
    //             fetch(`https://disease.sh/v3/covid-19/countries/${item}`)
    //                 .then(response => response.json())
    //                 .then(data => {
    //                     console.log(data.country)
    //                     // dispatch(saveRecent({"country": data.country, "countryCode": item}))
    //                     // setRecentCountries([...recentCountries, {"country": data.country, "countryCode": item}])
    //                 })
    //         })
    //     }
    //     getCountriesData()
        
    // },[])

    


    return (
        <div className="recentCountries">
            {
                recents.length > 0?
                <>
                
                    {
                        recents.map(item => (
                        <>
                            {
                                item.countryCode ?
                                    <Button value={item.countryCode} onClick={recentCountryClick}>{item.country}</Button>
                                :""
                            }
                                    
                        </>))
                    }
                </>
                :""
            }
        </div>
    )
}

export default RecentCountries
