'use strict';

const thrift = require('thrift');
const PlayerServer = require('./gen-nodejs/PlayerServer');
const ttypes = require('./gen-nodejs/player_types');

// docker容器端口需为80，9090为本地调试客户端连接端口，8080为本地调试对手客户端端口
var args = process.argv.splice(2);
const port = args[0];
let map = [];
let gameOptions = {};
let tankIds = [];
let latestState = {};

const server = thrift.createServer(PlayerServer, {
  uploadMap(gamemap, callback) {
    console.log('gamemap', gamemap);
    map = gamemap;
    callback(null);
  },
  uploadParamters(args, callback) {
    console.log('args', args);
    gameOptions = args;
    callback(null);
  },
  assignTanks(tanks, callback) {
    // console.log('tanks', tanks);
    tankIds = tanks;
    callback(null);
  },
  latestState(state, callback) {
    // console.log('state', state);
    latestState = state;
    callback(null);
  },
  getNewOrders(callback) {
    const orders = [];
    // console.log('orders', orders);
    callback(null, orders);
  }
});

server.listen(port, () => {
  console.log(`Thrift server listening ${port}`);
});