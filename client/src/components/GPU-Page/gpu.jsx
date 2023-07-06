import React, {useState, useEffect} from 'react';

function GPU() {

  const [gpuParts, setGpuParts] = useState([]);

  useEffect(() => {
    fetch('/CPU')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error fetching parts data');
        }
      })
      .then((jsonResult) => {
        const gpus = jsonResult.gpus // Flatten the arrays of parts
        setGpuParts(gpus);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  return (
    <div>
      <p>Hello! This is the GPU component!</p>
      <ul>
        {gpuParts.map((part) => (
          <li key={part.id}>{part.size}</li>
        ))}
      </ul>
      <div>
        {gpuParts.map((part) => {
          return <p key={part.id}>{part.color}</p>
        })}
      </div>
      <div>
        {gpuParts.map((part) => {
          return <p key={part.id}>{part.price}</p>
        })}
      </div>
    </div>
  );
  
}

export default GPU;