import React, { Component } from "react";
import SelectedFoods from "./SelectedFoods";
import FoodSearch from "./FoodSearch";
import LoginControl from "./Auth/LoginControl";
import SaveEntryButton from "./InsertEntry/SaveEntryButton";

class App extends Component {

  /*
  constructor(props) {
    super(props);
    this.doSetUserProfile = this.doSetUserProfile.bind(this);
    this.setUserProfile = this.setUserProfile.bind(this);
    
    this.props.auth.doSetUserProfile = this.doSetUserProfile;
  }
  */

  state = {
    selectedFoods: [],
  };

  /*
  //Used to set the user profile when the tab is refreshed
  componentDidMount() {
    this.props.auth.getUserProfile(this.setUserProfile);
  }
  */

  removeFoodItem = itemIndex => {
    const filteredFoods = this.state.selectedFoods.filter(
      (item, idx) => itemIndex !== idx
    );
    this.setState({ selectedFoods: filteredFoods });
  };

  addFood = food => {
    const newFoods = this.state.selectedFoods.concat(food);
    this.setState({ selectedFoods: newFoods });
  };
  
  render() {
    const { selectedFoods } = this.state; //Q: Why are there brackets here around selectedFoods?

    return (
      <div className="App">
        <div className="ui text container">
          <SelectedFoods
            foods={selectedFoods}
            onFoodClick={this.removeFoodItem}
          />
          <FoodSearch onFoodClick={this.addFood} />

          <LoginControl 
            onRef={ref => (this.child = ref)}
            history={this.props.history}
            auth={this.props.auth}
            setUserProfile={this.setUserProfile}
            clearUserId={this.props.clearUserId}
          />

          <SaveEntryButton
            
          />
        </div>
      </div>
    );
  }
}

export default App;
