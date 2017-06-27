import React, { Component } from 'react';
const oldList = [
    {
      name: 'Jon',
      joining_date:'23/10/2015',
      age: 23
    },
    {
      name:'Viki',
      joining_date:'24/01/2015',
      age: 20
    },
    {
      name: 'Abc',
      joining_date:'25/10/2015',
      age: 43
    },
    {
      name: 'XYZ',
      joining_date:'28/10/2015',
      age: 21
    }]

export default class UserList extends Component {
    constructor(props){
      super(props)
      this.state={
        list:oldList.slice(),
        searchValue:'',
      }
       this.input = this.input.bind(this);
       this.init = this.init.bind(this);
       
    }
    
    input(e){
      this.setState({
        searchValue:e.target.value
      })
    }
    init(index) {
      var self=this
      if(index==4){
        clearTimeout();
      }
      else {
        let addUser={}
        var list=this.state.list
        var listOld=oldList
        for(let i=0;i<listOld.length;i++){
          if(i==index){
            addUser = Object.assign({}, listOld[index]);
            addUser['age']=this.newAge(addUser.age)
            addUser['joining_date']=this.newDate(addUser.joining_date)  
          }
        }
        list.push(addUser)
        this.setState({list:list},function(){
            setTimeout(function(){
              self.init(index+1)
            },60000)
        })
      }
    }
    newAge(oldAge)
    {
      var a,no,b,temp=0;
      no=oldAge;
      b=no;
      while(no>0)
      {
      a=no%10;
      no=parseInt(no/10);
      temp=temp*10+a;
      }
      return ('0'+temp).slice(-2);
    }
    newDate(UserDate){
        var d=Date.parse(new Date(UserDate.split("/").reverse().join("-")))
        d = Number(d); // cast it to a Number
        var date = new Date(d); // works
        date.setDate(date.getDate() + 1)
        return date.getDate() + '/' + (date.getMonth() + 1)+ '/' +  date.getFullYear() ;
    }
    componentDidMount() {
      var self=this;

      setTimeout(function(){
        self.init(0)
      },60000)
      
    }
    render(){
      var self=this
      // console.log(this.state.secondsElapsed)
      
      let sortedData = this.state.list.sort((a, b) => Date.parse(new Date(a.joining_date.split("/").reverse().join("-"))) - Date.parse(new Date(b.joining_date.split("/").reverse().join("-"))));
      const Content=sortedData.map(function(item,i){  
            if(item.name.toLowerCase().indexOf(self.state.searchValue.toLowerCase())<0){
              return null;
            }                 
            return( 
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.joining_date}</td>
                <td>{item.age}</td>
              </tr>
            )
          })
      return (
        <div className="container managePadding">
          <div><input className="searchText" type="text" placeholder="Searchuser" onChange={this.input}/></div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Joining Date</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {Content}
            </tbody>
          </table>
        </div>
      )
    }
}