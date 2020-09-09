/// Discord \\\
const Discord = require('discord.js')
const client = new Discord.Client()
/// Mongoose \\\
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://bot:bot@cluster0.skqmv.mongodb.net/database', {useNewUrlParser: true, useUnifiedTopology: true })
const Schema = mongoose.Schema
const dataSchema = new Schema({
    gameID: String, // String là viết tắt cho {type: String}
    userID:  String, 
    result:   String,
    seed: String,
    timestamp: String,
    date: { type: Date, default: Date.now }
})
const data = mongoose.model('data', dataSchema);

/// Auth \\\
const auth = require('./configs/auth.json')

/// Start running bot \\\
client.on('ready', () => {
    console.log(`Đã đăng nhập ${client.user.tag}!`)
	client.user.setPresence({
        status: "online",
        game: {
            name: "[/help] Gambling Bot",
            type: "PLAYING"
        }
    }); 
});

/// Main \\\
client.on('message', message => {
	if (message.channel.type === 'dm') return
    const prefix = auth.prefix
    if (message.author.id === '701684904148336681') {
        try {
			var embed = message.embeds[0].message.embeds[0]
			console.log(message.embeds[0].message.embeds[0].description)
		} catch(err) {console.log('Err')}
    }
	if (message.content.startsWith(prefix)) {
		const args = message.content.slice(prefix.length).trim().split(/ +/g)
    	const command = args.shift().toLowerCase()
		const msgarr = message.content.split(' ')
		
		/// Function hỗ trợ \\\

		//Wait
		function wait(ms, cb) {
		   setTimeout(cb, ms)
		}
		//Random number
		function random(length) {
			var result           = '';
			var characters       = '0123456789';
			var charactersLength = characters.length;
			for ( var i = 0; i < length; i++ ) {
				result += characters.charAt(Math.floor(Math.random() * charactersLength));
		   }
		   return result;
		}

			/// Commands \\\
		
		// Hey / Ping
		if(command === 'ping' || command === 'hey') {
			message.channel.send('Here, I\'m GamblingBot ♦️ ♥️ ♠️ ♣️. Goodluck 🎊 🎉')
		}
		
		// Info
		if (command === 'info') {
			let embed = {
			  "title": "GamblingBot",
			  "description": "Bot được phát triển bởi **[Rek#1868](https://facebook.com/teemo.love.tristana)** - một người có hứng thú với mấy con Bot Discord :3",
			  "color": 3918126,
			  "timestamp": Date.now(),
			  "footer": {
				"icon_url": "https://i.ibb.co/s95kXb7/received-690490878476954.png",
				"text": "BoCt vẫn đang trong giai đoạn phát triển"
			  },
			  "thumbnail": {
				"url": "https://i.ibb.co/s95kXb7/received-690490878476954.png"
			  },
			  "author": {
				"name": "Thông tin về GamblingBot",
				"url": "https://facebook.com/teemo.love.tristana",
				"icon_url": "https://i.ibb.co/s95kXb7/received-690490878476954.png"
			  },
			  "fields": [
				{
				  "name": "Developer <:dev:728545575313866782>",
				  "value": "**[Rek#1868](https://facebook.com/teemo.love.tristana)**",
				  "inline": true
				},
				{
				  "name": "Website <:search:728544707520495676>",
				  "value": "**Sẽ sớm cập nhật**",
				  "inline": true
				},
				{
				  "name": "Server <:discord:728546537034219530>",
				  "value": "**[Bot Discord](https://discord.gg/jZSVVsu)**",
				  "inline": true
				},
				{
				  "name": "Phát triển dựa trên <:djs:728549126635257938>",
				  "value": "**[Discord.JS](https://discord.js.org)**",
				  "inline": true
				},
				{
				  "name": "Muốn trở thành Người đóng góp <:sponsor:728549788227862570>",
				  "value": "**Donate cho mình qua [Facebook](https://facebook.com/teemo.love.tristana) nhé :3**",
				  "inline": true
				}
			  ]
			}
			message.channel.send({ embed })
		}
		
		// List commands
		if (command === 'help' || command === 'h') {
			let embed = {
				"description": "Cảm ơn bạn đã sử dụng GamblingBot \n **[Prefix là / nha](localhost)**",
				"color": 8057653,
				"timestamp": Date.now(),
				"footer": {
					"icon_url": "https://i.ibb.co/s95kXb7/received-690490878476954.png",
					"text": "Danh sách commands của GamblingBot"
				},
				"thumbnail": {
					"url": "https://i.ibb.co/s95kXb7/received-690490878476954.png"
				},
				"author": {
					"name": "Danh sách Commands của GamblingBot",
					"icon_url": "https://cdn.discordapp.com/attachments/661174569264218154/728542030552105020/2003263.png"
				},
				"fields": [
					{
					"name": "***Blackjack***",
					"value": "**/blackjack <số coin>** hoặc **/bj <số coin>** "
					}
				]
			}
			message.channel.send({ embed })
        }
        
        //Test
        if (command === 'test') {
            const newdata = new data({
                gameID: 'gameID', // String là viết tắt cho {type: String}
                userID: message.author.id, 
                result: 'result',
                seed: 'seed',
                timestamp: Date.now()
            })
            newdata.save().then(() => {
                message.channel.send('OK')
            })
        }
    }

    /// Commands without prefix \\\

    // Tag Bot
    if(message.mentions.users.first() === client.user) {
        message.channel.send('Yoo yoo, ai vừa nhắc tới GamblingBot ♦️ ♥️ ♠️ ♣️ vậy ta')
    }

})

client.login(auth.token)