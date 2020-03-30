import fire from "../fire";

const db = fire.database();

const convertJSONtoArray = json => {
  let array = [];
  for (let key in json) {
    array.push(json[key]);
  }
  return array;
};

const resolverFunctions = {
  Query: {
    GetDecksByID(obj, args) {
      return db
        .ref("/decks")
        .orderByChild("/id")
        .equalTo(args.id)
        .once("value")
        .then(snapshot => {
          return convertJSONtoArray(snapshot.val());
        });
    },
    GetDecksByFormat(obj, args) {
      return db
        .ref("/decks")
        .orderByChild("format")
        .equalTo(args.format)
        .once("value")
        .then(snapshot => {
          return convertJSONtoArray(snapshot.val());
        });
    },
    GetDecksByCard(obj, args) {
      return db
        .ref("/decks")
        .orderByChild(
          `/cards/${args.cardName
            .replace(/'/g, "")
            .replace(/,/g, "")
            .replace(/ /g, "-")
            .toLowerCase()}`
        )
        .equalTo(true)
        .once("value")
        .then(snapshot => {
          return convertJSONtoArray(snapshot.val());
        });
    },
    GetDecksByArchetype(obj, args) {
      return db
        .ref("/decks")
        .orderByChild("format")
        .equalTo(args.archetype.format)
        .once("value")
        .then(snapshot => {
          return convertJSONtoArray(snapshot.val()).filter(deck => {

            let keyCards = args.archetype.keyCards || []
            let blacklist = args.archetype.blacklist || []

            const keyCardsReducer = (accumulator, currentValue) => {
              return (
                accumulator &&
                deck.cards[
                  currentValue
                    .replace(/'/g, "")
                    .replace(/,/g, "")
                    .replace(/ /g, "-")
                    .toLowerCase()
                ]
              );
            };

            const blacklistReducer = (accumulator, currentValue) => {
              return (
                accumulator ||
                deck.cards[
                  currentValue
                    .replace(/'/g, "")
                    .replace(/,/g, "")
                    .replace(/ /g, "-")
                    .toLowerCase()
                ]
              );
            };

            return keyCards.reduce(keyCardsReducer, true) && !blacklist.reduce(blacklistReducer,false)
          });
        });
    }
  }
};
export default resolverFunctions;
