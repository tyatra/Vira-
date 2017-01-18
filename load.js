const fs = require('fs');
module.exports = (client, callback) => {
  let commandList = fs.readdirSync('./commands/');
  client.commandRegex = [];
  client.commands = {};

  client.emote = { 
    "default": "http://puu.sh/tqBtl/d35fd4e6fc.jpg", 
    "serious": "http://puu.sh/tqBiv/846aed72cf.jpg", 
    "embarassed": "http://puu.sh/tqBC2/94be61d097.jpg", 
    "flustered": "http://puu.sh/tqBAc/47ee634e85.jpg", 
    "annoyed": "http://puu.sh/tqBwL/c2157fc477.jpg",
    "smile": "http://puu.sh/tqByH/9815580e26.jpg" 
  }

  loadTime = Date.now();
  for (i = 0; i < commandList.length; i++) {
    let item = commandList[i];
    if (item.match(/\.js$/)) {
      taken = Date.now() - loadTime;
      loadTime += taken;
      delete require.cache[require.resolve(`./commands/${item}`)];
      client.commands[item.slice(0, -3).replace(/-/g, ' ')] = require(`./commands/${item}`);
      client.commands[item.slice(0, -3).replace(/-/g, ' ')].count = 0;
      client.commandRegex.push(`\\b${item.slice(0, -3).replace(/-/g, ' ')}\\b`);
      console.log(`Command ${item.slice(0, -3)} loaded. Took ${taken}ms`);
    }
  }
  client.commandRegex = new RegExp(client.commandRegex.join('|'));
  callback();
}