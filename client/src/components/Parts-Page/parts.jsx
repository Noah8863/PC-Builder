import React, {useState, useEffect} from 'react';

function Parts() {

  const [parts, setParts] = useState([]);

  useEffect(() => {
    fetch('/motherboards')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error fetching parts data');
        }
      })
      .then((jsonResult) => {
        const motherboards = jsonResult.motherboards // Flatten the arrays of parts
        setParts(motherboards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  return (
    <div>
      <p>Hello! This is the Parts component!</p>
      <ul>
        {parts.map((part) => (
          <li key={part.id}>{part.size}</li>
        ))}
      </ul>
      <div>
        {parts.map((part) => {
          return <p key={part.id}>{part.color}</p>
        })}
      </div>
      <div>
        {parts.map((part) => {
          return <p key={part.id}>{part.price}</p>
        })}
      </div>
    </div>
  );
  
}

export default Parts;





