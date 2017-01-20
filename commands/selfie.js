request = require('request');
module.exports = {
  exec: (client, message, content, args) => {
    message.send("Really Leader? Please wait...");
    request({
      url: 'https://safebooru.donmai.us/posts.json?random=true&limit=1&tags=jeanne_%28granblue_fantasy%29',
      json: true
    }, function (err, temp, body) {
      if (!err && body.length > 0 && body[0].file_url) {
        selfie = {
          image: { url: "https://safebooru.donmai.us/" + body[0].file_url },
          description: "Stop! leader I'm not ready!",
          thumbnail: { url: client.emote.embarassed },
          color: 0xff0000
        }
        message.channel.sendMessage("", { embed: selfie });
      } else {
        message.send("leader, the camera is broken");
        console.log(err);
        console.log(body);
      }
    });
  }
}
