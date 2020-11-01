import React, { Component } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";

const API_BASE = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deckId: "", cards: [], success: true };
    this.getCard = this.getCard.bind(this);
  }

  // /new/shuffle
  async componentDidMount() {
    const url = `${API_BASE}/new/shuffle`;
    const response = await axios.get(url);
    this.setState({ deckId: response.data.deck_id });
  }

  async getCard() {
    try {
      const url = `${API_BASE}/${this.state.deckId}/draw/`;
      const data = await axios.get(url);
      if (!data.data.success) {
        this.setState({ success: false });
        throw new Error("No card remaining!");
      }
      const card = data.data.cards[0];
      this.setState((st) => ({
        cards: [
          ...this.state.cards,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`,
          },
        ],
      }));
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const cards = this.state.cards.map((c) => (
      <Card key={c.id} name={c.name} image={c.image} />
    ));
    return (
      <div className="Deck">
        <h1 className="Deck-title">♦️ Card Dealer ♦️</h1>
        <h2 className="Deck-title subtitle">
          ♦️ A little demo made with React ♦️{" "}
        </h2>
        {this.state.success && (
          <button onClick={this.getCard}>Give a card</button>
        )}
        <div className="Deck-cards">{cards}</div>
      </div>
    );
  }
}

export default Deck;
