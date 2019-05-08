#!/bin/bash
#docker run -d -p 3000:3000 -p 8000:8000 -p 38545:8545 -v /home/molin/dockerfile/tmp:/root/.wanchain molin0000/pos_ui
cd ../go-wanchain/
git pull
make
./build/bin/gwan --pluto --datadir ~/dockerfile/tmp --port 16666 --rpc 

