var Server = IgeClass.extend({
	classId: 'Server',
	Server: true,

	init: function (options) {
		var self = this;

		// Add the networking component
		ige.addComponent(IgeNetIoComponent)
			// Start the network server
			.network.start(2000, function () {
				// Networking has started so start the game engine
				ige.start(function (success) {
					// Check if the engine started successfully
					if (success) {
						// Create some network commands
						ige.network.on('connect', function () {});
						ige.network.on('disconnect', function () {});

						// Add the network stream component
						ige.network.addComponent(IgeStreamComponent)
							.stream.sendInterval(30) // Send a stream update once every 30 milliseconds
							.stream.start(); // Start the stream

						// Accept incoming network connections
						ige.network.acceptConnections(true);

						//Create the scene
						self.mainScene = new IgeScene2d()
							.id('mainScene');
						
						self.backgroundScene = new IgeScene2d()
						 .id('backgroundScene')
						 .layer(0)
						 .mount(self.mainScene);

						// Add the camera to the engine
						self.camera = new IgeViewport()
                            .id('vp1')
							.autoSize(true)
							.scene(self.mainScene)
							.drawBounds(true)
                            .mount(ige);
					}
				});
			});
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Server; }