import ReactDOM from 'react-dom';
import React from 'react';
import {Provider, connect} from 'react-redux';
import { createStore } from 'redux';

//redux
//action types
const CREATE_QUIZ = 'CREATE_QUIZ';
const CREATE_QUESTION = 'CREATE_QUESTION';
const REMOVE_QUESTION = 'REMOVE_QUESTION';
const REMOVE_QUIZ= 'REMOVE_QUIZ';
const SHOW_QUIZZES= 'SHOW_QUIZZES';
const SELECT_QUIZ= 'SELECT_QUIZ';


//state has quizzes array and questions array
const initialState = {
  quizzes: [],
  questions: [],
  selectedQuiz: {}
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

const removeQuestion = (id)=>{
  return {
    type: REMOVE_QUESTION,
    payload: id
  }
}

const removeQuiz = (id) =>{
  return {
    type: REMOVE_QUIZ,
    payload: id
  }
}

const showQuizzes = () => {
  return {
    type: SHOW_QUIZZES
  }
}

const selectQuiz = (id) => {
  return {
    type: SELECT_QUIZ,
    payload: id
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
    case REMOVE_QUESTION:
      updatedQuestions = updatedQuestions.filter(question=>question.id !== action.payload);
      return {
        ...state,
        questions: updatedQuestions
      }
      break;
    case REMOVE_QUIZ:
      updatedQuizzes = updatedQuizzes.filter(quiz=>quiz.id !== action.payload);
      return {
        ...state,
        quizzes: updatedQuizzes
      }
      break;
    case SHOW_QUIZZES:
      return {
        ...state,
        quizzes: updatedQuizzes
      }
      break;
    case SELECT_QUIZ:
      return {
        ...state,
        selectedQuiz: updatedQuizzes.find(quiz=>quiz.id == action.payload)
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
      id: null,
      quiz_id: null,
      question: '',
      answer: ''
    }

    this.submitQuestion = this.submitQuestion.bind(this);
    this.answerChange = this.answerChange.bind(this);
    this.questionChange = this.questionChange.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);
  }

  submitQuestion(){
    this.props.addQuestion({
      id: this.props.questions.length,
      question: this.state.question,
      answer: this.state.answer,
      quiz_id: this.props.quizIndex
    });

    this.setState({
      ...this.state,
      question: '',
      answer: ''
    })
  }

  removeQuestion(id){
    this.props.removeQuestion(id);
    this.setState({
      ...this.state
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
            this.props.questions.filter(question => question.quiz_id === this.props.quizIndex).map((question, idx)=>{
                let index = 'question_'+idx;
                return (<li key={idx}>{question.question} - {question.answer}
                <button onClick={()=>this.removeQuestion(question.id)}>Remove Question</button>
                </li>)
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
      id: null,
      name: '',
      class: ''
    }

    this.nameChange = this.nameChange.bind(this);
    this.classChange = this.classChange.bind(this);
    this.submitQuiz = this.submitQuiz.bind(this);
    this.removeQuiz = this.removeQuiz.bind(this);
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
      id: this.props.quizzes.length,
      name:this.state.name,
      class:this.state.class
    });
    this.setState({
      ...this.state,
      name: '',
      class: ''
    })
  }

  removeQuiz(id){
    this.props.removeQuiz(id);
    //remove questions that have removen quiz's id
    this.props.questions.filter(question=>question.quiz_id == id).map(question=>this.props.removeQuestion(question.id));
    
    this.setState({
      ...this.state
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
            return (<li key={idx}>{quiz.name} - {quiz.class} - index: {quiz.id}
            <button onClick={()=>this.removeQuiz(quiz.id)}>
              Remove Quiz
            </button>
            <br />
            <ConnectedQuestion quizIndex={quiz.id} />
            </li>)
            })
          }
        </ul>
      </div>
    )
  }
}

class Student extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      selectedQuiz: null,
      studentAnswers: [],
      score: 0,
      percentage : null,
      totalAnswer: 0
    }

    this.showQuizzes = this.showQuizzes.bind(this);
    this.selectQuiz = this.selectQuiz.bind(this);
    this.assessAnswers = this.assessAnswers.bind(this);
  }

  showQuizzes(){
    this.setState({
      ...this.state
    })
  }

  selectQuiz(e){
    // console.log(e.target.value); //value of option
    this.props.selectQuiz(e.target.value); //This selectQuiz is action creator in redux
    
    this.setState({
      ...this.state
    })
  }

  assessAnswers(e){
    let answers = [];
    let results = [];
    let studentScore = 0;
    let studentPercentage = null;
    this.props.questions.filter(question=>question.quiz_id===this.props.selectedQuiz.id).forEach(question=>{
      let answerId = "answer_"+question.id;
      answers.push(document.getElementById(answerId).value);
      if(answers[question.id] === question.answer){
        results.push(true);
        studentScore++;

      }else{
        results.push(false);

      }
    
    let totalAnswer = answers.length
    studentPercentage = studentScore / totalAnswer * 100;

    this.setState({
      ...this.state,
      score : studentScore,
      percentage : studentPercentage,
      totalAnswer
    });
    });
  }

  render(){
    
    return (
      <div>
        <hr />
        <h2>Taking Quiz</h2>
        <h3>Select Quiz:</h3>
        <select onFocus={this.showQuizzes} onChange={this.selectQuiz}>
        <option>Select quiz</option>
        {
          this.props.quizzes.map(quiz=>{
            return (<option value={quiz.id}>{quiz.name}</option>)
          })
        }
        </select>
        <hr />
        <h3>{this.props.selectedQuiz.name}</h3>
          {
            this.props.questions.filter(question=>question.quiz_id===this.props.selectedQuiz.id).map((question, idx)=>
            {
            let answerId = 'answer_'+idx
            return (
            <div className="card mt-3">
              <div className="card-header"><strong>Question {idx+1}</strong></div>
              <div className="card-body">{question.question}</div>
              <div className="card-footer btn-group">
                <label className="mr-2">Your answer: </label><input id={answerId} type="text" />
              </div>
            </div>)
            })
          }

          <button className="btn btn-success" onClick={this.assessAnswers}>Submit Your Answers</button>
          <h3>Result: {this.state.score} right answer of {this.state.totalAnswer} questions. {Math.ceil(this.state.percentage)}%</h3>
      </div>
    );

  }
}

//react-redux


//use Container component in App component
class App extends React.Component{
  render(){
    return(
    <div>
      <ConnectedQuiz />
      <ConnectedStudent />
    </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    quizzes: state.quizzes,
    questions: state.questions,
    selectedQuiz: state.selectedQuiz
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    addQuiz: (quiz) => {
      dispatch(createQuiz(quiz))
    },
    addQuestion: (question) => {
      dispatch(createQuestion(question))
    },
    removeQuestion: (id) => {
      dispatch(removeQuestion(id))
    },
    removeQuiz: (id) => {
      dispatch(removeQuiz(id))
    },
    showQuizzes: () => {
      dispatch(showQuizzes())
    },
    selectQuiz: (id) => {
      dispatch(selectQuiz(id))
    }
  }
}

//connect Quiz component to store
const ConnectedQuiz = connect(mapStateToProps, mapDispatchToProps)(Quiz);
//connect Question component to store
const ConnectedQuestion = connect(mapStateToProps, mapDispatchToProps)(Question);
//connect Student component to store 
const ConnectedStudent = connect(mapStateToProps, mapDispatchToProps)(Student);

//react-dom
//wrap all App with Provider component for store accessibility
ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
document.getElementById('root'));
