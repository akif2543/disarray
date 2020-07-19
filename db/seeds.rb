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
north, zaroky, mul, cinch, 
cubber, boots, gritz, pide, dojo, = User.create([
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
  }, 
])

 gang, np, z, st = Server.create([
  {
    name: "The Gang",
    owner_id: hiker.id
  }, {
    name: "No Pandas",
    owner_id: sewp.id
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

ggang, gnp, gz, gst, memes, strats, bb, post = Channel.create([
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
  }, {
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

Membership.create([
  {
    member_id: sewpra.id,
    subscribeable: np,
  }, {
    member_id: ribs.id,
    alias: "Big Chillin"
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
    alias: "Quackmeister"
    subscribeable: gang,
  }, {
    member_id: sinus.id,
    alias: "Jake the Cake"
    subscribeable: gang,
  }, {
    member_id: marre.id,
    subscribeable: gang,
  }, {
    member_id: toosh.id,
    alias: "DAB"
    subscribeable: gang,
  }, {
    member_id: buth.id,
    subscribeable: gang,
  }, {
    member_id: toosh.id,
    subscribeable: z,
  }, {
    member_id: marre.id,
    alias: "Toffla"
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
    member_id: sewp.id,
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
    owner_id: demo.id
  }, {
  owner_id: wrath.id,
  group: true,
  name: "Wrath & Friends",
  }
])

kale.group_bundle([demo.id, dojo.id, can.id, cubber.id, mul.id])
dodo.bundle(demo.id, toosh.id)
gsquad.group_bundle([wrath.id, van.id, ecter.id, mul.id, zaroky.id, demo.id])

Message.create([
  {
  author_id: demo.id,
  messageable: ggang,
  body: "April is the cruellest month, breeding"
  }, {
  author_id: demo.id,
  messageable: ggang,
  body: "Lilacs out of the dead land, mixing"
  }, {
  author_id: toosh.id,
  messageable: ggang,
  body: "Memory and desire, stirring"
  }, {
  author_id: hiker.id,
  messageable: ggang,
  body: "Dull roots with spring rain."
  }, {
  author_id: sinus.id,
  messageable: ggang,
  body: "Winter kept us warm, covering"
  }, {
  author_id: sinus.id,
  messageable: ggang,
  body: "Earth in forgetful snow, feeding"
  }, {
  author_id: marre.id,
  messageable: ggang,
  body: "A little life with dried tubers."
  }, {
  author_id: can.id,
  messageable: ggang,
  body: "Summer surprised us, coming over the Starnbergersee"
  }, {
  author_id: can.id,
  messageable: ggang,
  body: "With a shower of rain; we stopped in the colonnade,"
  }, {
  author_id: buth.id,
  messageable: ggang,
  body: "And went on in sunlight, into the Hofgarten,"
  }, {
  author_id: demo.id,
  messageable: ggang,
  body: "And drank coffee, and talked for an hour."
  }, {
  author_id: toosh.id,
  messageable: ggang,
  body: "Bin gar keine Russin, stamm’ aus Litauen, echt deutsch."
  }, {
  author_id: hiker.id,
  messageable: ggang,
  body: "And when we were children, staying at the arch-duke’s,"
  }, {
  author_id: sinus.id,
  messageable: ggang,
  body: "My cousin’s, he took me out on a sled,"
  }, {
  author_id: toosh.id,
  messageable: ggang,
  body: "And I was frightened. He said, Marie,"
  }, {
  author_id: toosh.id,
  messageable: ggang,
  body: "Marie, hold on tight. And down we went."
  }, {
  author_id: marre.id,
  messageable: ggang,
  body: "In the mountains, there you feel free."
  }, {
  author_id: marre.id,
  messageable: ggang,
  body: "I read, much of the night, and go south in the winter."
  }, {
  author_id: can.id,
  messageable: ggang,
  body: "What are the roots that clutch, what branches grow"
  }, {
  author_id: buth.id,
  messageable: ggang,
  body: "Out of this stony rubbish? Son of man,"
  }, {
  author_id: demo.id,
  messageable: ggang,
  body: "You cannot say, or guess, for you know only"
  }, {
  author_id: toosh.id,
  messageable: ggang,
  body: "A heap of broken images, where the sun beats,"
  }, {
  author_id: hiker.id,
  messageable: ggang,
  body: "And the dead tree gives no shelter, the cricket no relief,"
  }, {
  author_id: hiker.id,
  messageable: ggang,
  body: "And the dry stone no sound of water. Only"
  }, {
  author_id: sinus.id,
  messageable: ggang,
  body: "There is shadow under this red rock,"
  }, {
  author_id: sinus.id,
  messageable: ggang,
  body: "(Come in under the shadow of this red rock),"
  }, {
  author_id: marre.id,
  messageable: ggang,
  body: "And I will show you something different from either"
  }, {
  author_id: can.id,
  messageable: ggang,
  body: "Your shadow at morning striding behind you"
  }, {
  author_id: demo.id,
  messageable: ggang,
  body: "Or your shadow at evening rising to meet you;"
  }, {
  author_id: demo.id,
  messageable: ggang,
  body: "I will show you fear in a handful of dust."
  }, {
  author_id: toosh.id,
  messageable: ggang,
  body: "Frisch weht der Wind"
  }, {
  author_id: toosh.id,
  messageable: ggang,
  body: "Der Heimat zu"
  }, {
  author_id: toosh.id,
  messageable: ggang,
  body: "Mein Irisch Kind"
  }, {
  author_id: toosh.id,
  messageable: ggang,
  body: "Wo weilest du?"
  }, {
  author_id: toosh.id,
  messageable: ggang,
  body: "'You gave me hyacinths first a year ago;"
  }, {
  author_id: toosh.id,
  messageable: ggang,
  body: "'They called me the hyacinth girl.'"
  }, {
  author_id: hiker.id,
  messageable: ggang,
  body: "—Yet when we came back, late, from the Hyacinth garden,"
  }, {
  author_id: hiker.id,
  messageable: ggang,
  body: "Your arms full, and your hair wet, I could not"
  }, {
  author_id: hiker.id,
  messageable: ggang,
  body: "Speak, and my eyes failed, I was neither"
  }, {
  author_id: hiker.id,
  messageable: ggang,
  body: "Living nor dead, and I knew nothing,"
  }, {
  author_id: sinus.id,
  messageable: ggang,
  body: "Looking into the heart of light, the silence."
  }, {
  author_id: sinus.id,
  messageable: ggang,
  body: "Oed’ und leer das Meer."
  }, {
  author_id: marre.id,
  messageable: ggang,
  body: "Madame Sosostris, famous clairvoyante,"
  }, {
  author_id: can.id,
  messageable: ggang,
  body: "Had a bad cold, nevertheless"
  }, {
  author_id: buth.id,
  messageable: ggang,
  body: "Is known to be the wisest woman in Europe,"
  }, {
  author_id: demo.id,
  messageable: ggang,
  body: "With a wicked pack of cards. Here, said she,"
  }, {
  author_id: toosh.id,
  messageable: ggang,
  body: "Is your card, the drowned Phoenician Sailor,"
  }, {
  author_id: hiker.id,
  messageable: ggang,
  body: "(Those are pearls that were his eyes. Look!)"
  }, {
  author_id: sinus.id,
  messageable: ggang,
  body: "Here is Belladonna, the Lady of the Rocks,"
  }, {
  author_id: sinus.id,
  messageable: ggang,
  body: "The lady of situations."
  }, {
  author_id: marre.id,
  messageable: ggang,
  body: "Here is the man with three staves, and here the Wheel,"
  }, {
  author_id: can.id,
  messageable: ggang,
  body: "And here is the one-eyed merchant, and this card,"
  }, {
  author_id: buth.id,
  messageable: ggang,
  body: "Which is blank, is something he carries on his back,"
  }, {
  author_id: demo.id,
  messageable: ggang,
  body: "Which I am forbidden to see. I do not find"
  }, {
  author_id: toosh.id,
  messageable: ggang,
  body: "The Hanged Man. Fear death by water."
  }, {
  author_id: hiker.id,
  messageable: ggang,
  body: "I see crowds of people, walking round in a ring."
  }, {
  author_id: sinus.id,
  messageable: ggang,
  body: "Thank you. If you see dear Mrs. Equitone,"
  }, {
  author_id: marre.id,
  messageable: ggang,
  body: "Tell her I bring the horoscope myself:"
  }, {
  author_id: demo.id,
  messageable: ggang,
  body: "One must be so careful these days."
  }, {
  author_id: can.id,
  messageable: ggang,
  body: "Unreal City,"
  }, {
  author_id: can.id,
  messageable: ggang,
  body: "Under the brown fog of a winter dawn,"
  }, {
  author_id: buth.id,
  messageable: ggang,
  body: "A crowd flowed over London Bridge, so many,"
  }, {
  author_id: demo.id,
  messageable: ggang,
  body: "I had not thought death had undone so many."
  }, {
  author_id: toosh.id,
  messageable: ggang,
  body: "Sighs, short and infrequent, were exhaled,"
  }, {
  author_id: hiker.id,
  messageable: ggang,
  body: "And each man fixed his eyes before his feet."
  }, {
  author_id: sinus.id,
  messageable: ggang,
  body: "Flowed up the hill and down King William Street,"
  }, {
  author_id: marre.id,
  messageable: ggang,
  body: "To where Saint Mary Woolnoth kept the hours"
  }, {
  author_id: can.id,
  messageable: ggang,
  body: "With a dead sound on the final stroke of nine."
  }, {
  author_id: buth.id,
  messageable: ggang,
  body: "There I saw one I knew, and stopped him, crying: 'Stetson!"
  }, {
  author_id: demo.id,
  messageable: ggang,
  body: "'You who were with me in the ships at Mylae!"
  }, {
  author_id: toosh.id,
  messageable: ggang,
  body: "'That corpse you planted last year in your garden,"
  }, {
  author_id: hiker.id,
  messageable: ggang,
  body: "'Has it begun to sprout? Will it bloom this year?"
  }, {
  author_id: sinus.id,
  messageable: ggang,
  body: "'Or has the sudden frost disturbed its bed?"
  }, {
  author_id: marre.id,
  messageable: ggang,
  body: "'Oh keep the Dog far hence, that’s friend to men,"
  }, {
  author_id: can.id,
  messageable: ggang,
  body: "'Or with his nails he’ll dig it up again!"
  }, {
  author_id: buth.id,
  messageable: ggang,
  body: "'You! hypocrite lecteur!—mon semblable,—mon frère!'"
  }, {
  author_id: sewp.id,
  messageable: gnp,
  body: "The Chair she sat in, like a burnished throne,"
  }, {
  author_id: ribs.id,
  messageable: gnp,
  body: "Glowed on the marble, where the glass"
  }, {
  author_id: north.id,
  messageable: gnp,
  body: "Held up by standards wrought with fruited vines"
  }, {
  author_id: kimky.id,
  messageable: gnp,
  body: "From which a golden Cupidon peeped out"
  }, {
  author_id: mul.id,
  messageable: gnp,
  body: "(Another hid his eyes behind his wing)"
  }, {
  author_id: van.id,
  messageable: gnp,
  body: "Doubled the flames of sevenbranched candelabra"
  }, {
  author_id: cinch.id,
  messageable: gnp,
  body: "Reflecting light upon the table as"
  }, {
  author_id: cubber.id,
  messageable: gnp,
  body: "The glitter of her jewels rose to meet it,"
  }, {
  author_id: gritz.id,
  messageable: gnp,
  body: "From satin cases poured in rich profusion;"
  }, {
  author_id: ecter.id,
  messageable: gnp,
  body: "In vials of ivory and coloured glass"
  }, {
  author_id: pide.id,
  messageable: gnp,
  body: "Unstoppered, lurked her strange synthetic perfumes,"
  }, {
  author_id: zaroky.id,
  messageable: gnp,
  body: "Unguent, powdered, or liquid—troubled, confused"
  }, {
  author_id: sewp.id,
  messageable: gnp,
  body: "And drowned the sense in odours; stirred by the air"
  }, {
  author_id: ribs.id,
  messageable: gnp,
  body: "That freshened from the window, these ascended"
  }, {
  author_id: ribs.id,
  messageable: gnp,
  body: "In fattening the prolonged candle-flames,"
  }, {
  author_id: north.id,
  messageable: gnp,
  body: "Flung their smoke into the laquearia,"
  }, {
  author_id: kimky.id,
  messageable: gnp,
  body: "Stirring the pattern on the coffered ceiling."
  }, {
  author_id: gritz.id,
  messageable: gnp,
  body: "Huge sea-wood fed with copper"
  }, {
  author_id: mul.id,
  messageable: gnp,
  body: "Burned green and orange, framed by the coloured stone,"
  }, {
  author_id: mul.id,
  messageable: gnp,
  body: "In which sad light a carvéd dolphin swam."
  }, {
  author_id: cinch.id,
  messageable: gnp,
  body: "Above the antique mantel was displayed"
  }, {
  author_id: cinch.id,
  messageable: gnp,
  body: "As though a window gave upon the sylvan scene"
  }, {
  author_id: cubber.id,
  messageable: gnp,
  body: "The change of Philomel, by the barbarous king"
  }, {
  author_id: boots.id,
  messageable: gnp,
  body: "So rudely forced; yet there the nightingale"
  }, {
  author_id: pide.id,
  messageable: gnp,
  body: "Filled all the desert with inviolable voice"
  }, {
  author_id: zaroky.id,
  messageable: gnp,
  body: "And still she cried, and still the world pursues,"
  }, {
  author_id: ecter.id,
  messageable: gnp,
  body: "'Jug Jug' to dirty ears."
  }, {
  author_id: wrath.id,
  messageable: gnp,
  body: "And other withered stumps of time"
  }, {
  author_id: sewp.id,
  messageable: gnp,
  body: "And other withered stumps of time"
  }, {
  author_id: ribs.id,
  messageable: gnp,
  body: "Leaned out, leaning, hushing the room enclosed."
  }, {
  author_id: ribs.id,
  messageable: gnp,
  body: "Footsteps shuffled on the stair."
  }, {
  author_id: north.id,
  messageable: gnp,
  body: "Under the firelight, under the brush, her hair"
  }, {
  author_id: north.id,
  messageable: gnp,
  body: "Spread out in fiery points"
  }, {
  author_id: north.id,
  messageable: gnp,
  body: "Glowed into words, then would be savagely still."
  }, {
  author_id: kimky.id,
  messageable: gnp,
  body: "'My nerves are bad tonight. Yes, bad. Stay with me."
  }, {
  author_id: cinch.id,
  messageable: gnp,
  body: "'Speak to me. Why do you never speak. Speak."
  }, {
  author_id: van.id,
  messageable: gnp,
  body: "'What are you thinking of? What thinking? What?"
  }, {
  author_id: mul.id,
  messageable: gnp,
  body: "'I never know what you are thinking. Think.'"
  }, {
  author_id: sewp.id,
  messageable: gnp,
  body: "I think we are in rats’ alley"
  }, {
  author_id: sewp.id,
  messageable: gnp,
  body: "Where the dead men lost their bones."
  }, {
  author_id: cinch.id,
  messageable: gnp,
  body: "'What is that noise?'"
  }, {
  author_id: ribs.id,
  messageable: gnp,
  body: "The wind under the door."
  }, {
  author_id: cinch.id,
  messageable: gnp,
  body: "'What is that noise now? What is the wind doing'"
  }, {
  author_id: ribs.id,
  messageable: gnp,
  body: "Nothing again nothing."
  }, {
  author_id: wrath.id,
  messageable: gnp,
  body: "'Do"
  }, {
  author_id: wrath.id,
  messageable: gnp,
  body: "'You know nothing? Do you see nothing? Do you remember"
  }, {
  author_id: wrath.id,
  messageable: gnp,
  body: "'Nothing?'"
  }, {
  author_id: gritz.id,
  messageable: gnp,
  body: "I remember"
  }, {
  author_id: zaroky.id,
  messageable: gnp,
  body: "Those are pearls that were his eyes."
  }, {
  author_id: sewp.id,
  messageable: gnp,
  body: "'Are you alive, or not? Is there nothing in your head?'"
  }, {
  author_id: van.id,
  messageable: gnp,
  body: "But"
  }, {
  author_id: cinch.id,
  messageable: gnp,
  body: "O O O O that Shakespeherian Rag—"
  }, {
  author_id: mul.id,
  messageable: gnp,
  body: "It’s so elegant"
  }, {
  author_id: kimky.id,
  messageable: gnp,
  body: "So intelligent"
  }, {
  author_id: zaroky.id,
  messageable: gnp,
  body: "'What shall I do now? What shall I do?'"
  }, {
  author_id: boots.id,
  messageable: gnp,
  body: "'I shall rush out as I am, and walk the street"
  }, {
  author_id: boots.id,
  messageable: gnp,
  body: "'With my hair down, so. What shall we do tomorrow?"
  }, {
  author_id: cubber.id,
  messageable: gnp,
  body: "'What shall we ever do?'"
  }, {
  author_id: sewp.id,
  messageable: strats,
  body: "The hot water at ten."
  }, {
  author_id: ribs.id,
  messageable: strats,
  body: "And if it rains, a closed car at four."
  }, {
  author_id: north.id,
  messageable: strats,
  body: "And we shall play a game of chess,"
  }, {
  author_id: north.id,
  messageable: strats,
  body: "Pressing lidless eyes and waiting for a knock upon the door."
  }, {
  author_id: kimky.id,
  messageable: strats,
  body: "When Lil’s husband got demobbed, I said—"
  }, {
  author_id: gritz.id,
  messageable: strats,
  body: "I didn’t mince my words, I said to her myself,"
  }, {
  author_id: mul.id,
  messageable: strats,
  body: "HURRY UP PLEASE ITS TIME"
  }, {
  author_id: cinch.id,
  messageable: strats,
  body: "Now Albert’s coming back, make yourself a bit smart."
  }, {
  author_id: demo.id,
  messageable: strats,
  body: "He’ll want to know what you done with that money he gave you"
  }, {
  author_id: pide.id,
  messageable: strats,
  body: "To get yourself some teeth. He did, I was there."
  }, {
  author_id: zaroky.id,
  messageable: strats,
  body: "You have them all out, Lil, and get a nice set,"
  }, {
  author_id: boots.id,
  messageable: strats,
  body: "He said, I swear, I can’t bear to look at you."
  }, {
  author_id: ecter.id,
  messageable: strats,
  body: "And no more can’t I, I said, and think of poor Albert,"
  }, {
  author_id: sewp.id,
  messageable: strats,
  body: "He’s been in the army four years, he wants a good time,"
  }, {
  author_id: ribs.id,
  messageable: strats,
  body: "And if you don’t give it him, there’s others will, I said."
  }, {
  author_id: north.id,
  messageable: strats,
  body: "Oh is there, she said. Something o’ that, I said."
  }, {
  author_id: kimky.id,
  messageable: strats,
  body: "Then I’ll know who to thank, she said, and give me a straight look."
  }, {
  author_id: van.id,
  messageable: strats,
  body: "HURRY UP PLEASE ITS TIME"
  }, {
  author_id: cinch.id,
  messageable: strats,
  body: "If you don’t like it you can get on with it, I said."
  }, {
  author_id: pide.id,
  messageable: strats,
  body: "Others can pick and choose if you can’t."
  }, {
  author_id: wrath.id,
  messageable: strats,
  body: "But if Albert makes off, it won’t be for lack of telling."
  }, {
  author_id: zaroky.id,
  messageable: strats,
  body: "You ought to be ashamed, I said, to look so antique."
  }, {
  author_id: zaroky.id,
  messageable: strats,
  body: "(And her only thirty-one.)"
  }, {
  author_id: sewp.id,
  messageable: strats,
  body: "I can’t help it, she said, pulling a long face,"
  }, {
  author_id: ribs.id,
  messageable: strats,
  body: "It’s them pills I took, to bring it off, she said."
  }, {
  author_id: north.id,
  messageable: strats,
  body: "(She’s had five already, and nearly died of young George.)"
  }, {
  author_id: north.id,
  messageable: strats,
  body: "The chemist said it would be all right, but I’ve never been the same."
  }, {
  author_id: kimky.id,
  messageable: strats,
  body: "You are a proper fool, I said."
  }, {
  author_id: cinch.id,
  messageable: strats,
  body: "Well, if Albert won’t leave you alone, there it is, I said,"
  }, {
  author_id: mul.id,
  messageable: strats,
  body: "What you get married for if you don’t want children?"
  }, {
  author_id: van.id,
  messageable: strats,
  body: "HURRY UP PLEASE ITS TIME"
  }, {
  author_id: ecter.id,
  messageable: strats,
  body: "Well, that Sunday Albert was home, they had a hot gammon,"
  }, {
  author_id: zaroky.id,
  messageable: strats,
  body: "And they asked me in to dinner, to get the beauty of it hot—"
  }, {
  author_id: van.id,
  messageable: strats,
  body: "HURRY UP PLEASE ITS TIME"
  }, {
  author_id: van.id,
  messageable: strats,
  body: "HURRY UP PLEASE ITS TIME"
  }, {
  author_id: sewp.id,
  messageable: strats,
  body: "Goonight Bill. Goonight Lou. Goonight May. Goonight."
  }, {
  author_id: ribs.id,
  messageable: strats,
  body: "Ta ta. Goonight. Goonight."
  }, {
  author_id: north.id,
  messageable: strats,
  body: "Good night, ladies, good night, sweet ladies, good night, good night."
  }, {
  author_id: toosh.id,
  messageable: gz,
  body: "The river’s tent is broken: the last fingers of leaf"
  }, {
  author_id: marre.id,
  messageable: gz,
  body: "Clutch and sink into the wet bank. The wind"
  }, {
  author_id: demo.id,
  messageable: gz,
  body: "Crosses the brown land, unheard. The nymphs are departed."
  }, {
  author_id: toosh.id,
  messageable: gz,
  body: "Sweet Thames, run softly, till I end my song."
  }, {
  author_id: marre.id,
  messageable: gz,
  body: "The river bears no empty bottles, sandwich papers,"
  }, {
  author_id: demo.id,
  messageable: gz,
  body: "Silk handkerchiefs, cardboard boxes, cigarette ends"
  }, {
  author_id: demo.id,
  messageable: gz,
  body: "Or other testimony of summer nights. The nymphs are departed."
  }, {
  author_id: toosh.id,
  messageable: gz,
  body: "And their friends, the loitering heirs of city directors;"
  }, {
  author_id: toosh.id,
  messageable: gz,
  body: "Departed, have left no addresses."
  }, {
  author_id: marre.id,
  messageable: gz,
  body: "By the waters of Leman I sat down and wept . . ."
  }, {
  author_id: toosh.id,
  messageable: gz,
  body: "Sweet Thames, run softly till I end my song,"
  }, {
  author_id: toosh.id,
  messageable: gz,
  body: "Sweet Thames, run softly, for I speak not loud or long."
  }, {
  author_id: toosh.id,
  messageable: gz,
  body: "But at my back in a cold blast I hear"
  }, {
  author_id: toosh.id,
  messageable: gz,
  body: "The rattle of the bones, and chuckle spread from ear to ear."
  }, {
  author_id: marre.id,
  messageable: gz,
  body: "A rat crept softly through the vegetation"
  }, {
  author_id: marre.id,
  messageable: gz,
  body: "Dragging its slimy belly on the bank"
  }, {
  author_id: demo.id,
  messageable: gz,
  body: "While I was fishing in the dull canal"
  }, {
  author_id: demo.id,
  messageable: gz,
  body: "On a winter evening round behind the gashouse"
  }, {
  author_id: toosh.id,
  messageable: gz,
  body: "Musing upon the king my brother’s wreck"
  }, {
  author_id: toosh.id,
  messageable: gz,
  body: "And on the king my father’s death before him."
  }, {
  author_id: demo.id,
  messageable: gz,
  body: "White bodies naked on the low damp ground"
  }, {
  author_id: marre.id,
  messageable: gz,
  body: "And bones cast in a little low dry garret,"
  }, {
  author_id: marre.id,
  messageable: gz,
  body: "Rattled by the rat’s foot only, year to year."
  }, {
  author_id: toosh.id,
  messageable: gz,
  body: "But at my back from time to time I hear"
  }, {
  author_id: toosh.id,
  messageable: gz,
  body: "The sound of horns and motors, which shall bring"
  }, {
  author_id: demo.id,
  messageable: gz,
  body: "Sweeney to Mrs. Porter in the spring."
  }, {
  author_id: demo.id,
  messageable: gz,
  body: "O the moon shone bright on Mrs. Porter"
  }, {
  author_id: marre.id,
  messageable: gz,
  body: "And on her daughter"
  }, {
  author_id: marre.id,
  messageable: gz,
  body: "They wash their feet in soda water"
  }, {
  author_id: toosh.id,
  messageable: gz,
  body: "Et O ces voix d’enfants, chantant dans la coupole!"
  }, {
  author_id: marre.id,
  messageable: gz,
  body: "Twit twit twit"
  }, {
  author_id: marre.id,
  messageable: gz,
  body: "Jug jug jug jug jug jug"
  }, {
  author_id: marre.id,
  messageable: gz,
  body: "So rudely forc’d."
  }, {
  author_id: marre.id,
  messageable: gz,
  body: "Tereu"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "Unreal City"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "Under the brown fog of a winter noon"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "Mr. Eugenides, the Smyrna merchant"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "Unshaven, with a pocket full of currants"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "C.i.f. London: documents at sight,"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "Asked me in demotic French"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "To luncheon at the Cannon Street Hotel"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "Followed by a weekend at the Metropole."
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "At the violet hour, when the eyes and back"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "Turn upward from the desk, when the human engine waits"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "Like a taxi throbbing waiting,"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "I Tiresias, though blind, throbbing between two lives,"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "Old man with wrinkled female breasts, can see"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "At the violet hour, the evening hour that strives"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "Homeward, and brings the sailor home from sea,"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "The typist home at teatime, clears her breakfast, lights"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "Her stove, and lays out food in tins."
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "Out of the window perilously spread"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "Her drying combinations touched by the sun’s last rays,"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "On the divan are piled (at night her bed)"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "Stockings, slippers, camisoles, and stays."
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "I Tiresias, old man with wrinkled dugs"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "Perceived the scene, and foretold the rest—"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "I too awaited the expected guest."
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "He, the young man carbuncular, arrives,"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "A small house agent’s clerk, with one bold stare,"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "One of the low on whom assurance sits"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "As a silk hat on a Bradford millionaire."
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "The time is now propitious, as he guesses,"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "The meal is ended, she is bored and tired,"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "Endeavours to engage her in caresses"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "Which still are unreproved, if undesired."
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "Flushed and decided, he assaults at once;"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "Exploring hands encounter no defence;"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "His vanity requires no response,"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "And makes a welcome of indifference."
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "(And I Tiresias have foresuffered all"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "Enacted on this same divan or bed;"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "I who have sat by Thebes below the wall;"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "And walked among the lowest of the dead.)"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "Bestows one final patronising kiss,"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "And gropes his way, finding the stairs unlit . . ."
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "She turns and looks a moment in the glass,"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "Hardly aware of her departed lover;"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "Her brain allows one half-formed thought to pass:"
  }, {
  author_id: toosh.id,
  messageable: dodo,
  body: "'Well now that’s done: and I’m glad it’s over.'"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "When lovely woman stoops to folly and"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "Paces about her room again, alone,"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "She smoothes her hair with automatic hand,"
  }, {
  author_id: demo.id,
  messageable: dodo,
  body: "And puts a record on the gramophone."
  },

])