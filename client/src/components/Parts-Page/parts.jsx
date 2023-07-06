import React, {useState, useEffect} from 'react';

function Parts() {

  const [parts, setParts] = useState([]);

  useEffect(() => {
    fetch("/parts/").then(res => {
      if(res.ok){
        return res.json()
      }
    }).then(jsonResult => {
      setParts(jsonResult.partsList)
    })
  })



  return (
    <div>
      <p>Hello! This is the Parts component!</p>
      {parts.map(part => <li>{part}</li>)}
    </div>
  );
}

export default Parts;