import React, { Component } from "react";
import axios from "axios";

const API_BASE = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deckId: "", decks: [] };
    this.getCard = this.getCard.bind(this);
  }

  // /new/shuffle
  async componentDidMount() {
    const url = `${API_BASE}/new/shuffle`;
    const response = await axios.get(url);
    this.setState({ deckId: response.data.deck_id });
  }

  async getCard() {
    const url = `${API_BASE}/${this.state.deckId}/draw/`;
    const card = await axios.get(url);
    console.log(card.data);
  }

  render() {
    return (
      <div>
        <h1>Deck of cards!</h1>
        <button onClick={this.getCard}>Give a card</button>
      </div>
    );
  }
}

export default Deck;
