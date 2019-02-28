import ReactDOM from 'react-dom';
import React from 'react';
import {Provider, connect} from 'react-redux';
import { createStore } from 'redux';

const CREATE_QUIZ = 'CREATE_QUIZ';

const initialState = {
  quizzes: []
};

const createQuiz = (quiz)=>{
  return {
    type: CREATE_QUIZ,
    payload: quiz
  }
}

const teacherReducer = (state = initialState, action)=>{
  let arr = state.quizzes;
  switch(action.type){
    case CREATE_QUIZ:
      arr.push(action.payload);
      return {
        ...state,
        quizzes: arr
      }
    default:
      return state;
  }
}


const store = createStore(teacherReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.dispatch(createQuiz({name: 'quiz1', class:'math'}));
store.dispatch(createQuiz({name: 'quiz2', class:'math'}));
store.dispatch(createQuiz({name: 'quiz3', class:'math'}));

console.log(store.getState());

class Quiz extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      name: ''
    }

    this.nameChange = this.nameChange.bind(this);
    this.classChange = this.classChange.bind(this);
    this.submitQuiz = this.submitQuiz.bind(this);
  }

  nameChange(e){
    this.setState({
      ...this.state,
      name: e.target.value
    })
  }

  classChange(e){
    this.setState({
      ...this.state,
      class: e.target.value
    })
  }

  submitQuiz(){
    this.props.addQuiz({
      name:this.state.name,
      class:this.state.class
    });
    this.setState({
      ...this.state,
      name: '',
      class: ''
    })
  }

  render(){
    return(
      <div>
        <input type='text' value={this.state.name} onChange={this.nameChange}/>
        <input type='text' value={this.state.class} onChange={this.classChange}/>
        <button onClick={this.submitQuiz}>Create Quiz</button>
        <ul>
          {
            this.props.quizzes.quizzes.map((quiz, idx)=>{
            return (<li key={idx}>{quiz.name} - {quiz.class}</li>)
            })
          }
        </ul>
      </div>
    )
  }
}


const mapStateToProps = (state)=>{
  return {
    quizzes: state
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    addQuiz: (quiz) => {
      dispatch(createQuiz(quiz))
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Quiz);

class App extends React.Component{

  render(){
    return(
        <Container />
    )
  }
}

//react-dom
ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
document.getElementById('root'));
