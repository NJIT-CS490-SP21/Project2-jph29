import React from 'react';

export function Game(){
   function constructor(props) {
      super(props);
      this.state = {
          xIsNext: true,
          stepNumber: 0,
          history: [
            { squares: Array(9).fill(null) }
        ]
      }
    }
    function render(){
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        return(
            <div>
            
            </div>
        );
    }
}