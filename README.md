# top8-api
API for MTGTOP8 data.

######The data scraping (as of right now) has to be initiated manually by me. This means the data may go stale if I forget to updated it

######I do plan on automating it soon

This is a graphQL api, so all requests should go to this endpoint:

https://us-central1-top8-api.cloudfunctions.net/api

There are 4 kinds of queries available:

### GetDecksByID
##### Arguments
An integer, corresponding to the id of the deck.

### GetDecksByFormat
##### Arguments
A string, corresponding to the format. Must be a member of the enumeration:

 *  MODERN
 *  LEGACY
 *  PIONEER
 *  DUEL
 *  PAUPER
 *  STANDARD

### GetDecksByCard
##### Arguments
A String representing the card name. Apostrophes, spaces, and capitalization don't matter. (extra spaces will).

* DeAtH's ShADow      -> this will work just fine.
* death's **[multiple spaces here]** shadow   -> this will not work.

### GetDecksByArchetype
##### Arguments
By far the most interesting query. This request demands an Archetype Object as part of the request:

    input Archetype {
      format: Format!,
      keyCards: [String],
      blacklist: [String]
    }
     
 **format:** This property is required. It defines the format the archetype applies to.
 
 **keyCards:** This property is optional. This array of card names defines cards which *must* be in returned decks.
 
 **blacklist:** This property is optional. This array of card names defines cards which *must not* be in returned decks.
 
 
 Leaving both keyCards and blacklist absent will essentially perform a getDecksByFormat() query.

## Response

All queries will respond with an array of Deck objects. If no decks matched the query, the array will be empty.

#### Deck

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

#### Card

    type Card {
     name: String,
     count: Int
    }
