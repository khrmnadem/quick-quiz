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
    arr.splice(id, 1); //remove 1 element from id means remove element which has id id
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
              return <li key={idx} id={question_id}> <b>Question:</b> {question.question} <b>Answer:</b> {question.answer} <button onClick={this.deleteQuestion}>Delete Question</button></li>
            })
          }
        </ul>
        <h3>Create Questions</h3>
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
    this.deleteQuiz = this.deleteQuiz.bind(this);
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
  deleteQuiz(e){
    let id = e.target.parentNode.id.replace('quiz_', '');
    let arr = this.state.quizzes;
    arr.splice(id, 1); //remove 1 element from id means remove element which has id id
    this.setState({
      quizzes: arr
    });
  }

  render(){
    
    return (
      <div>
        <h2>Quiz Component</h2>
        <h3>Create New Quiz</h3>
        
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
              let quiz_id = 'quiz_'+idx;
              return <li key={idx} id={quiz_id}><b>Quiz ID:</b> {idx} <b>Quiz Name:</b> {quiz.name} <b>Quiz Class:</b> {quiz.class} <button onClick={this.deleteQuiz}>Delete Quiz</button> <Question quizId={idx}/></li>
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
