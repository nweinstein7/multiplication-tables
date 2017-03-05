import React from 'react';
import ReactDOM from 'react-dom';
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock, Jumbotron, Row} from 'react-bootstrap';

export const MAX_MAX = 1000000

class App extends React.Component {

    constructor(props) {
        super(props)
        var min = 0
        var max = 15;
        this.state = {
            min: min,
            max: max,
            input1: this.getRandomInt(min, max),
            input2: this.getRandomInt(min, max)
        }
    }

    handleMaxMinChange(min, max) {
        this.setState({
            min: min,
            max: max
        })
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    handleAnswerChange(newAnswer) {
        this.setState({answer: newAnswer});
    }

    handleAnswerSubmit(e) {
        e.preventDefault();
        if (this.state.answer == this.state.input1 * this.state.input2) {
            this.setState({input1: this.getRandomInt(this.state.min, this.state.max),
                           input2: this.getRandomInt(this.state.min, this.state.max)})
        }
    }

    getAnswerValidationState() {
        if (this.state.answer == this.state.input1 * this.state.input2) {
            return 'success'
        }
        return 'error'
    }

    render() {
       return (
       <div className="container">
            <h1>Multiplication Drill</h1>
            <div style={{marginBottom: '15px'}}>
                <MinMaxPicker min={this.state.min}
                  max={this.state.max}
                  onSubmit={(min, max) => this.handleMaxMinChange(min, max)}/>
            </div>
            <GuessForm onSubmit={(e) => this.handleAnswerSubmit(e)}
                       validationState={this.getAnswerValidationState()}
                       input1={this.state.input1}
                       input2={this.state.input2}
                       onChange={(newAnswer) => this.handleAnswerChange(newAnswer)}
            />
        </div>
        )
    }
}

class GuessForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentAnswer: 0
        }
    }

    handleAnswer(e) {
        this.props.onSubmit(e);
        this.setState({currentAnswer: 0});
    }

    handleAnswerChange(e) {
        var newAnswer = parseInt(e.target.value) || 0;
        this.props.onChange(newAnswer);
        this.setState({currentAnswer: newAnswer});
    }

    render() {
        return (
            <div>
                <Jumbotron style={{textAlign: 'center'}}>
                    <h3>{this.props.input1} x {this.props.input2}</h3>
                </Jumbotron>
                <form onSubmit={(e) => this.handleAnswer(e)}>
                    <FormGroup validationState={this.props.validationState} bsSize="large">
                        <FormControl type="tel" placeholder="Your answer"
                        onChange={(e) => this.handleAnswerChange(e)}
                        value={this.state.currentAnswer}/>
                    </FormGroup>
                    <Button type="submit">
                    Submit
                    </Button>
                </form>
            </div>
        );
    }
}

class MinMaxPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newMax: props.max,
            newMin: props.min,
            editing: false
            }
    }
    
    validateMin() {
        return this.state.newMin <= this.state.newMax && this.state.newMin >= 0;
    }

    validateMax() {
        return this.state.newMax >= this.state.newMin && this.state.newMax <= MAX_MAX;
    }

    validate() {
        return this.validateMax() && this.validateMin()
    }

    setMax(e) {
        var newMax = parseInt(e.target.value) || 0;
        this.setState({newMax: newMax});
    }

    setMin(e) {
        var newMin = parseInt(e.target.value) || 0;
        this.setState({newMin: newMin});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.validate()) {
            this.props.onSubmit(this.state.newMin, this.state.newMax);
            this.setState({editing: false});
        }
    }

    render(){ 
        if (this.state.editing) {
            return (
                <div>       
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <FormGroup validationState={this.validateMin() ? 'success' : 'error'} bsSize="small">
                            <ControlLabel>Edit minimum</ControlLabel>
                            <FormControl type="tel" placeholder={this.props.min}
                            onChange={(e) => this.setMin(e)}
                            value={this.state.newMin}/>
                            <HelpBlock>Minimum must be less than maximum and greater than or equal to 0</HelpBlock>
                        </FormGroup>
                        <FormGroup validationState={this.validateMax() ? 'success' : 'error'} bsSize="small">
                            <ControlLabel>Edit maximum</ControlLabel>
                            <FormControl type="tel" placeholder={this.props.max}
                            onChange={(e) => this.setMax(e)}
                            value={this.state.newMax}/>
                            <HelpBlock>Maximum must be greater than minimum and less than or equal to {MAX_MAX.toLocaleString()}</HelpBlock>
                        </FormGroup>
                        <Button type="submit">
                        Edit
                        </Button>
                    </form>
                </div>
            )
        }
        return (
            <div>
                <p>Min: {this.props.min}</p>
                <p>Max: {this.props.max}</p>
                <Button onClick={(e) => this.setState({editing: true})}>
                    Edit
                </Button>
            </div>
            )

    }
}
 
ReactDOM.render(<App />, document.getElementById('root'))
