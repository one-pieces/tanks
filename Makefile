server:
	supervisor server.js

game:
	supervisor gameEngine.js

docker-server:
	echo "using docker images - ht:1.0.0 to run the server"
	docker run -p 9090:80 -ti ht:1.0.0 /data/start.sh

build-images:
	docker build -t ht:1.0.0 .

gen-thrift:
	thrift -r -gen js:node player.idl
