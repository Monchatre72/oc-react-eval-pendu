import React from 'react';
import './App.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';

function App() {



  return (
   <div>
  <KeyboardEventHandler
    handleKeys={['alphabetic']}
    onKeyEvent={(key, e) => console.log(`do something upon keydown event of ${key}`)} />
 </div>
  );
}

export default App;
