var tessel = require('tessel')
var accel = require('accel-mma84').use(tessel.port['A'])
var upload = require('./upload.js')

upload.init()
var data = [] // data that hasn't yet been pushed

var accelReady = false

accel.on('ready', function () {
	accel.on('data', function (xyz) {
		// console.log('x:', xyz[0].toFixed(2),
		// 	'y:', xyz[1].toFixed(2),
		// 	'z:', xyz[2].toFixed(2))

		data.push({x: xyz[0], y: xyz[1], z: xyz[2]})
		accelReady = true
	})
})

accel.on('error', function(err){
	console.log('Error:', err)
})

setInterval(function() {
	if(!accelReady || !upload.ready)
		return

	console.log('ready')
}, 3000)
