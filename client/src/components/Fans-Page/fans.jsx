import React, {useState, useEffect} from 'react';

function Fans() {

  const [fanParts, setFanParts] = useState([]);

  useEffect(() => {
    fetch('/Fans')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error fetching parts data');
        }
      })
      .then((jsonResult) => {
        const fans = jsonResult.fans // Flatten the arrays of parts
        setFanParts(fans);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  return (
    <div>
      <p>Hello! This is the GPU component!</p>
      <ul>
        {fanParts.map((part) => (
          <li key={part.id}>{part.size}</li>
        ))}
      </ul>
      <div>
        {fanParts.map((part) => {
          return <p key={part.id}>{part.color}</p>
        })}
      </div>
      <div>
        {fanParts.map((part) => {
          return <p key={part.id}>{part.price}</p>
        })}
      </div>
    </div>
  );
  
}

export default Fans;