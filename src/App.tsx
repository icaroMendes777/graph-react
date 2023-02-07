import logo from './logo.svg';
import './App.scss';

import React from 'react';


/**
 * O seguinte componente foi criado utilizando um componente de classe.
 * como componentes de classe estão saido de uso, tal aplicação foi feita 
 * com a intenção de estudo de código legado.
 */


class App extends React.Component {

  constructor(props) {
    super(props);

    this.maxHeightColumn = 400;
    

    this.yearIncome = [
      {name:'janeiro',
      value:275},
      {name:'fevereiro',
      value:120},
      {name:'março',
      value: 180},
      {name:'abril',
      value:450},
      {name:'maio',
      value:250},
      {name:'junho',
      value:500},
      {name:'julho',
      value:450},
      {name:'agosto',
      value:700},
      {name:'setembro',
      value:350},
      {name:'outubro',
      value:300},
      {name:'novembro',
      value:200 },
      {name:'dezembro',
      value:75}
    ];


    /**
     * valores teste são carregados no inicio da aplicação
     */
    
    this.total = 0;

    this.yearIncome.forEach((el,i)=>{
      
      if(el.value) this.total += parseInt(el.value);
      
    })

    this.state = {value :0,
                  yearTotalIncome: this.total,
                  yearIncome:this.yearIncome}


             
    this.arrayColors = [
      'blue', 'green', 'red', 
      'blue', 'green', 'red', 
      'blue', 'green', 'red', 
      'blue', 'green', 'red', 
    ]
  }

  componentDidMount(){
    document.title = "Gráfico App"
  }



  //===========================================================
  ///FUNCTIONS


  calculateTotalYearIncome = ()=>{


    let total=0;
    this.state.yearIncome.forEach((el,i)=>{
      
      if(el.value) total += parseInt(el.value);
        //console.log('-----',total);
    })
    
    return total;
  }

  //-------------------------------------

  calculateAverageMonth = ()=>{

    return 0;

    return Math.trunc( ( this.calculateTotalYearIncome() / 12) );
  }



  //-------------------------------------


  makeStyleColumnMonth = (monthIndex)=>{

          if(!this.yearIncome[monthIndex].value) return  ({height: '0px'});

          let monthValue = this.yearIncome[monthIndex].value;
          let highestMonthVal = this.getHighestMonthValue();


            //console.log(highestMonthVal);

         
          let heightPx = (this.maxHeightColumn * monthValue) / highestMonthVal;


          if(heightPx > 400){
            alert("!");
            console.log('hp',heightPx);
            console.log('mv',monthValue);
            console.log('hm', highestMonthVal);
            return;
          }
          heightPx = heightPx+'px';
          
          return ({
            height: heightPx,
            backgroundColor:this.arrayColors[monthIndex],
          });
  }


  //-------------------------------------

  handleIncome = (e,i)=> {
    
    if(e.target.value >9999){
      alert('valor máximo 9999');
      return;
    }

    let newState = this.state;
    
    if(e.target.value) newState.yearIncome[i].value=parseInt(e.target.value);
    else newState.yearIncome[i].value=0;

    newState.yearTotalIncome = this.calculateTotalYearIncome();

    this.setState(newState);
    
    return;
  }



  //-------------------------------------



  getHighestMonthValue = ()=>{
      let highestValue = 0;
      this.state.yearIncome.forEach((el)=>{
          let curValue = parseInt(el.value);
          if(curValue > highestValue) highestValue = curValue;
      });

      return(highestValue);
  }


  //-------------------------------------



  preventNotNumberInput = (event)=>{
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
    return;
  }



  //-------------------------------------

  truncate_3 = (words:string)=>{
    return `${words.slice(0, 3)}.`
  }


  
////============================================================

  render(){


      return (
        <div className="App">
          <div className='intro'>
            <h1>Balanço Anual:</h1>
          </div>


            <div className="months">

            <form>

            {this.state.yearIncome.map((el,i)=>{
                    return(
                      <label key={i} className='padding_03'>
                        <div className='month_name_form'>{el.name}</div>
                      <input
                              type="text"
                              name={el.name}
                              value={el.value}
                              onChange={(event)=>this.handleIncome(event,i)}
                              onBlur={this.handleBlurMonth}
                              key={i}

                              onKeyPress={(event) => {
                                this.preventNotNumberInput(event);
                              }}
                            />
                      </label>
                    )
            })}

              {
                //--------------------------------------------------------
              }

          
              </form>

            <div className='padding_03'>
            <p>Balanço total: R$<b> {this.state.yearTotalIncome},00</b></p>
            

            </div>
            </div>


            <div className='graph'>

            {this.state.yearIncome.map((el,i)=>{
                    return(

                      <div className='wrap_month Column' key={i}>
                        <div className='graph_month' title={el.name+'- R$'+el.value} style={this.makeStyleColumnMonth(i)}>
                        </div>

                        <div className='month_name_graph padding_03'>{this.truncate_3(el.name)}</div>
                      </div>
                    )
            })}



            </div>



            {
                //--------------------------------------------------------
              }


        <footer>
          <small>App desenvolvido por <a href="http://icaromendes.epizy.com/">Icaro Mendes.</a></small>
        </footer>


        </div>
      );

  }
}



export default App;
