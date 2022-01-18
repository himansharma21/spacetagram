import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import ImageTile from './ImageTile.js'
import { Collapse, Fade } from 'react-bootstrap';


const API_KEY = "sqBqTVN4cUU9i1DPPFvgBN30V8PYQOClv9F1PXiC";
const NASA_API_EP = 'https://api.nasa.gov/planetary/apod'



function App() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      var url = new URL(NASA_API_EP);
      var params = { api_key: API_KEY, count: 10 }
      url.search = new URLSearchParams(params).toString();
      const imageData = fetch(url, {
        method: 'GET',
      }).then((response) => response.json())
        .then((result) => {
          console.log(result);
          setData(result);
          setIsLoading(false);
        });
    };
    fetchData();
  }, [setData]);

  return (
    <div className="App">
      <h1 className='title'>Spacetagram</h1>
      <div class="container center">
        <div className='row center justify-content-center'>
            <Collapse in={isLoading}>
              <h2>Loading...</h2>
            </Collapse>

            <Fade in={!isLoading}>
              <div className='row center justify-content-center'>
                {Array.from(data).map(row =>
                        row.media_type == 'image'?
                        (<ImageTile title = {row.title} time = {row.date} explanation={row.explanation} url={row.url}></ImageTile>):null
                    )}
              </div>
            </Fade>
        </div>
      </div>
    </div>
  );
}

export default App;
