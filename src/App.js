import React,  { Component } from 'react';
import shuffle from 'lodash.shuffle';
import './App.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import KeyBoard from './KeyBoard';

const listemots = ['CHAT','LION','ZEBRE','ELEPHANT', 'VACHE','LAPIN','CHEVAL','CHIEN','RENARD','CROCODILE','SINGE','PERROQUET']



class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keyPressed :  new Set([]),
            maxEssai : 10,
            essai : 0,
            word : this.generateWord()
        }

    }
    reset= ()=> {
        this.setState(
                    {keyPressed : new Set([]),
                    maxEssai : 10,
                    essai : 0,
                    word : this.generateWord()
                    }
        );
    }

generateWord() {
    return shuffle(listemots)[0]
}

imageDisplay(numberImg) {
    return (
      <img src={require('./images/img'+ numberImg +'.png')} alt={numberImg} />
    );
}

computeDisplay(phrase, usedLetters) {
  return phrase.replace(/\w/g,
    (letter) => (usedLetters.has(letter) ? letter : '_')
  )
}

displayConsole(key) {
   this.setState({keyPressed : this.state.keyPressed.add(key.toUpperCase())})

   if (!this.state.word.includes(key.toUpperCase())&& this.state.essai!==this.state.maxEssai )
   this.setState({essai : this.state.essai+1})
}



render() {

console.log('mot' +this.state.word)
const phrase =this.computeDisplay(this.state.word,this.state.keyPressed)
const lose= this.state.essai===this.state.maxEssai
const win= !phrase.includes('_')
  return (



         <div >

         {!lose &&  <div className="keyboard">
        <KeyboardEventHandler
            handleKeys={['alphabetic']}
            onKeyEvent={(key, e) => this.displayConsole(key)}
            handleFocusableElements={true}
             />
          <KeyBoard />
        </div>}

        <div>
             {this.imageDisplay(this.state.essai+1)}
        </div>


        <div>
            Try : {this.state.essai}
        </div>

         <div  className="phrase" >
           <h1> {phrase} </h1>
           {lose &&
           <div>
            <button onClick={this.reset}> recommencer </button>
            <h1> vous avez perdu !!</h1>
           </div>
            }

           {win && <h1> vous avez gagné !!</h1> }
        </div>
 </div>
  );

}

}

export default App;

