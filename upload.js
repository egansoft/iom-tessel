// Uploads data to firebase
var https = require('https')
var http = require('http')

module.exports = (function(baseUrl){
	my = {}
	var id = Math.random()

	my.init = function() {
		var data = {id: id, receiving: false}
		var postData = JSON.stringify(data)
		console.log(postData)

		var request = https.request({
			host:'internet-of-mice.firebaseio.com',
			method:'POST',
			path:'/devices.json',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': postData.length
			}
		}, function(res){
			console.log('Status: ' + res.statusCode)
		})

		request.on('error', function(e) {
			console.log('Error: ' + e.message)
			console.log(JSON.stringify(e))
		})

		request.write(postData)
		request.end()

	}

	return my
})()
