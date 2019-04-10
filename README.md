A Demo UI for Wanchain POS Incentive Calculator.

# How to use

## Your can start with Docker simply

```
$ docker run -d -p 3000:3000 -p 8000:8000 -p 17717:17717 -v /YourGwanPath:/root/.wanchain molin0000/pos_ui
```
Then browse your `http://localhost:3000/` to view the website.

If you do not want to use docker, you can use the code to run as follow steps.

## Step 1 start a local gwan node
```
$ gwan --pluto --rpc
```

## Step 2 clone from git
```
$ git clone https://github.com/wanchain/pos-ui.git
$ git clone https://github.com/wanchain/pos-ui-server.git

```

## Step 3 yarn and start
```
$ cd pos-ui
$ yarn
$ yarn start
```
Open another terminal:
```
$ cd pos-ui-server
$ yarn
$ yarn start
```

## Step 4 Use the Web UI to calculate

Open browser to URL:

http://localhost:3000

finish.