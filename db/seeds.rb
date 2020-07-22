# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Server.destroy_all
Membership.destroy_all
Channel.destroy_all
Conversation.destroy_all
Message.destroy_all
Friendship.destroy_all

demo, toosh, hiker, sinus, marre, buth, can,
sewpra, ribs, van, kimky, ecter, wrath,
north, zaroky, mul, cinch, cubber, boots, 
gritz, pide, dojo, trap, man = User.create([
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
    username: "Sewpra",
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
    username: "Mulciber",
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
    username: "Boots",
    email: "boots@email.com",
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
    username: "Trapunzel",
    email: "trapunzel@email.com",
    password: "password",
  }, {
    username: "Manstar",
    email: "manstar@email.com",
    password: "password",
  }
])

 gang, np, z, st = Server.create([
  {
    name: "The Gang",
    owner_id: hiker.id
  }, {
    name: "No Pandas",
    owner_id: sewpra.id
  }, {
    name: "z 1 1",
    owner_id: toosh.id
  }, {
    name: "Santa Teresa",
    owner_id: demo.id,
  }
])

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
demo.friend_request(dojo)
dojo.accept_request(demo)
demo.friend_request(mul)
mul.accept_request(demo)
demo.friend_request(trap)
trap.accept_request(demo)
demo.friend_request(man)
man.accept_request(demo)
demo.friend_request(sewpra)
wrath.friend_request(demo)
van.friend_request(demo)


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

np_mem = [sewpra.id, ribs.id, north.id, cubber.id, cinch.id, van.id, kimky.id, zaroky.id, ecter.id, wrath.id, gritz.id, boots.id, mul.id, pide.id, demo.id]
gang_mem = [hiker.id, demo.id, can.id, sinus.id, marre.id, toosh.id, buth.id,]
z_mem = [toosh.id, demo.id, marre.id]
st_mem = [demo.id, hiker.id, sinus.id, van.id, cinch.id, ribs.id, sewpra.id]

Membership.create([
  {
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
    alias: "vañitas",
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
    alias: "Chunky Patel",
    subscribeable: gang,
  }, {
    member_id: can.id,
    alias: "Quackmeister",
    subscribeable: gang,
  }, {
    member_id: sinus.id,
    alias: "Jake the Cake",
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
    member_id: toosh.id,
    subscribeable: z,
  }, {
    member_id: marre.id,
    alias: "Toffla",
    subscribeable: z,
  }, {
    member_id: demo.id,
    alias: "Cub",
    subscribeable: z,
  }, {
    member_id: demo.id,
    alias: "Archimboldi",
    subscribeable: st,
  }, {
    member_id: hiker.id,
    alias: "Lalo Cura",
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
  }
])

kale, dodo, gsquad = Conversation.create([
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
  }
])

kale_mem = [demo.id, dojo.id, trap.id, man.id, mul.id]
gsquad_mem = [wrath.id, van.id, ecter.id, mul.id, zaroky.id, demo.id, kimky.id]
kale.group_bundle(kale_mem)
dodo.bundle(demo.id, toosh.id)
gsquad.group_bundle(gsquad_mem)

wasteland = File.readlines("db/seed_texts/wasteland.txt", chomp: true)
voyage = File.readlines("db/seed_texts/voyage.txt", chomp: true)
prufrock = File.readlines("db/seed_texts/prufrock.txt", chomp: true)

# gang
Message.create(wasteland.map { |txt| {author_id: gang_mem.sample, messageable: ggang, body: txt } } )
Message.create(voyage.map { |txt| {author_id: gang_mem.sample, messageable: memes, body: txt } } )
Message.create(prufrock.map { |txt| {author_id: gang_mem.sample, messageable: recs, body: txt } } )
Message.create(wasteland.map { |txt| {author_id: gang_mem.sample, messageable: tv, body: txt } } )

# np
Message.create(prufrock.map { |txt| {author_id: np_mem.sample, messageable: gnp, body: txt } } )
Message.create(wasteland.map { |txt| {author_id: np_mem.sample, messageable: strats, body: txt } } )
Message.create(voyage.map { |txt| {author_id: np_mem.sample, messageable: ch, body: txt } } )
Message.create(prufrock.map { |txt| {author_id: np_mem.sample, messageable: mp, body: txt } } )

# z
Message.create(voyage.map { |txt| {author_id: z_mem.sample, messageable: gz, body: txt } } )
Message.create(wasteland.map { |txt| {author_id: z_mem.sample, messageable: post, body: txt } } )
Message.create(prufrock.map { |txt| {author_id: z_mem.sample, messageable: dab, body: txt } } )

# st
Message.create(voyage.map { |txt| {author_id: st_mem.sample, messageable: gst, body: txt } } )
Message.create(voyage.map { |txt| {author_id: st_mem.sample, messageable: bb, body: txt } } )
Message.create(prufrock.map { |txt| {author_id: st_mem.sample, messageable: tsd, body: txt } } )
Message.create(wasteland.map { |txt| {author_id: st_mem.sample, messageable: vr, body: txt } } )

# kale
Message.create(wasteland.map { |txt| {author_id: kale_mem.sample, messageable: kale, body: txt } } )

# dodo
Message.create(voyage.map { |txt| {author_id: [demo.id, toosh.id].sample, messageable: dodo, body: txt } } )

# gsquad
Message.create(prufrock.map { |txt| {author_id: gsquad_mem.sample, messageable: gsquad, body: txt } } )