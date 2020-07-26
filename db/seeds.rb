require "open-uri"

# clear records
User.destroy_all
Server.destroy_all
Membership.destroy_all
Channel.destroy_all
Conversation.destroy_all
Message.destroy_all
Friendship.destroy_all

# users
demo, toosh, hiker, sinus, marre, buth, can,
sewpra, ribs, van, kimky, ecter, wrath,
north, zaroky, mul, cinch, cubber, boots, 
gritz, pide, dojo, trap, man, ric, shy = User.create([
  {
    username: "Demogorgon",
    email: "demo@demo.com",
    password: "password",
  }, {
    username: "ttoosh",
    email: "ttoosh@email.com",
    password: "password",
  }, {
    username: "Hiker Jon",
    email: "skate4money@email.com",
    password: "password",
  }, {
    username: "sinusboy",
    email: "sinus@email.com",
    password: "password",
  }, {
    username: "Tuppen",
    email: "tuppen@email.com",
    password: "password",
  }, {
    username: "butharat",
    email: "buth@email.com",
    password: "password",
  }, {
    username: "quackmak",
    email: "can@email.com",
    password: "password",
  }, {
    username: "sewpra",
    email: "sewp@email.com",
    password: "password",
  }, {
    username: "Ribsx",
    email: "ribs@email.com",
    password: "password",
  }, {
    username: "vanitas",
    email: "van@email.com",
    password: "password",
  }, {
    username: "Kimky",
    email: "kimk@email.com",
    password: "password",
  }, {
    username: "Ecter",
    email: "ecter@email.com",
    password: "password",
  }, {
    username: "Colin",
    email: "wrath@email.com",
    password: "password",
  }, {
    username: "Northwood",
    email: "north@email.com",
    password: "password",
  }, {
    username: "Zaroky",
    email: "zarokes@email.com",
    password: "password",
  }, {
    username: "Mul",
    email: "mul@email.com",
    password: "password",
  }, {
    username: "Cinch",
    email: "cinch@email.com",
    password: "password",
  }, {
    username: "Cubber",
    email: "cubs@email.com",
    password: "password",
  }, {
    username: "Hunter",
    email: "kappa@email.com",
    password: "password",
  }, {
    username: "gritz",
    email: "gritz@email.com",
    password: "password",
  }, {
    username: "Pide",
    email: "pide@email.com",
    password: "password",
  }, {
    username: "DojoBuns",
    email: "dojobuns@email.com",
    password: "password",
  }, {
    username: "Rapwnzel",
    email: "rapwnzel@email.com",
    password: "password",
  }, {
    username: "Manstar",
    email: "manstar@email.com",
    password: "password",
  }, {
    username: "ric joe",
    email: "ricjoe@email.com",
    password: "password",
  }, {
    username: "shy",
    email: "shyxpie@email.com",
    password: "password",
  }, 
])

# user avatars
demo.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/demo.jpg"), filename: "demo.jpg")
toosh.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/ttoosh_avatar.gif"), filename: "ttoosh_avatar.gif")
hiker.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/hiker_avatar.jpg"), filename: "hiker_avatar.jpg")
sinus.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/sinus_avatar.jpg"), filename: "sinus_avatar.jpg")
marre.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/tuppen_avatar.png"), filename: "tuppen_avatar.png")
can.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/quackmak_avatar.jpg"), filename: "quackmak_avatar.jpg")
sewpra.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/sewpra_avatar.png"), filename: "sewpra_avatar.png")
ribs.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/ribs_avatar.png"), filename: "ribs_avatar.png")
van.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/van_avatar.png"), filename: "van_avatar.png")
kimky.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/kimky_avatar.png"), filename: "kimky_avatar.png")
ecter.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/ecter_avatar.png"), filename: "ecter_avatar.png")
cubber.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/cubber_avatar.png"), filename: "cubber_avatar.png")
wrath.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/wrath_avatar.png"), filename: "wrath_avatar.png")
north.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/north_avatar.png"), filename: "north_avatar.png")
zaroky.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/zaroky_avatar.png"), filename: "zaroky_avatar.png")
mul.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/mul_avatar.png"), filename: "mul_avatar.png")
boots.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/hunter_avatar.png"), filename: "hunter_avatar.png")
gritz.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/gritz_avatar.png"), filename: "gritz_avatar.png")
pide.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/pide_avatar.png"), filename: "pide_avatar.png")
dojo.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/dojo.png"), filename: "dojo.png")
trap.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/trapunzel_avatar.png"), filename: "trapunzel_avatar.png")
man.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/manstar_avatar.jpg"), filename: "manstar_avatar.jpg")
ric.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/ricjoe_avatar.png"), filename: "ricjoe_avatar.png")
shy.avatar.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/shy_avatar.png"), filename: "shy_avatar.png")

# servers
 z, np, st, gang = Server.create([
  {
    name: "z 1 1",
    owner_id: toosh.id
  }, {
    name: "No Pandas",
    owner_id: sewpra.id,
  }, {
    name: "Santa Teresa",
    owner_id: demo.id,
  }, {
    name: "The Gang",
    owner_id: hiker.id,
  }, 
])

