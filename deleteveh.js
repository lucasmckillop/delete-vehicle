const config = require("../config/config.json");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  let userargs = args.join(" ").split("++");
  let vehid = userargs[0];
  let noid = new MessageEmbed()
      .setTitle('Invalid ID')
      .setDescription(`Please provide an ID\n\nUsage: ${client.config.prefix}deleteveh <vehicle ID>\n Without <>`)
      .setColor(`#2ABF3F`)
    if(!vehid) message.channel.send(noid)



  client.connection.query(`SELECT * FROM vehicle WHERE vecid=${userargs[0]}`, async (err, row, resolve) => {
    if(err) throw err;
    if(row[0]) {
        client.connection.query(`DELETE FROM vehicle WHERE vecid=${userargs[0]}`, async (err, row) => {
            if(err) throw err;
            let yes = new MessageEmbed();
            yes.setColor('#2ABF3F');
            yes.setFooter(client.config.embed.footer);
            yes.setTitle(`Successfully Removed`);
            yes.setDescription(
              `I successfully removed Vehicle ID ${userargs[0]} from the DB!`
            );
            yes.setTimestamp();
            message.channel.send(embed).catch((e) => {});
        });
    } else {
        let embed = new MessageEmbed()
          .setColor(`#D60E23`)
          .setDescription(`${userargs[0]} is **not** a valid vehicle ID.`);
        message.channel.send(embed)
    }
});

};

module.exports.help = {
  name: "deleteveh",
};
