import ReactDOM from 'react-dom';
import React from 'react';
import {Provider, connect} from 'react-redux';
import { createStore } from 'redux';

//redux
//action types
const CREATE_QUIZ = 'CREATE_QUIZ';
const CREATE_QUESTION = 'CREATE_QUESTION';

//state has quizzes array and questions array
const initialState = {
  quizzes: [],
  questions: []
};

//action creators
const createQuiz = (quiz)=>{
  return {
    type: CREATE_QUIZ,
    payload: quiz
  }
}

const createQuestion = (question)=>{
  return {
    type: CREATE_QUESTION,
    payload: question
  }
}

//reducer for teacher actions
const teacherReducer = (state = initialState, action)=>{
  let updatedQuizzes = state.quizzes;
  let updatedQuestions = state.questions;
  switch(action.type){
    case CREATE_QUIZ:
      updatedQuizzes.push(action.payload);
      return {
        ...state,
        quizzes: updatedQuizzes
      }
      break;
    case CREATE_QUESTION:
      updatedQuestions.push(action.payload);
      return {
        ...state,
        questions: updatedQuestions
      }
      break;
    default:
      return state;
      break;
  }
}

//store for state
const store = createStore(teacherReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//for test
/*
store.dispatch(createQuiz({name: 'quiz1', class:'math'}));
store.dispatch(createQuiz({name: 'quiz2', class:'math'}));
store.dispatch(createQuiz({name: 'quiz3', class:'math'}));

store.dispatch(createQuestion({question: 'where are you from?', answer: 'it is up to you'}));
store.dispatch(createQuestion({question: '2 + 2 = ?', answer: '4'}));
store.dispatch(createQuestion({question: 'what is minimum natural number?', answer: '0'}));
console.log(store.getState());
*/

//react

class Question extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      question: '',
      answer: ''
    }

    this.submitQuestion = this.submitQuestion.bind(this);
    this.answerChange = this.answerChange.bind(this);
    this.questionChange = this.questionChange.bind(this);
  }

  submitQuestion(){
    this.props.addQuestion({
      question: this.state.question,
      answer: this.state.answer
    });

    this.setState({
      ...this.state,
      question: '',
      answer: ''
    })
  }
  
  questionChange(e){
    this.setState({
      ...this.state,
      question: e.target.value
    })
  }

  answerChange(e){
    this.setState({
      ...this.state,
      answer: e.target.value
    })
  }

  render(){
    return (
      <div>
        <input type="text" onChange={this.questionChange} value={this.state.question} />
        <input type="text" onChange={this.answerChange} value={this.state.answer} />
        <button onClick={this.submitQuestion}>Create Question</button>
        <ul>
          {
            this.props.questions.map((question)=>{
              return (<li>Quiz Index: {this.props.quizIndex} - {question.question} - {question.answer}</li>)
            })
          }
        </ul>
      </div>
    )
  }
}

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
            this.props.quizzes.map((quiz, idx)=>{
            return (<li key={idx}>{quiz.name} - {quiz.class} - index: {idx}
            <br />
            <ConnectedQuestion quizIndex={idx}/>
            </li>)
            })
          }
        </ul>
      </div>
    )
  }
}

//react-redux


//use Container component in App component
class App extends React.Component{
  render(){
    return(
        <ConnectedQuiz />
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    quizzes: state.quizzes,
    questions: state.questions
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    addQuiz: (quiz) => {
      dispatch(createQuiz(quiz))
    },
    addQuestion: (question) => {
      dispatch(createQuestion(question))
    }
  }
}

//connect Quiz component to store
const ConnectedQuiz = connect(mapStateToProps, mapDispatchToProps)(Quiz);
//connect Question component to store
const ConnectedQuestion = connect(mapStateToProps, mapDispatchToProps)(Question);

//react-dom
//wrap all App with Provider component for store accessibility
ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
document.getElementById('root'));
