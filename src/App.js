import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import ImageTile from './ImageTile.js';
import { Collapse, Fade } from 'react-bootstrap';

const API_KEY = process.env.REACT_APP_NASA_API_KEY;
const NASA_API_EP = 'https://api.nasa.gov/planetary/apod';
const MAX_CONTENT = 100;
const FETCH_COUNT = 9;
const DEBOUNCE_DELAY = 500; // milliseconds to prevent rapid successive calls

function App() {
  const listInnerRef = useRef();
  const lastFetchTimeRef = useRef(0);
  const [data, setData] = useState([]);
  const [isInit, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // Fetches data. init param checks if the data fetch is on initialization.
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
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        // Use functional state update to avoid mutation and ensure we have the latest state
        setData(prevData => [
          ...prevData,
          ...result.map((item, index) => [index, item])
        ]);
      })
      .catch((error) => {
        console.error('Error fetching APOD data:', error);
      })
      .finally(() => {
        setIsLoading(false);
        setIsFetching(false);
      });
  };

  // Initial data fetch - runs once on mount
  useEffect(() => {
    fetchData(true);
  }, []);

  const handleClick = () => {
    fetchData(false);
  };

  // Fetches data when user scrolls to the bottom
  // Fixed: Added debounce, isFetching guard, and proper scroll threshold calculation
  const onScroll = () => {
    const now = Date.now();
    
    // Guard: Skip if called too recently (debounce)
    if (now - lastFetchTimeRef.current < DEBOUNCE_DELAY) {
      return;
    }

    // Guard: Skip if already fetching
    if (isFetching) {
      return;
    }

    // Guard: Skip if max content reached
    if (data.length >= MAX_CONTENT) {
      return;
    }

    // Calculate scroll threshold with 100px buffer for smoother UX
    const scrollThreshold = document.documentElement.scrollHeight - window.innerHeight - 100;
    
    // Check if user has scrolled near the bottom
    if (window.scrollY >= scrollThreshold) {
      lastFetchTimeRef.current = now;
      fetchData(false);
    }
  };

  // Fixed: Added proper cleanup to prevent memory leaks
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll, isFetching, data.length]);

  return (
    <div className='App' ref={listInnerRef}>
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
