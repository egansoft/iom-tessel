// Uploads data to firebase
var https = require('https')
var http = require('http')

module.exports = (function(baseUrl){
	my = {}
	my.ready = false

	my.sendData = function(path, data) {
		var postData = JSON.stringify(data)
		console.log(postData)

		var request = https.request({
			host:'internet-of-mice.firebaseio.com',
			method:'POST',
			path:path,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': postData.length
			}
		}, function(res){
			console.log('Status: ' + res.statusCode)

			res.on('data', function (chunk) {
				console.log('BODY: ' + chunk)
				my.name = JSON.parse(chunk).name
				my.ready = true
			})

		})

		request.on('error', function(e) {
			console.log('Error: ' + e.message)
			console.log(JSON.stringify(e))
		})

		request.write(postData)
		request.end()
	}

	my.init = function() {
		my.id = (new Date()).getTime() % 1000000 // b/c Math.random doesn't work
		var data = {id: my.id, receiving: false}
		my.sendData('/devices.json', data)
	}

	return my
})()
