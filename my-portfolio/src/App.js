//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useCallback, useRef } from 'react';

function Navbar() {
  return (
    <header>
      <SlidingMenu
        style={{
          position: 'absolute',
          left: '10px',
        }}
      />
      <a href='#top'>
        <h1
          style={{
            fontSize: '20px',
            margin: '0',
          }}
        >
          Title
        </h1>
      </a>
    </header>
  );
}

function SlidingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const idleTimerRef = useRef(null);

  const toggleMenu = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  useEffect(() => {
    if(!isOpen) return;

    const handleIdle = () => {
      if(isOpen) toggleMenu();
    };

    const startIdleTimer = () => { // Closes menu if idle for 5 seconds
      clearTimeout(idleTimerRef.current); // Clear existing timer
      idleTimerRef.current = setTimeout(handleIdle, 5000); // Set new timer
    }

    const resetIdleTimer = () => {
      startIdleTimer(); // such wow
    }
    
    startIdleTimer(); // Starts initial timer

    document.addEventListener('click', resetIdleTimer) // Resets timer upon user activity
    document.addEventListener('mousemove', resetIdleTimer)
    document.addEventListener('keypress', resetIdleTimer)

    return (() => { // Clean up on component unmount or effect changes
      clearTimeout(idleTimerRef.current);
      document.removeEventListener('click', resetIdleTimer);
      document.removeEventListener('mousemove', resetIdleTimer);
      document.removeEventListener('keypress', resetIdleTimer);
    });
  }, [isOpen, toggleMenu]);

  return (
    <div>
        <button 
          onClick={toggleMenu}
          style={{
            zIndex: 999,
            position: 'fixed',
            top: '10px',
            left: isOpen? '15%': '0%',
            transition: 'left 0.5s ease',
            borderRadius: '10px'
          }}
        >
          {isOpen? 'Close Menu': 'Open Menu'}
        </button>
        <div
          className={`sliding-menu ${isOpen? 'open': ''}`}
          style={{
            position: 'fixed',
            top: 0,
            left: isOpen? '0%': '-100%',
            width: '10%',
            height: '100vh',
            backgroundColor: '#1f1f1f',
            transition: 'left 0.5s ease',
            zIndex: 999
          }}
        >
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <ul
              style={{
                flexDirection: 'column'
              }}
            >
              <a href= '#top'>Home</a>
              <a href= '#projects'>Projects</a>
              <a href= '#abt-me'>About Me</a>
              <a href= '#links'>Links</a>
            </ul>
          </nav>
        </div>
    </div>
  );
};

function ImgGallery(){
  const projImgs = [
    'https://www.google.com/imgres?q=image&imgurl=https%3A%2F%2Fgratisography.com%2Fwp-content%2Fuploads%2F2024%2F10%2Fgratisography-cool-cat-800x525.jpg&imgrefurl=https%3A%2F%2Fgratisography.com%2F&docid=YAe2I9AqIHgndM&tbnid=JTZXQS5iqyP2NM&vet=12ahUKEwjx0KfFvbqKAxWRFVkFHe33AzgQM3oECGkQAA..i&w=800&h=525&hcb=2&itg=1&ved=2ahUKEwjx0KfFvbqKAxWRFVkFHe33AzgQM3oECGkQAA'
  ];
  const yap = [];
  const alt = []
  const length = projImgs.length;

  const [index, setIndex] = useState(0);
  const idleTimerRef = useRef(null);
  const imgRef = useRef(null);

  const swipe = useCallback(() => {
    setIndex(index => (index + 1) % length);
  }, [length]);

  useEffect(() => {
    let cleanupRef; // esLint recommendation for cleaning up
    const handleIdle = () => {
      swipe();
      startIdleTimer();
    };

    const handleClick = () => {
      handleIdle();
    }

    const startIdleTimer = () => { // Changes image after idle for 5 seconds
      clearTimeout(idleTimerRef.current)
      idleTimerRef.current = setTimeout(swipe, 5000);
    }

    const resetIdleTimer = () => {
      startIdleTimer();
    }

    startIdleTimer(); // Starts initial timer
    if(imgRef.current) { // Handles user interaction
      cleanupRef = imgRef.current;
      imgRef.current.addEventListener('click', handleClick);
      imgRef.current.addEventListener('mousemove', resetIdleTimer);
      imgRef.current.addEventListener('keypress', resetIdleTimer);
    }

    return (() => { // Cleanup function
      clearTimeout(idleTimerRef.current);
      cleanupRef.removeEventListener('click', handleClick);
      cleanupRef.removeEventListener('mousemove', resetIdleTimer);
      cleanupRef.removeEventListener('keypress', resetIdleTimer);
    })
  }, [swipe]); 

  return (
    <div className='projects'>
      <div 
        ref= {imgRef} // Attach ref to the image container
        className='img-cont'
      >
        <img
          alt= {alt[index]}
          src= {projImgs[index]}
        />
        <img
          alt= {alt[(index + 1) % length]}
          src= {projImgs[(index + 1) % length]}
        /> {/* Place two images together for animation purposes*/}
      </div>
      <div className= 'yap'>
        <p>{yap[index]}</p>
      </div>
    </div>
  );
};

function Root() {
  return (
    <div>
      <Navbar />
      <main>
        <h2>Projects</h2>
        <ImgGallery />
        <h2>about me</h2>
      </main>
      <footer id='links'>
        <ul>
          <a href= "https://github.com/OmarSalhe">Github</a>
          <a href= "https://www.linkedin.com/in/omar-salhe-43a560219/">LinkedIn</a>
          <a href= "https://youtu.be/dQw4w9WgXcQ?t=93">Instagram</a>
        </ul>
      </footer>
    </div>
  );
}
export default Root;

// function App() {
//   return (
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Edit <code>src/App.js</code> and save to reload.
//     //     </p>
//     //     <a
//     //       className="App-link"
//     //       href="https://reactjs.org"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       Learn React
//     //     </a>
//     //   </header>
//     // </div>
//   );
// }

// export default App;
