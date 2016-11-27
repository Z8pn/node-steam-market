node-steam-market
======

a small module giving you the ability to sell items on the steam community market.

###basic functunality 
```js
var steamCommunityMarket = require('steam-market');
steamMarket = new steamCommunityMarket(
		{
			sessionid:       sessionID,
			webCookie:       cookies
		});
```

best way to implement this is by simply executing it after the "webSession" event from lets say "node-steam-user".

# Functions

### sellItem(item[, callback])
- `item` -a object with the following content
	- `appid` - the appid from the game you want to sell a item from.
	- `contextid`- contextid from the apps item
	- `assetid`- items assetid
	- `price` - price in cents e.g. 1$ would be 100
- `callback` - Optional. Called when we sale sale is commited and waiting for confirmation.
	- `error` - either null or a error message
	- `result` - when successful a object with item info ( assetid,price,status )

```js
		steamMarket.sellItem({
			appid: "730", 
			contextid: "2",
			assetid: "",
			price: price
		},function(err,res) {

		});
```
