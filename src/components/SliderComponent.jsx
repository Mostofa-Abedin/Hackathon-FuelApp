import React from 'react';

const SliderComponent = ({ label, value, onChange, min, max, step }) => {
  return (
    <div style={{ margin: '1rem 0' }}>
      <label htmlFor="slider">
        {label}: {value} km
      </label>
      <input
        id="slider"
        type="range"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step || 1}
      />
    </div>
  );
};

export default SliderComponent;
