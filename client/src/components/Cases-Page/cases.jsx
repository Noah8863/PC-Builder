import React, {useState, useEffect} from 'react';

function Cases() {

  const [caseParts, setCaseParts] = useState([]);

  useEffect(() => {
    fetch('/Cases')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error fetching parts data');
        }
      })
      .then((jsonResult) => {
        const cases = jsonResult.cases // Flatten the arrays of parts
        setCaseParts(cases);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  return (
    <div>
      <p>Hello! This is the GPU component!</p>
      <ul>
        {caseParts.map((part) => (
          <li key={part.id}>{part.size}</li>
        ))}
      </ul>
      <div>
        {caseParts.map((part) => {
          return <p key={part.id}>{part.color}</p>
        })}
      </div>
      <div>
        {caseParts.map((part) => {
          return <p key={part.id}>{part.price}</p>
        })}
      </div>
    </div>
  );
  
}

export default Cases;