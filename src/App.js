import './static/css/App.css';
import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import { sortData, prettyPrintStat } from './util';
import LineGraph from './components/LineGraph';
import "leaflet/dist/leaflet.css";
import RecentCountries from './components/RecentCountries';
import { useDispatch, useSelector } from 'react-redux';
import { saveRecent, selectRecentsList } from './features/recentsSlice';
import { clearVaccinationData, selectVaccinationData, setVaccinationData } from './features/vaccinationsSlice';
import VaccineInfoBox from './components/VaccineInfoBox';



// API CALL LOC
// https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState([])
  const [Country, setCountry] = useState("Worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState("cases")
  // const [recentCountries, setRecentCountries] = useState([])
  const dispatch = useDispatch();
  const recents = useSelector(selectRecentsList);
  const vaccinations = useSelector(selectVaccinationData);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
      })
  },[])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country, k) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ))
          const sortedData = sortData(data)
          setTableData(sortedData)
          setMapCountries(data)
          setCountries(countries)
        })
    }
    getCountriesData()

  },[])

  

  useEffect(() => {
    const url2 = Country === 'Worldwide'
      ? 'https://disease.sh/v3/covid-19/vaccine/coverage'
      : `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${Country}`
    fetch(url2)
        .then((response) => response.json())
        .then((data) => {
          var tempVaccineData = Object.entries(data)
          dispatch(setVaccinationData(tempVaccineData[tempVaccineData.length-1][1]))
        })
  },[])

  const recentCountryClick = e => {
    const recentCountryCode = e.currentTarget.value
    setCountry(recentCountryCode)

    fetch(`https://disease.sh/v3/covid-19/countries/${recentCountryCode}`)
      .then((response) => response.json())
      .then((data) => {
        setCountry(recentCountryCode)
        setCountryInfo(data)
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(4)
      })

  }

  const onCountryChange = async (e) => {
    // console.log(recentCountries)
    // console.log(e)
    const countryCode = e.target.value;
    setCountry(countryCode);

    // ========== REDUX RECENT COUNTRIES
    fetch(`https://disease.sh/v3/covid-19/countries/${countryCode}`)
                    .then(response => response.json())
                    .then(data => {
                        dispatch(saveRecent({"country": data.country, "countryCode": countryCode}))
                    })
            
    if(countryCode === "Worldwide"){
      fetch('https://disease.sh/v3/covid-19/vaccine/coverage')
        .then((response) => response.json())
        .then((data) => {
          var tempVaccineData = Object.entries(data)
          dispatch(clearVaccinationData())
          dispatch(setVaccinationData(tempVaccineData[tempVaccineData.length-1]))
      })
    } else {
      fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${countryCode}`)
        .then((response) => response.json())
        .then((data) => {
          if(!Object.entries(data)[1]){
            dispatch(clearVaccinationData())
            dispatch(setVaccinationData(undefined))
          } else {
            dispatch(clearVaccinationData())
            var tempVaccineData = Object.entries(data)[1][1]
            tempVaccineData = Object.entries(tempVaccineData)
            tempVaccineData = tempVaccineData[tempVaccineData.length-1]
            dispatch(setVaccinationData(tempVaccineData[1]))
          }
        })
    }
    

    
    

    //  ============== useSTATE RECENT COUNTRIES ============= //
    // if(recentCountries.length < 1 && e.target.value !== "Worldwide"){
    //   setRecentCountries([countryCode])
    // } else if(recentCountries.includes(countryCode) === false && e.target.value !== "Worldwide"){
    //   // if(recentCountries.length >= 3){
    //   //   var temp = recentCountries
    //   //   while(temp.length > 2){
    //   //     temp.shift()
    //   //   }
    //   //   setRecentCountries(temp)
    //   // } 
    //   setRecentCountries([...recentCountries, countryCode])
    // }
    
    
    

    const url = countryCode === 'Worldwide'
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode)
        setCountryInfo(data)
        if(countryCode === "Worldwide"){
          setMapCenter({ lat: 34.80746, lng: -40.4796 })
          setMapZoom(3)
        } else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long])
          setMapZoom(4)
        }
        
      })

      
  }

  return (
    <div className="app">
        <div className="app_left">
          <div className="app_header">
            <h1>COVID Tracker</h1>
            
              
              {
                recents.length > 0 ?
                <div className="app_headerFavorites">
                  <div className="app_headerFavoritesTop"><p>Recent Countries:</p></div>
                  {
                  
                  <RecentCountries 
                    countries={recents}
                    recentCountryClick={recentCountryClick}
                  />
                  // recents.map(item => {
                  //   return <RecentCountries 
                  //     countries={recents}
                  //     recentCountryClick={recentCountryClick}
                  //   />
                  // })
                  
                  
                }
                  </div>:""
                }
              
              <div className="app_headerFavoritesButtons">
              
              
            
            </div>
            <FormControl className="app_dropdown">
              <Select
                variant="outlined"
                value={Country}
                onChange={onCountryChange}
              >
                <MenuItem value="Worldwide">WorldWide</MenuItem>
                {
                  countries.map((country, k) => {
                    return <MenuItem value={country.value}>{country.name}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </div>
          
          <div className="app_stats">
            <InfoBox 
              isRed
              active={casesType === "cases"}
              onClick={e => setCasesType("cases")}
              title="Coronavirus Cases" 
              cases={prettyPrintStat(countryInfo.todayCases)} 
              total={prettyPrintStat(countryInfo.cases)}
            />

            <InfoBox 
              active={casesType === "recovered"}
              onClick={e => setCasesType("recovered")}
              title="Recovered" 
              cases={prettyPrintStat(countryInfo.todayRecovered)} 
              total={prettyPrintStat(countryInfo.recovered)}
            />

            <InfoBox 
              isRed
              active={casesType === "deaths"}
              onClick={e => setCasesType("deaths")}
              title="Deaths" 
              cases={prettyPrintStat(countryInfo.todayDeaths)} 
              total={prettyPrintStat(countryInfo.deaths)}
            />
            <VaccineInfoBox 
              title="Vaccinations"
              onClick
              cases={prettyPrintStat(vaccinations)}
            />
          </div>

          

          
          <Map center={mapCenter} zoom={mapZoom} countries={mapCountries} casesType={casesType}/>
        </div>
        <Card className="app_right">
                <CardContent>
                  <h3>Live Cases by Country</h3>
                  <Table countries={tableData} />
                  <h3 className="app_graphTitle" casesType={casesType}>Worldwide New Cases</h3>
                  <LineGraph className="app_graph" casesType={casesType}/>
                </CardContent>
          
        </Card>
    </div>
  );
}

export default App;
