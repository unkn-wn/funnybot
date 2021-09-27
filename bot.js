const eris = require('eris');

const BOT_ID = "[bot api key here]";

const bot = new eris.Client(BOT_ID);
console.log("Running... ");


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


var prev_user = '';

bot.on('messageCreate', async (msg) => {

	const content = msg.content;

	const botWasMentioned = msg.mentions.find(
		mentionedUser => mentionedUser.id === bot.user.id,
	);

	if(msg.author.bot) return;
	if(msg.author.id==bot.user.id) return;
	
	if(botWasMentioned){
		await sleep(3000);
		await msg.channel.createMessage("what");
		return;
	}
	

	//////// Ignore any message that doesn't start with the correct prefix. 
	if (!(content.toLowerCase().includes(" im "))&&!(content.toLowerCase().includes(" i'm "))&&!(content.toLowerCase().includes(" i’m "))&&!(content.toLowerCase().includes(" i am "))&&!(content.toLowerCase().startsWith("i'm "))&&!(content.toLowerCase().startsWith("im "))&&!(content.toLowerCase().startsWith("i’m "))&&!(content.toLowerCase().startsWith("i am "))&&!(content.toLowerCase().startsWith("imagine ")) && (!(content.toLowerCase() == "i’m")&&!(content.toLowerCase() == "im")&&!(content.toLowerCase() == "i am")&&!(content.toLowerCase() == "i'm")) && (prev_user != msg.author.username)) {

		return;

	}

	if ((content.toLowerCase() == "i’m")||(content.toLowerCase() == "im")||(content.toLowerCase() == "i am")||(content.toLowerCase() == "i'm")){

		prev_user = msg.author.username;
		console.log("\nuser: "+msg.author.username);
		return;

	} else if (prev_user == msg.author.username){
		console.log("message: "+content);
		console.log("response: hi "+content);
		prev_user = "";
		try {
			await sleep(2000);
			await msg.channel.createMessage("hi "+content);
        	} catch (err) {
			console.warn('Failed to respond to mention.');
			console.warn(err);
       		}
		return;
	}

	

	const parts = content.split(' ').map(s => s.trim()).filter(s => s);
	const parts2 = content.split(' ').map(s => s.trim().toLowerCase()).filter(s => s);



	var index = parts2.indexOf("im");
	if (index==-1){
		index = parts2.indexOf("i'm");
		if (index==-1){
			index = parts2.indexOf("am");
			if(index==-1){
				index = parts2.indexOf("i’m");
				if(index==-1){
					index = parts2.indexOf("imagine");
				}
			}
		}
	}

	var temp = 1;

	if((parts2[index+1]=="im")||(parts2[index+1]=="i'm")||(parts2[index+1]=="i’m")){
		parts.splice(0, index+2);
	}else if((parts2[index+1]=="i")&&(parts2[index+2]=="am")){
		parts.splice(0, index+3);
	}else if(parts2[index]=="imagine"){
		parts.splice(0, index+1);
		temp = 2;
	}else{
		parts.splice(0, index+1);
	}

	console.log("\nuser: "+msg.author.username);

	var mesg = " ";
	if(temp==1){
		if (getRandomInt(2) == 1){
			mesg = 'hi '+parts.join(' ');
		} else {
			if(parts.join(' ') == (msg.author.username)){
				mesg = 'hi '+parts.join(' ');
			} else {
				mesg = 'no, you\'re '+msg.author.username;
			}
		}
	}else{
		mesg = 'lol i cant even imagine '+(parts.join(' '))+', bro';
	}

	console.log('message: '+msg.content);
	console.log('response: '+mesg);
        try {
		await sleep(2000);
		await msg.channel.createMessage(mesg);
        } catch (err) {
		console.warn('Failed to respond to mention.');
		console.warn(err);
       	}
});

bot.on('error', err => {
   console.warn(err);
});

bot.connect();
