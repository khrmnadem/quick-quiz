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
    arr = [...this.state.questions, {quiz_id: this.props.quizid, question: this.state.question, answer: this.state.answer}];
    this.setState({
      question: '',
      answer: '',
      questions: arr
    })
  }

  render(){
    return (
      <div>
        <h4>Create Questions</h4>
        <label for="question">Question: </label>
        <input id="question" type="text" onChange={this.handleQuestion}/>
        <br />
        <label for="answer">Answer: </label>
        <input id="answer" type="text" onChange={this.handleAnswer}/>
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
      id: null,
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
    let arr = [...this.state.quizzes, {id: this.state.quizzes.length, name:this.state.name, class: this.state.class}];
    this.setState({
      quizzes: arr
    });
  }

  render(){
    
    return (
      <div>
        <h3>Quiz Component</h3>
        <h4>Create New Quiz</h4>
        
        <label for="quizName">Quiz Name: </label>        
        <input id="quizName" type="text" onChange={this.handleName}/>
        <br />
        <label for="quizClass">Quiz Class: </label>        
        <input id="quizClass" type="text" onChange={this.handleClass}/>
        <br />
        <button onClick={this.submitQuiz}>Create Quiz</button>
        <ul>
          {
            this.state.quizzes.map(quiz => {
              return <li>Quiz ID: {quiz.id} Quiz Name: {quiz.name} Quiz Class: {quiz.class} Question: <Question quizid={quiz.id}/></li>
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
