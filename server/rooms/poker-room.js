const Room = require('colyseus').Room;
const request = require('superagent');
const filter = require('lodash/filter')
const indexOf = require('lodash/indexOf');

class PokerRoom extends Room {

  constructor () {
    super();

    this.setState({
      id: '',
      status: 'WAIT_FOR_PLAYER',
      cards: [],
      players: {},
    });
  }

  onInit (options) {
    this.setPatchRate( 1000 / 20 );
    this.setSimulationInterval( this.update.bind(this));
    this.state.id = options.id;

    console.log("ChatRoom created! By the connection of ", options.username);
  }

  async onAuth (options) {
    const response = await request.get(`https://api.trello.com/1/member/me?key=41dc823a6d432451695c2dc7e81e104a&token=${options.token}`)
    return response.body;
  }

  requestJoin (options, isNew) {
    if (!options.id && !options.token && !options.fullName) {
      return false;
    }
    console.log(options.username, "request join!");
    return isNew || options.id === this.state.id;
  }

  onJoin (client, options, auth) {
    console.log(auth.username, "client joined!");
    this.state.players[client.sessionId]= auth;
    console.log("Number of connected clients", this.clients.length);
  }

  onLeave (client) {
    console.log("client left!", client.sessionId);
    delete this.state.players[client.sessionId];
  }

  onMessage (client, data) {
    console.log(data, "received from", this.state.players[client.sessionId].username);
    if (data.reset) {
      this.state.cards = [];
      this.state.status = 'WAIT_FOR_PLAYER';
    } else if (data.card) {
      const card = filter(this.state.cards, (card) => card.from === this.state.players[client.sessionId]);
      if(card.length === 0) {
        this.state.cards.push({ ...data.card, from: this.state.players[client.sessionId] });
      } else {
        const index = indexOf(this.state.cards, card[0]);
        this.state.cards[index] = { ...data.card, from: this.state.players[client.sessionId] };
      }
      this.send(client, { response: 'received' });
    } else {
      this.send(client, { response: 'wrong message given' });
    }
  }

  update () {
    // console.log("num clients:", Object.keys(this.clients).length);
    if (this.clients.length > 0 && 
      this.state.cards.length === this.clients.length && 
      this.state.status !=='ALL_PLAYER_PLAYED' 
    ) {
      console.log('All players have played')
      this.state.status = 'ALL_PLAYER_PLAYED';
    }
  }

  onDispose () {
    console.log("Dispose ChatRoom");
  }

}

module.exports = PokerRoom;
