import React from 'react';
import FlashCardsContainer from './FlashCardsContainer.jsx';
import Description from '../components/Description.jsx';
import Resources from '../components/Resources.jsx';

class UnitContainer extends React.Component {

  // inelegant way of reRendering the page after a change has been made
  // reRender() {
  //   const unitId = this.props.id;

  //   const flashCardsURL = `/units/${unitId}`;

  //   fetch(flashCardsURL)
  //   .then(res => res.json())
  //   .then(data => {
  //     this.setState({
  //       flashCards: data,
  //       didLoad: true,
  //     }, () => console.log('STATE AFTER SETTING STATE',this.state));
  //   })
  //   .catch(err => console.log('ERROR IN FLASHCARDS:', err));
  // }

  updateCurrentFlashCardsAndResources() {
    const unitId = this.props.currentUnitData.id.toString();
    const flashCardsURL = `/units/${unitId}`;

    fetch(flashCardsURL)
      .then((response) => response.json())
      .then((data) => {
        // console.log('flashCard Data', data.flashCards.length)
        const questionAnswerArray = this.props.flashCardQuestionAnswers(data.flashCards.length)
        this.props.updateDrilledState({
            questionsArray: questionAnswerArray,
            currentFlashCards: data.flashCards,
            currentResources: data.resources,
          })
      }).catch((error) => console.log('ERROR GET FLASHCARDS: ', error));
  }

  componentDidMount() {
    this.updateCurrentFlashCardsAndResources();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.currentFlashCards === this.props.currentFlashCards) {
      this.updateCurrentFlashCardsAndResources();
    }
  }

  render() {
    /***
     * conditonally render to get state
     * a bit slow need to come back and refactor/fix
     */
    if (this.props.currentFlashCards === null) {
      return <h1>WE LOADING BABY</h1>
    }

    return (
      <div className="container">
        <h1>{ this.props.currentUnitData.unit }</h1>
        <div className="outerBox">
            { this.props.currentFlashCards !== null ?
              <div>
                <Description
                  description={ this.props.currentUnitData.description }
                  sub_units={ this.props.currentUnitData.sub_units } />
                <FlashCardsContainer
                  flashCards={ this.props.currentFlashCards }
                  id={ this.props.currentUnitData.id.toString() }
                  addFlashCard={ this.props.addFlashCard }
                  flipFlashCard={ this.props.flipFlashCard }
                  deleteFlashCard={ this.props.deleteFlashCard }
                  questionsArray={ this.props.questionsArray }
                  />
                <Resources
                  resources={ this.props.currentResources } />
              </div> :
              <div></div> }
        </div>
      </div>
    );
  }
}

export default UnitContainer;