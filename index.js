var Request = require('request');

var SteamMarket = function (options)
{
	this._jar = Request.jar();
	this.sessionid = options.sessionid;

	this._request = Request.defaults({ jar: this._jar });
	options.webCookie.forEach((function(name)
	{
		((function (cookie)
		{
			this._jar.setCookie(Request.cookie(cookie), 'https://steamcommunity.com');
		}).bind(this))(name);
	}).bind(this));
};

SteamMarket.prototype.sellItem = function (item,callback){
	var options = {
	method:"POST",
        url: 'https://steamcommunity.com/market/sellitem/',
        headers: {
        	"Accept": "*/*",
		    'Origin': 'http://steamcommunity.com',
		    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36',
		    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		    'Referer': 'http://steamcommunity.com/my/inventory/',
		    'Accept-Encoding': 'gzip, deflate',
		    'Accept-Language': 'ru,en-US;q=0.8,en;q=0.6,en-AU;q=0.4'
		},
		form: {
		    "sessionid": this.sessionid,
		    "appid": item.appid,
		    "contextid": item.contextid,
		    "assetid": item.assetid,
		    "amount": 1,
		    "price": item.price
		     }
		};
		this._request(options, function(error, response, body){
			var body = JSON.parse(body);
			if (body) {
				if (callback) {
					if (body.success == true) {
						callback(null,{assetid:item.assetid,price:item.price,status:"Waiting for confirmation"});
					} else {
						callback(body.message,null);
					}
				}
			}

		});

}

module.exports = SteamMarket;