# server icons
gang.icon.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/gang_icon.jpg"), filename: "gang_icon.jpg")
np.icon.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/np_icon.png"), filename: "np_icon.png")
st.icon.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/st_icon.jpg"), filename: "st_icon.jpg")

# friends
demo.friend_request(toosh)
toosh.accept_request(demo)
demo.friend_request(marre)
marre.accept_request(demo)
demo.friend_request(hiker)
hiker.accept_request(demo)
demo.friend_request(sinus)
sinus.accept_request(demo)
demo.friend_request(can)
can.accept_request(demo)
demo.friend_request(shy)
shy.accept_request(demo)
demo.friend_request(dojo)
dojo.accept_request(demo)
demo.friend_request(mul)
mul.accept_request(demo)
demo.friend_request(trap)
trap.accept_request(demo)
demo.friend_request(man)
man.accept_request(demo)
demo.friend_request(ric)
ric.accept_request(demo)
demo.friend_request(sewpra)
wrath.friend_request(demo)
van.friend_request(demo)

# text channels
ggang, gnp, gz, gst  = Channel.create([
  {
    name: "general",
    server_id: gang.id,
  }, {
    name: "general",
    server_id: np.id,
  }, {
    name: "general",
    server_id: z.id,
  }, {
    name: "general",
    server_id: st.id,
  }])

memes, strats, bb, post, recs, tv, tsd, vr, ch, mp, dab = Channel.create([
  {
    name: "memes",
    topic: ":omegalul:",
    server_id: gang.id,
  }, {
    name: "5head-strats",
    topic: ":thinking:",
    server_id: np.id,
  }, {
    name: "bifurcaria-bifurcata",
    server_id: st.id,
  }, {
    name: "post-paradiso",
    server_id: z.id
  }, {
    name: "music-recs",
    topic: "boots & pants",
    server_id: gang.id,
  }, {
    name: "tv-talk",
    server_id: gang.id,
  }, {
    name: "the-savage-detectives",
    server_id: st.id,
  }, {
    name: "visceral-realism",
    server_id: st.id,
  }, {
    name: "code-help",
    server_id: np.id,
  }, {
    name: "M+",
    server_id: np.id,
  }, {
    name: "d-a-b",
    server_id: z.id
  }
])

# server members
np_mem = [sewpra.id, ribs.id, north.id, cubber.id, cinch.id, van.id, kimky.id, zaroky.id, ecter.id, wrath.id, gritz.id, boots.id, mul.id, pide.id, demo.id]
gang_mem = [hiker.id, demo.id, can.id, sinus.id, marre.id, toosh.id, buth.id, mul.id]
z_mem = [toosh.id, demo.id, marre.id, mul.id]
st_mem = [demo.id, hiker.id, sinus.id, van.id, cinch.id, ribs.id, sewpra.id, mul.id, can.id, trap.id, ric.id, shy.id]

Membership.create([
  {
    member_id: toosh.id,
    alias: "Tbag",
    subscribeable: z,
  }, {
    member_id: marre.id,
    alias: "Tups",
    subscribeable: z,
  }, {
    member_id: demo.id,
    subscribeable: z,
  }, {
    member_id: mul.id,
    alias: "Cub",
    subscribeable: z,
  }, {
    member_id: demo.id,
    alias: "Archimboldi",
    subscribeable: st,
  }, {
    member_id: hiker.id,
    alias: "Arturo Belano",
    subscribeable: st,
  }, {
    member_id: sinus.id,
    alias: "Oscar Fate",
    subscribeable: st,
  }, {
    member_id: van.id,
    alias: "Norton",
    subscribeable: st,
  }, {
    member_id: cinch.id,
    alias: "Pelletier",
    subscribeable: st,
  }, {
    member_id: ribs.id,
    alias: "Morini",
    subscribeable: st,
  }, {
    member_id: sewpra.id,
    alias: "Espinoza",
    subscribeable: st,
  }, {
    member_id: mul.id,
    alias: "Lalo Cura",
    subscribeable: st,
  }, {
    member_id: can.id,
    alias: "Chucho Flores",
    subscribeable: st,
  }, {
    member_id: trap.id,
    alias: "Cesárea Tinajero",
    subscribeable: st,
  }, {
    member_id: ric.id,
    alias: "Amalfitano",
    subscribeable: st,
  }, {
    member_id: shy.id,
    alias: "Ulises Lima",
    subscribeable: st,
  }, {
    member_id: toosh.id,
    alias: "Laura Jáuregui",
    subscribeable: st,
  }, {
    member_id: sewpra.id,
    subscribeable: np,
  }, {
    member_id: ribs.id,
    alias: "Big Chillin",
    subscribeable: np,
  }, {
    member_id: north.id,
    alias: "Askar",
    subscribeable: np,
  }, {
    member_id: cubber.id,
    subscribeable: np,
  }, {
    member_id: cinch.id,
    subscribeable: np,
  }, {
    member_id: van.id,
    alias: "van",
    subscribeable: np,
  }, {
    member_id: kimky.id,
    subscribeable: np,
  }, {
    member_id: zaroky.id,
    subscribeable: np,
  }, {
    member_id: ecter.id,
    subscribeable: np,
  }, {
    member_id: wrath.id,
    alias: "Wrath",
    subscribeable: np,
  }, {
    member_id: gritz.id,
    alias: "Pallywackr",
    subscribeable: np,
  }, {
    member_id: boots.id,
    subscribeable: np,
  }, {
    member_id: mul.id,
    alias: "Mulzilla",
    subscribeable: np,
  }, {
    member_id: pide.id,
    alias: "Pide Tods",
    subscribeable: np,
  }, {
    member_id: demo.id,
    subscribeable: np,
  }, {
    member_id: hiker.id,
    subscribeable: gang,
  }, {
    member_id: demo.id,
    subscribeable: gang,
  }, {
    member_id: can.id,
    alias: "Quackmeister",
    subscribeable: gang,
  }, {
    member_id: sinus.id,
    alias: "Jake the Snake",
    subscribeable: gang,
  }, {
    member_id: marre.id,
    subscribeable: gang,
  }, {
    member_id: toosh.id,
    alias: "DAB",
    subscribeable: gang,
  }, {
    member_id: buth.id,
    subscribeable: gang,
  }, {
    member_id: mul.id,
    alias: "Keith Lightning",
    subscribeable: gang,
  }, 
])

