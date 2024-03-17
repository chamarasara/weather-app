import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WeatherForm from './components/weather_form';
import { getWeatherByCity } from './slices';
import CloudImage from '../../assets/images/clouds.jpg'
import Temperature from './components/temperature';
import Humidity from './components/humadity';
import Wind from './components/wind';
import PageSkeleton from './components/loading_skelton';
import ErrorToast from './components/error_toast';

const Weather = () => {

  const dispatch = useDispatch()
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(false)
  const selectedWeather = useSelector(state => state.weather?.selected)
  const [errorToast, setErrorToast] = useState({ show: false, message: '' });

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  useEffect(() => {
    const getUserLocation = () => {
      setLoading(true)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setSelectedCity({ lat: latitude, lon: longitude });
            setLoading(false)
          },
          (error) => {
            setErrorToast({ show: true, message: "Error getting user location." });
            setLoading(true)
          }
        );
      } else {
        setErrorToast({ show: true, message: "Geolocation is not supported by this browser." });
        setLoading(true)
      }
    };
    getUserLocation();
  }, []);

  useEffect(() => {
    setLoading(true)
    if (selectedCity) {
      let payload = {
        lon: selectedCity.lon,
        lat: selectedCity.lat,
        units: "metric"
      };
      dispatch(getWeatherByCity(payload))
        .unwrap()
        .then(res => {
          setLoading(false)
        })
        .catch(e => {
          console.log(e);
          setLoading(false)
        });
    }
  }, [dispatch, selectedCity]);

  const getDirection = (degrees) => {

    const sectors = [
      { direction: 'N', min: 0, max: 11.25 },
      { direction: 'NNE', min: 11.25, max: 33.75 },
      { direction: 'NE', min: 33.75, max: 56.25 },
      { direction: 'ENE', min: 56.25, max: 78.75 },
      { direction: 'E', min: 78.75, max: 101.25 },
      { direction: 'ESE', min: 101.25, max: 123.75 },
      { direction: 'SE', min: 123.75, max: 146.25 },
      { direction: 'SSE', min: 146.25, max: 168.75 },
      { direction: 'S', min: 168.75, max: 191.25 },
      { direction: 'SSW', min: 191.25, max: 213.75 },
      { direction: 'SW', min: 213.75, max: 236.25 },
      { direction: 'WSW', min: 236.25, max: 258.75 },
      { direction: 'W', min: 258.75, max: 281.25 },
      { direction: 'WNW', min: 281.25, max: 303.75 },
      { direction: 'NW', min: 303.75, max: 326.25 },
      { direction: 'NNW', min: 326.25, max: 348.75 },
      { direction: 'N', min: 348.75, max: 360 },
    ];
    const sector = sectors.find(sector => degrees >= sector.min && degrees < sector.max);
    return sector ? sector.direction : 'N/A';
  };

  return (
    <div className='container'>
      {loading ? <PageSkeleton /> : <div className='row'>
        <div className='col-md-6 mt-5'>
          <h3>WEATHER DASHBOARD</h3>
          <WeatherForm
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
          />
          <div className="card mt-3" style={{ backgroundImage: `url(${CloudImage})`, backgroundSize: 'cover' }}>
            <div className="card-body p-4">
              <h2 className="card-title white-title">{selectedWeather?.name}, {selectedWeather?.sys?.country}</h2>
              <h1 className="white-title">{selectedWeather?.main?.temp}°C</h1>
              <p className="card-text white-title">Feels like {selectedWeather?.main?.feels_like}°C. {selectedWeather?.weather?.map(el => { return <span>{el?.description}</span> })}.</p>
            </div>
          </div>
          <div className='row mt-5'>
            <div className='col-md-4'>
              <Temperature value={selectedWeather?.main?.temp} />
            </div>
            <div className='col-md-4'>
              <Humidity value={selectedWeather?.main?.humidity} />
            </div>
            <div className='col-md-4'>
              <Wind value={selectedWeather?.wind?.speed} />
            </div>
          </div>
        </div>
        <div className='col-md-6 mt-5'>
          <div className='p-4 m-5' style={{ border: '1px solid #ccc' }}>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th>Minimum Temp</th>
                  <td>{selectedWeather?.main?.temp_min}°C</td>
                </tr>
                <tr>
                  <th>Maximum Temp</th>
                  <td>{selectedWeather?.main?.temp_max}°C</td>
                </tr>
                <tr>
                  <th>Pressure</th>
                  <td>{selectedWeather?.main?.pressure}hPa</td>
                </tr>
                <tr>
                  <th>Humidity</th>
                  <td>{selectedWeather?.main?.humidity}%</td>
                </tr>
                <tr>
                  <th>Sea Level</th>
                  <td>{selectedWeather?.main?.sea_level} m</td>
                </tr>
                <tr>
                  <th>Ground Level</th>
                  <td>{selectedWeather?.main?.grnd_level} m</td>
                </tr>
                <tr>
                  <th>Visibility</th>
                  <td>{selectedWeather?.visibility / 1000} Km</td>
                </tr>
                <tr>
                  <th>Wind</th>
                  <td>{selectedWeather?.wind?.speed} m/s <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-compass" viewBox="0 0 16 16">
                    <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
                    <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                  </svg> {getDirection(selectedWeather?.wind?.deg)}</td>
                </tr>
                <tr>
                  <th>Cordinates</th>
                  <td>Lon: {selectedWeather?.coord?.lon} Lat: {selectedWeather?.coord?.lat}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>}
      <ErrorToast show={errorToast.show} message={errorToast.message} />
    </div>
  );
};




export default Weather;
