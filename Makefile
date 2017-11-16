server:
	supervisor -- server.js 9090

competitor:
	supervisor -- server.js 8080

game-engine:
	supervisor gameEngine.js

docker-server:
	echo "using docker images - ht:1.0.0 to run the server"
	docker run -p 9090:80 -ti ht:1.0.0 /data/start.sh

build-images:
	docker build -t ht:1.0.0 .

gen-thrift:
	thrift -r -gen js:node player.idl
