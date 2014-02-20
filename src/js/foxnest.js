// Install app
function setupInstall(installButton, instructions) {
	if (navigator.mozApps) {
		var checkIfInstalled = navigator.mozApps.getSelf();
		checkIfInstalled.onsuccess = function () {
			if (checkIfInstalled.result) {
				// Already installed
				var installationInstructions = document.querySelector(instructions);
				if (installationInstructions) {
					installationInstructions.style.display = "none";
				}
			}
			else {
				var install = document.querySelector(installButton),
					manifestURL = location.href.substring(0, location.href.lastIndexOf("/")) + "/manifest.webapp";
				install.className = "show-install";
				install.onclick = function () {
					var installApp = navigator.mozApps.install(manifestURL);
					installApp.onsuccess = function(data) {
						install.style.display = "none";
					};
					installApp.onerror = function() {
						alert("Install failed\n\n:" + installApp.error.name);
					};
				};
			}
		};
	}
	else {
		console.log("Open Web Apps not supported");
	}
}

setupInstall('#install', '#installation-instructions');

// Reload content
var reload = document.querySelector("#reload");
if (reload) {
    reload.onclick = function () {
        location.reload(true);
    };
}

