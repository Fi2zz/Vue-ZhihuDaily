module.exports =function () {

    // if (!ip) {
    const os = require('os');
    const network = os.networkInterfaces();
    if (os.platform().toLowerCase() === 'win32') {
        for (let key in network) {
            if (network[key][0].mac !== "00:00:00:00:00:00") {
                for (let i = 0; i < network[key].length; i++) {
                    if ((network[key][i].family).toLowerCase() === "ipv4") {
                        return network[key][i].address
                    }
                }
            }
        }
    } else {
        let networkInterfaces = network['en0'];
        for (let network  of networkInterfaces) {
            if (network.family === 'IPv4') {
                return network.address
            }
        }
    }
}
