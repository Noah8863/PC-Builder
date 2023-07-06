import React, {useState, useEffect} from 'react';

function Ram() {

  const [ramParts, setRamParts] = useState([]);

  useEffect(() => {
    fetch('/RAM')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error fetching parts data');
        }
      })
      .then((jsonResult) => {
        const ram = jsonResult.ram // Flatten the arrays of parts
        setRamParts(ram);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  return (
    <div>
      <p>Hello! This is the GPU component!</p>
      <ul>
        {ramParts.map((part) => (
          <li key={part.id}>{part.size}</li>
        ))}
      </ul>
      <div>
        {ramParts.map((part) => {
          return <p key={part.id}>{part.color}</p>
        })}
      </div>
      <div>
        {ramParts.map((part) => {
          return <p key={part.id}>{part.price}</p>
        })}
      </div>
    </div>
  );
  
}

export default Ram;