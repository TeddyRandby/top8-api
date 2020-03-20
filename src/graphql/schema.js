const {gql} = require('apollo-server-express');

const schema = gql`
  type getDeckByID  {
    "Fetch deck by id"
    id: Deck
  }

  type Deck {
    date: String,
    name: String,
    event: String,
    format: String,
    id: Int,
    mainboard: [Card],
    sideboard: [Card],
    player: String
  }

  type Card {
    name: String,
    count: Int
  }

`;

export default schema;