# conversations
kale, dabcity, gsquad, shyx = Conversation.create([
  {
  owner_id: demo.id,
  group: true,
  name: "If Looks Could Kale",
  }, { 
    owner_id: toosh.id
  }, {
  owner_id: wrath.id,
  group: true,
  name: "Wrath & Friends",
  icon: open("https://disarray-chat-seeds.s3.amazonaws.com/gmod_icon.jpg")
  }, { 
    owner_id: shy.id
  }
])

# conversation icons
kale.icon.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/kale_icon.png"), filename: "kale_icon.png")
gsquad.icon.attach(io: open("https://disarray-chat-seeds.s3.amazonaws.com/gmod_icon.jpg"), filename: "gmod_icon.jpg")

# conversation members
kale_mem = [demo.id, dojo.id, trap.id, man.id, mul.id, ric.id]
gsquad_mem = [wrath.id, van.id, ecter.id, mul.id, zaroky.id, demo.id, kimky.id]

shyx.bundle(demo.id, shy.id)
gsquad.group_bundle(gsquad_mem)
dabcity.bundle(demo.id, toosh.id)
kale.group_bundle(kale_mem)

# seed text
file_names = ["wasteland", "voyage", "prufrock", "abstinence", "contest", "serenity_now", "soup_nazi", "strike", "summer_of_george", "virgin", "yada_yada"]
texts = file_names.map { |name| File.readlines("db/seed_texts/#{name}.txt", chomp: true)}

# messages
## gang
Message.create(texts.sample.map { |txt| {author_id: gang_mem.sample, messageable: ggang, body: txt } } )
Message.create(texts.sample.map { |txt| {author_id: gang_mem.sample, messageable: memes, body: txt } } )
Message.create(texts.sample.map { |txt| {author_id: gang_mem.sample, messageable: recs, body: txt } } )
Message.create(texts.sample.map { |txt| {author_id: gang_mem.sample, messageable: tv, body: txt } } )

## np
Message.create(texts.sample.map { |txt| {author_id: np_mem.sample, messageable: gnp, body: txt } } )
Message.create(texts.sample.map { |txt| {author_id: np_mem.sample, messageable: strats, body: txt } } )
Message.create(texts.sample.map { |txt| {author_id: np_mem.sample, messageable: ch, body: txt } } )
Message.create(texts.sample.map { |txt| {author_id: np_mem.sample, messageable: mp, body: txt } } )

## z
Message.create(texts.sample.map { |txt| {author_id: z_mem.sample, messageable: gz, body: txt } } )
Message.create(texts.sample.map { |txt| {author_id: z_mem.sample, messageable: post, body: txt } } )
Message.create(texts.sample.map { |txt| {author_id: z_mem.sample, messageable: dab, body: txt } } )

## st
Message.create(texts.sample.map { |txt| {author_id: st_mem.sample, messageable: gst, body: txt } } )
Message.create(texts.sample.map { |txt| {author_id: st_mem.sample, messageable: bb, body: txt } } )
Message.create(texts.sample.map { |txt| {author_id: st_mem.sample, messageable: tsd, body: txt } } )
Message.create(texts.sample.map { |txt| {author_id: st_mem.sample, messageable: vr, body: txt } } )

## kale
Message.create(texts.sample.map { |txt| {author_id: kale_mem.sample, messageable: kale, body: txt } } )

## dabs
Message.create(texts.sample.map { |txt| {author_id: [demo.id, toosh.id].sample, messageable: dabcity, body: txt } } )

## shy
Message.create(texts.sample.map { |txt| {author_id: [demo.id, shy.id].sample, messageable: shyx, body: txt } } )

## gsquad
Message.create(texts.sample.map { |txt| {author_id: gsquad_mem.sample, messageable: gsquad, body: txt } } )