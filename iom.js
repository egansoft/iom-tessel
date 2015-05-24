var tessel = require('tessel')
var accel = require('accel-mma84').use(tessel.port['A'])
var upload = require('./upload.js')

upload.init()
var accelData = [] // data that hasn't yet been pushed

var accelReady = false
var uploading = false

accel.on('ready', function () {
	accel.on('data', function (xyz) {
		// console.log('x:', xyz[0].toFixed(2),
		// 	'y:', xyz[1].toFixed(2),
		// 	'z:', xyz[2].toFixed(2))

		accelData.push({x: xyz[0], y: xyz[1], z: xyz[2]})
		accelReady = true
	})
})

accel.on('error', function(err){
	console.log('Error:', err)
})

var uploadAccelData = function() {
	uploading = true
	console.log('sending')

	var data = {dataPoints: accelData}
	accelData = []
	upload.sendData('/devices/' + upload.name + '/accelData.json', data, function() {
		uploading = false
	})

}


setInterval(function() {
	if(!accelReady || !upload.ready || uploading || accelData.length == 0)
		return
	else
		console.log('not ready')

	uploadAccelData()
}, 1000)
