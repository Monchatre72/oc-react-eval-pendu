import React,  { Component } from 'react';
import shuffle from 'lodash.shuffle';
import './App.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';

const listemots = ['CHAT','LION','ZEBRE','ELEPHANT', 'VACHE','LAPIN','CHEVAL','CHIEN','RENARD','CROCODILE','SINGE','PERROQUET']
const keyboard = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']


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

    handleKeyOrClick = key => {
       this.setState({keyPressed : this.state.keyPressed.add(key.toUpperCase())})
       if (!this.state.word.includes(key.toUpperCase())
       && this.state.essai!==this.state.maxEssai
       && !this.state.keyPressed.has(key.toUpperCase())
       )
       this.setState({essai : this.state.essai+1})
    }

render() {

const phrase =this.computeDisplay(this.state.word,this.state.keyPressed)
const lose= this.state.essai===this.state.maxEssai
const win= !phrase.includes('_')

  return (

 <div >
        <div>
             {this.imageDisplay(this.state.essai)}
           <span> Mot à deviner :</span>
           <span className="masque"> {phrase} </span>
           <div> Essai restant : {this.state.maxEssai-this.state.essai}</div>
           <br/>
        </div>

        <div> { (!win && !lose)? (
                    <div className="keyboard">
                          {
                               keyboard.map((letter, index) => (
                                 <button disabled={this.state.keyPressed.has(letter)}
                                 className={this.state.keyPressed.has(letter)?"touch disabled":"touch"}
                                   key={index}
                                   index={index}
                                   onClick={()=>this.handleKeyOrClick(letter)}
                                 >{letter}</button>
                               ))
                          }
                        <KeyboardEventHandler
                            handleKeys={['alphabetic']}
                            onKeyEvent={(key, e) => this.handleKeyOrClick(key)}
                            handleFocusableElements={true}
                        />
                    </div>
              ):(
                    <div>
                    <h1> vous avez {win?"gagné":"perdu"}!!</h1>
                    <button onClick={this.reset}> recommencer </button>
                    </div>
                )
        } </div>
 </div>
  );
}
}

export default App;

