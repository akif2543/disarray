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

demo, sewpra, ribs, van, kimky, 
ecter, toosh, hiker, sinus, marre, 
zaroky, north, anita, relevee, cinch, 
cubber, boots, buth, daphni, ruby = User.create([
  {
    username: "Demogorgon",
    email: "demo@demo.com",
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
    email: "ecter@email.com ",
    password: "password",
  }, {
    username: "ttoosh",
    email: "toosh@email.com",
    password: "password",
  }{
    username: "Hiker Jon",
    email: "skate4money@email.com",
    password: "password",
  }, {
    username: "sinusboy",
    email: "snus@email.com  ",
    password: "password",
  }, {
    username: "Marre",
    email: "marre@email.com",
    password: "password",
  }, {
    username: "Zaroky",
    email: "zarokes@email.com",
    password: "password",
  }, {
    username: "Northwood",
    email: "north@email.com",
    password: "password",
  }, {
    username: "Anita",
    email: "anita@email.com",
    password: "password",
  }, {
    username: "Relevee",
    email: "relevee@email.com",
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
    username: "butharat",
    email: "buth@email.com",
    password: "password",
  }, {
    username: "daphni",
    email: "daphni@email.com",
    password: "password",
  }, {
    username: "Ruby",
    email: "ruby@email.com",
    password: "password",
  }
])

bnp, avi, dfr, fro, gang, z, dnd, dp, trr, tsd  = Server.create([
  {
    name: "Boots & Pants",
    owner_id: boots.id
  }, {
    name: "Aviato",
    owner_id: demo.id
  }, {
    name: "Daphni's Fun Room",
    owner_id: daphni.id
  }, {
    name: "For Rubyists Only",
    owner_id: ruby.id
  }, {
    name: "The Gang",
    owner_id: hiker.id
  }, {
    name: "z 1 1",
    owner_id: toosh.id
  }, {
    name: "Do Not Disturb",
    owner_id: buth.id
  }, {
    name: "Dad Party",
    owner_id: marre.id
  }, {
    name: "The Red Room",
    owner_id: relevee.id
  }, {
    name: "The Savage Detectives",
    owner_id: cinch.id,
  }
])

[bnp, avi, dfr, fro, gang, z, dnd, dp, trr, tsd].each(&:bundle)

Channel.create([
  {
    name: "p-bar-sundays",
    server_id: bnp.id,
  }, {
    name: "japanese-jazz-only",
    server_id: bnp.id,
  }, {
    name: "lo-fi",
    server_id: bnp.id,
  }, {
    name: "incubator",
    server_id: avi.id,
  }, {
    name: "the-screaming-room",
    server_id: avi.id,
  }, {
    name: "weirdchamp",
    server_id: avi.id,
  }, {
    name: "spoiler-talk",
    server_id: dfr.id,
  }, {
    name: "code-help",
    server_id: dfr.id,
  }, {
    name: "memes",
    topic: ":omegalul:"
    server_id: gang.id,
  }, {
    name: "music-recs",
    server_id: gang.id,
  }, {
    name: "tv-talk",
    server_id: gang.id,
  }, {
    name: "rails",
    server_id: fre.id,
  }, {
    name: "mmm-that-syntactic-sugar",
    server_id: fro.id,
  }, {
    name: "oop-there-it-is",
    server_id: fro.id,
  }, {
    name: "valorant",
    server_id: dp.id,
  }, {
    name: "pubg",
    server_id: dp.id,
  }, {
    name: "cod",
    server_id: dp.id,
  }, {
    name: "bifurcaria-bifurcata",
    server_id: tsd.id,
  }, {
    name: "sonora",
    server_id: dp.id,
  }, {
    name: "made-you-look",
    server_id: dnd.id,
  }, {
    name: "post-paradiso",
    server_id: z.id
  }, {
    name: "d-a-b",
    server_id: z.id
  }
])

Membership.create([
  {
    member_id: sewpra,
    subscribeable: bnp,
  }, {
    member_id: ribs,
    subscribeable: bnp,
  }, {
    member_id: north,
    subscribeable: bnp,
  }, {
    member_id: cubber,
    subscribeable: bnp,
  }, {
    member_id: cinch,
    subscribeable: bnp,
  }, {
    member_id: demo,
    subscribeable: gang,
  }, {
    member_id: hiker,
    subscribeable: gang,
  }, {
    member_id: sinus,
    subscribeable: gang,
  }, {
    member_id: marre,
    subscribeable: gang,
  }, {
    member_id: ttoosh,
    subscribeable: gang,
  }, {
    member_id: van,
    subscribeable: avi,
  }, {
    member_id: kimky,
    subscribeable: avi,
  }, {
    member_id: zaroky,
    subscribeable: avi,
  }, {
    member_id: ecter,
    subscribeable: avi,
  }, {
    member_id: demo,
    subscribeable: avi,
  }, {
    member_id: marre,
    subscribeable: z,
  }, {
    member_id: hiker,
    subscribeable: dp,
  }, {
    member_id: sinus,
    subscribeable: dp,
  }, {
    member_id: demo,
    subscribeable: tsd,
  }, {
    member_id: anita,
    subscribeable: tsd,
  }, {
    member_id: daphni,
    subscribeable: tsd,
  }, {
    member_id: ruby,
    subscribeable: tsd,
  }, {
    member_id: buth,
    subscribeable: fro,
  }, {
    member_id: relevee,
    subscribeable: fro,
  }, {
    member_id: toosh,
    subscribeable: fro,
  }, {
    member_id: demo,
    subscribeable: fro,
  }, {
    member_id: ribs,
    subscribeable: dfr,
  }, {
    member_id: van,
    subscribeable: dfr,
  }
])
