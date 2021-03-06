import React, { Component } from "react";
import axios from "axios";

const API_BASE = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deckId: "" };
  }

  // /new/shuffle
  async componentDidMount() {
    const url = `${API_BASE}/new/shuffle`;
    const response = axios.get(url);
    console.log(response);
  }

  render() {
    return <h1>Deck of cards!</h1>;
  }
}

export default Deck;
