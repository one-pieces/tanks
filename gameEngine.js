'use strict';

const assert = require('assert');
const thrift = require('thrift');
const PlayerServer = require('./gen-nodejs/PlayerServer');
const ttypes = require('./gen-nodejs/player_types');

const transport = thrift.TBufferedTransport;
const protocol = thrift.TBinaryProtocol;

const connection = thrift.createConnection('localhost', 9090, {
  transport: transport,
  protocol: protocol
});

connection.on('error', (err) => {
  assert(false, err);
});

const client = thrift.createClient(PlayerServer, connection);

client.uploadMap([
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 2, 2, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 2, 2, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 1, 2, 2, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 1, 2, 2, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 2, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
], () => {
  console.log('test uploadMap');
});

const gameOptions = new ttypes.Args({
  tankSpeed: 1,
  shellSpeed: 2,
  tankHP: 2,
  tankScore: 1,
  flagScore: 1,
  maxRound: 100,
  roundTimeoutInMs: 2000
})
client.uploadParamters(gameOptions, () => {
  console.log('test uploadParamters');
});

const tankIds = [0, 1, 2, 3];
client.assignTanks(tankIds, () => {
  console.log('test assignTanks');
});

const tanks = tankIds.map(id => {
  return new ttypes.Tank({
    id,
    pos: new ttypes.Position({
      x: id + 1,
      y: id + 1
    }),
    dir: ttypes.Direction.DOWN,
    hp: 2
  });
});
const shells = tankIds.map(id => {
  return new ttypes.Shell({
    id,
    pos: new ttypes.Position({
      x: 2, y: 2
    }),
    dir: ttypes.Direction.DOWN
  });
})
const state = new ttypes.GameState({
  tanks,
  shells,
  yourFlagNo: 0,
  enemyFlagNo: 0,
  flagPos: new ttypes.Position({
    x: Math.floor(19/2),
    y: Math.floor(19/2)
  })
});
client.latestState(state, () => {
  console.log('test latestState');
})
