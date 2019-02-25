import React, { Component } from 'react';
class Question extends Component {

  constructor(props){
    super(props);
    this.state = {
      quiz_id: null,
      question: '',
      answer: '',
      questions: []
    }
    
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleQuestion = this.handleQuestion.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
  }

  
  handleQuestion(e){
    this.setState({
      question: e.target.value
    });
  }
  handleAnswer(e){
    this.setState({
      answer: e.target.value
    });
  }
  submitQuestion(){
    let arr = this.state.questions;
    arr = [...this.state.questions, {quiz_id: this.props.quizId, question: this.state.question, answer: this.state.answer}];
    this.setState({
      question: '',
      answer: '',
      questions: arr
    })
  }
  deleteQuestion(e){
    // console.log(e.target.parentNode.id); we have index question_indexnumber
    let id = e.target.parentNode.id.replace('question_', '');
    let arr = this.state.questions;
    arr = [...arr.slice(0, id), ...arr.slice(id+1)]
    this.setState({
      questions: arr
    });
  }

  render(){
    return (
      <div>
        <ul>
          {
            this.state.questions.map((question,idx)=>{
              let question_id = 'question_'+idx;
              return <li key={idx} id={question_id}>Question: {question.question} Answer: {question.answer} <button onClick={this.deleteQuestion}>Delete</button></li>
            })
          }
        </ul>
        <h4>Create Questions</h4>
        <label htmlFor="question">Question: </label>
        <input id="question" value={this.state.question} type="text" onChange={this.handleQuestion}/>
        <br />
        <label htmlFor="answer">Answer: </label>
        <input id="answer" value={this.state.answer} type="text" onChange={this.handleAnswer}/>
        <br />
        <button onClick={this.submitQuestion}>Add Question</button>
      </div>
    );
  }
}

class Quiz extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      class: '',
      quizzes: []      
    }

    this.handleName = this.handleName.bind(this);
    this.handleClass = this.handleClass.bind(this);
    this.submitQuiz = this.submitQuiz.bind(this);
  }

  handleName(e){
    this.setState({
      name: e.target.value
    });
  }
  handleClass(e){
    this.setState({
      class: e.target.value
    });
  }
  submitQuiz(){
    let arr = [...this.state.quizzes, {name:this.state.name, class: this.state.class}];
    this.setState({
      quizzes: arr,
      name: '', //for input clear
      class: ''
    });
  }

  render(){
    
    return (
      <div>
        <h3>Quiz Component</h3>
        <h4>Create New Quiz</h4>
        
        <label htmlFor="quizName">Quiz Name: </label>        
        <input id="quizName" value={this.state.name} type="text" onChange={this.handleName}/>
        <br />
        <label htmlFor="quizClass">Quiz Class: </label>        
        <input id="quizClass" value={this.state.class} type="text" onChange={this.handleClass}/>
        <br />
        <button onClick={this.submitQuiz}>Create Quiz</button>
        <ul>
          {
            this.state.quizzes.map((quiz, idx) => {
              return <li key={idx}>Quiz ID: {idx} Quiz Name: {quiz.name} Quiz Class: {quiz.class} <Question quizId={idx}/></li>
            })
          }
        </ul>
      </div>
    );
  }
}

//a container component
class App extends Component {

  render() {
    return (
      <div>
        <h1>Quick Quiz App</h1>
        <Quiz />
      </div>
    );
  }
}

export default App;
