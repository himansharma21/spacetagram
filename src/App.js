import './App.css';
import { useState, useEffect, useRef } from 'react';
import ImageTile from './ImageTile.js'
import { Collapse, Fade } from 'react-bootstrap';

const API_KEY = process.env.REACT_APP_NASA_API_KEY;
const NASA_API_EP = 'https://api.nasa.gov/planetary/apod';
const MAX_CONTENT = 100;
const FETCH_COUNT = 9;
const FETCH_TIMEOUT = 5000;
function App() {

  const listInnerRef = useRef();
  const [data, setData] = useState([]);
  const [isInit, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async (init) => {
    if (init) {
      setIsLoading(true);
    } else {
      setIsFetching(true);
    }
    var url = new URL(NASA_API_EP);
    var params = { api_key: API_KEY, count: FETCH_COUNT, thumbs: true };
    url.search = new URLSearchParams(params).toString();
    fetch(url, {
      method: 'GET',
    }).then((response) => response.json())
      .then((result) => {
        var tempData = data;
        for (var i in result) {
          tempData.push([i, result[i]]);
        }
        setData(tempData);
        setIsLoading(false);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchData(true);
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [setData]);

  const handleClick = () => {
    fetchData(false);
  }

  const onScroll = async (event) => {
    if ((window.innerHeight + window.scrollY) >= event.target.body.scrollHeight && data.length < MAX_CONTENT) {
      fetchData(false);
      setTimeout(FETCH_TIMEOUT);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
  });

  return (
    <div className='App' onScroll={onScroll} ref={listInnerRef}>
      <h1 className='title'>Spacetagram</h1>
      <div className="container center" >
        <div className='row center justify-content-center'>
          <Collapse in={isInit}>
            <h2>Gathering images...</h2>
          </Collapse>

          <Fade in={!isInit}>
            <div className='row center justify-content-center'>
              {Array.from(data).map(row =>
                row[1].media_type === 'image' ?
                  (<ImageTile title={row[1].title} time={row[1].date} explanation={row[1].explanation} url={row[1].url}></ImageTile>)
                  : (<ImageTile title={row[1].title} time={row[1].date} explanation={row[1].explanation} url={row[1].thumbnail_url}></ImageTile>)
              )}
            </div>
          </Fade>
        </div>
      </div>
      <Fade in={!isInit}>
        {!isFetching ? <button className='no-border' onClick={(e) => handleClick(e)}>Load more</button> : <h2>Grabbing some more...</h2>}
      </Fade>
    </div>
  );
}

export default App;
