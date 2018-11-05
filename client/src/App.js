import React, { Component } from "react";
import SelectedFoods from "./SelectedFoods";
import FoodSearch from "./FoodSearch";
import LoginControl from "./Auth/LoginControl";
import SaveEntryButton from "./InsertEntry/SaveEntryButton";
import Requests from "./Requests";

class App extends Component {

  state = {
    selectedFoods: [],
  };

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
            user={this.props.user}
            onRef={ref => (this.child = ref)}
            history={this.props.history}
            auth={this.props.auth}
            setUserProfile={this.setUserProfile}
            clearUserId={this.props.clearUserId}
            insertUserIfNew={this.props.requests.insertUserIfNew}
          />

          <SaveEntryButton
            
          />
        </div>
      </div>
    );
  }
}

export default App;
