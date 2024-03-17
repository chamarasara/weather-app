import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { searchCities } from '../slices';

const WeatherForm = ({ selectedCity, onCityChange }) => {

  const [city, setCity] = useState(selectedCity || '');
  const [cityResult, setCityResult] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let payload = {
      city: city ?? null,
      limit: 10
    };
    dispatch(searchCities(payload))
      .unwrap()
      .then(res => {
        let cityOptions = res?.map((el) => {
          return { value: el.name, label: el.name, country: el.country, lat: el.lat, lon: el.lon, state: el.state, img: `https://openweathermap.org/images/flags/${el.country.toLowerCase()}.png` };
        });
        setCityResult(cityOptions);
      })
      .catch(e => {
        console.log(e);
      });
  }, [city, dispatch]);

  
  const handleCitySelect = (selectedOption) => {
    setCity(selectedOption);
    onCityChange(selectedOption);
  };

  return (
    <React.Fragment>
      <div className='row'>
        <Select
          isSearchable
          isClearable
          onInputChange={setCity}
          onChange={handleCitySelect}
          options={cityResult}
          formatOptionLabel={option => (
            <div className="d-flex">
              <div>
                <span className='fs-12 d-block'>{option?.label}, </span>
                <span className="text-muted fs-10 d-block">{option?.country}</span>
              </div>
              <div className='mr-5'>
                <img src={option?.img} alt="country"></img>
              </div>
            </div>
          )}
          placeholder="Select a city..."
        />
      </div>
    </React.Fragment>
  );
};

export default WeatherForm;