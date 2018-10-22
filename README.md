# Muse-Example
Communicate with MuseJS Headset via OSC

Requirements: Node, Docker, Docker-Compose

## Install
```
git clone https://github.com/olgn/muse-example.git
```
## Run
```
cd muse-example
docker-compose build
docker-compose up # Optional -d to run in a detached state 
```

# Muse-Server Standalone
Obtain data from the Muse EEG headset via WebBluetooth and
send over OSC

## Build
```
cd muse-server
docker build . -t muse-server
```

## Stream
Disconnect your Muse from any bluetooth links with your computer.
Turn your Muse on and ensure that it is in 'search' mode.
```
sudo docker run --privileged --rm -it --network host --name muse muse-server
```