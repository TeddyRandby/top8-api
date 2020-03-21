const {gql} = require('apollo-server-express');

const schema = gql`
  type Query  {
    "Fetch decks by their unique id."
    GetDecksByID(id:Int!): [Deck],
    "Fetch decks by format."
    GetDecksByFormat(format:Format!): [Deck],
    "Fetch decks by a card in their 75."
    GetDecksByCard(cardName:String!): [Deck],
    "Fetch decks that fit into an archetype."
    GetDecksByArchetype(archetype:Archetype!): [Deck]
  }

  input Archetype {
    format: Format!,
    keyCards: [String],
    blacklist: [String]
  }

  enum Format {
    MODERN
    LEGACY
    PIONEER
    DUEL
    PAUPER
    STANDARD
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
