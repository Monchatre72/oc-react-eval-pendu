import React from 'react'

class KeyBoard extends React.Component {
key

  renderSquare(value) {
    return (
        <button className="touch"
        onClick={()=>console.log(value)} >
          {value}
        </button>
    );
  }



  render() {

  const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  const line =2
  console.log(alphabet.length)
  	const items= []
  for (let i = 0; i < line; i++) {

		const item= []

	   for (let d = 0; d < alphabet.length/line; d++) {
			item.push( <b key={alphabet.length*i+d}>{this.renderSquare(alphabet[alphabet.length/line*i+d])} </b>)
	   }


	items.push(<div key={i}>{item}</div>);
  }

     return (
  	    <div>
        {items}
  	 	</div>

      );

}
}



export default KeyBoard