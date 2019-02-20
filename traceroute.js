'use strict';

const Process = require('./process');

class Traceroute extends Process {
    constructor(sendwait = 0) {
        super('traceroute', ['-q', 1, '-z', sendwait]);
    }

    parseDestination(data) {
        const regex = /^traceroute\sto\s(?:[a-zA-Z0-9:.]+)\s\(([a-zA-Z0-9:.]+)\)/;
        
        const parsedData = new RegExp(regex, '').exec(data);

        let result = null;
        if (parsedData !== null) {
            result = parsedData[1];
        }

        return result;
    }

    parseHop(hopData) {
        const regex = /^\s*(\d+)\s+(?:([a-zA-Z0-9:.]+)\s+([0-9.]+\s+ms)|(\*))/;
        console.log(hopData)
        // const parsedData = new RegExp(regex, '').exec(hopData);

        let result = null;
        let parsedData = hopData.split(' ').filter(e => e !== '')
        if(parsedData[0] !== "traceroute"){
            result = {}
            result.hop = parseInt(parsedData[0], 10)
            let hostname = parsedData[1]            
            result.ip = hostname
            
            if(parsedData[2]){
                let ip = parsedData[2].replace(/[()]/g, '')
                if(ip !== hostname){
                    result.ip = ip
                    result.hostname = hostname
                }
            }

            if(parsedData[3]) result.rtt1 = `${parsedData[3]} ${parsedData[4]}`
        }    
        console.log(parsedData)
        console.log(result)

        return result;
    }
}

module.exports = Traceroute;
