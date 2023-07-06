import React, {useState, useEffect} from 'react';

function WaterCA() {

  const [waterCAParts, setWaterCAParts] = useState([]);

  useEffect(() => {
    fetch('/Water-Cooling-Accessories')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error fetching parts data');
        }
      })
      .then((jsonResult) => {
        const waterCA = jsonResult.waterCoolingAccessories // Flatten the arrays of parts
        setWaterCAParts(waterCA);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  return (
    <div>
      <p>Hello! This is the GPU component!</p>
      <ul>
        {waterCAParts.map((part) => (
          <li key={part.id}>{part.size}</li>
        ))}
      </ul>
      <div>
        {waterCAParts.map((part) => {
          return <p key={part.id}>{part.color}</p>
        })}
      </div>
      <div>
        {waterCAParts.map((part) => {
          return <p key={part.id}>{part.price}</p>
        })}
      </div>
    </div>
  );
  
}

export default WaterCA;