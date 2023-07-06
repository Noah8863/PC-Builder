import React, {useState, useEffect} from 'react';

function CPU() {

  const [cpuParts, setCpuParts] = useState([]);

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
        const cpus = jsonResult.cpus // Flatten the arrays of parts
        setCpuParts(cpus);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  return (
    <div>
      <p>Hello! This is the CPU component!</p>
      <ul>
        {cpuParts.map((part) => (
          <li key={part.id}>{part.size}</li>
        ))}
      </ul>
      <div>
        {cpuParts.map((part) => {
          return <p key={part.id}>{part.color}</p>
        })}
      </div>
      <div>
        {cpuParts.map((part) => {
          return <p key={part.id}>{part.price}</p>
        })}
      </div>
    </div>
  );
  
}

export default CPU;