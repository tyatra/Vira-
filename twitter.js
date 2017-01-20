request = require('request');
module.exports = {
  exec: (client, message, content, args) => {
    message.send("Understood leader, please wait a moment");
    pinned = content.match(/\bpin(?:ned)?\b/g);
    request('https://twitter.com/granbluefantasy', function (err, res, body) {
      body = body.slice(body.indexOf('id="timeline"'));
      body = body.slice(0, body.indexOf('class="stream-footer"'));
      body = body.split('<li class="js-stream-item').slice(1, -1);
      result = "";
      body.forEach(item => {
        if (!result) {
          if ((pinned && item.includes('js-pinned')) || (!pinned && !item.includes('js-pinned'))) {
            result = item.slice(item.indexOf('data-item-id="') + 14);
            result = result.slice(0, result.indexOf('"'));
            message.channel.sendMessage("https://twitter.com/granbluefantasy/status/" + result);
          }
        }
      });
    });
  }
}