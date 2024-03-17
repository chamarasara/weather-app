import React from 'react';
import  Gauge  from 'react-svg-gauge';

const Temperature = ({ value }) => {

  const valueLabelStyle = {
    fontSize: '20px',
    fontWeight: 'bold'
  };

  return (
    <div style={{ width: '200px', height: '200px' }}>
      <Gauge 
      value={value} 
      width={200} 
      height={200}
      color={"#115eae"} 
      label="Temperature" 
      valueLabelStyle={valueLabelStyle} 
      valueFormatter={(value) => `${value}°C`}
      />
    </div>
  );
};

export default Temperature;
