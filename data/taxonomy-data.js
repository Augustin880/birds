const ORDER_SEED = [
  {
    name: "Struthioniformes",
    species: 2,
    genera: 1,
    families: [{ name: "Struthionidae", common: "Ostriches", species: 2, genera: 1 }]
  },
  {
    name: "Casuariiformes",
    species: 4,
    genera: 2,
    families: [
      { name: "Casuariidae", common: "Emu and Cassowaries", species: 4, genera: 2 }
    ]
  },
  {
    name: "Apterygiformes",
    species: 5,
    genera: 1,
    families: [{ name: "Apterygidae", common: "Kiwis", species: 5, genera: 1 }]
  },
  {
    name: "Rheiformes",
    species: 2,
    genera: 1,
    families: [{ name: "Rheidae", common: "Rheas", species: 2, genera: 1 }]
  },
  {
    name: "Tinamiformes",
    species: 46,
    genera: 9,
    families: [{ name: "Tinamidae", common: "Tinamous", species: 46, genera: 9 }]
  },
  {
    name: "Anseriformes",
    species: 176,
    genera: 56,
    families: [
      { name: "Anhimidae", common: "Screamers", species: 3, genera: 2 },
      { name: "Anseranatidae", common: "Magpie Goose", species: 1, genera: 1 },
      { name: "Anatidae", common: "Ducks, Swans, and Geese", species: 172, genera: 53 }
    ]
  },
  {
    name: "Galliformes",
    species: 307,
    genera: 86,
    families: [
      { name: "Megapodiidae", common: "Megapodes", species: 21, genera: 7 },
      {
        name: "Cracidae",
        common: "Guans, Curassows, and Chachalacas",
        species: 57,
        genera: 11
      },
      { name: "Numididae", common: "Guineafowl", species: 8, genera: 4 },
      { name: "Odontophoridae", common: "New World Quail", species: 34, genera: 10 },
      {
        name: "Phasianidae",
        common: "Partridges, Pheasants, Grouse, and Allies",
        species: 187,
        genera: 54
      }
    ]
  },
  {
    name: "Phoenicopteriformes",
    species: 6,
    genera: 3,
    families: [{ name: "Phoenicopteridae", common: "Flamingos", species: 6, genera: 3 }]
  },
  {
    name: "Podicipediformes",
    species: 22,
    genera: 6,
    families: [{ name: "Podicipedidae", common: "Grebes", species: 22, genera: 6 }]
  },
  {
    name: "Musophagiformes",
    species: 23,
    genera: 5,
    families: [{ name: "Musophagidae", common: "Turacos", species: 23, genera: 5 }]
  },
  {
    name: "Otidiformes",
    species: 26,
    genera: 12,
    families: [{ name: "Otididae", common: "Bustards", species: 26, genera: 12 }]
  },
  {
    name: "Cuculiformes",
    species: 156,
    genera: 36,
    families: [{ name: "Cuculidae", common: "Cuckoos", species: 156, genera: 36 }]
  },
  {
    name: "Mesitornithiformes",
    species: 3,
    genera: 2,
    families: [{ name: "Mesitornithidae", common: "Mesites", species: 3, genera: 2 }]
  },
  {
    name: "Pterocliformes",
    species: 16,
    genera: 2,
    families: [{ name: "Pteroclidae", common: "Sandgrouse", species: 16, genera: 2 }]
  },
  {
    name: "Columbiformes",
    species: 350,
    genera: 52,
    families: [{ name: "Columbidae", common: "Doves and Pigeons", species: 350, genera: 52 }]
  },
  {
    name: "Opisthocomiformes",
    species: 1,
    genera: 1,
    families: [{ name: "Opisthocomidae", common: "Hoatzin", species: 1, genera: 1 }]
  },
  {
    name: "Gruiformes",
    species: 185,
    genera: 50,
    families: [
      { name: "Psophiidae", common: "Trumpeters", species: 3, genera: 1 },
      { name: "Aramidae", common: "Limpkin", species: 1, genera: 1 },
      { name: "Gruidae", common: "Cranes", species: 15, genera: 4 },
      { name: "Heliornithidae", common: "Finfoots", species: 3, genera: 3 },
      { name: "Sarothruridae", common: "Flufftails", species: 15, genera: 3 },
      {
        name: "Rallidae",
        common: "Rails, Gallinules, and Coots",
        species: 148,
        genera: 38
      }
    ]
  },
  {
    name: "Charadriiformes",
    species: 392,
    genera: 91,
    families: [
      { name: "Pluvianellidae", common: "Magellanic Plover", species: 1, genera: 1 },
      { name: "Chionidae", common: "Sheathbills", species: 2, genera: 1 },
      {
        name: "Burhinidae",
        common: "Thick-knees and Stone-curlews",
        species: 10,
        genera: 3
      },
      { name: "Pluvianidae", common: "Egyptian Plover", species: 1, genera: 1 },
      { name: "Recurvirostridae", common: "Stilts and Avocets", species: 9, genera: 3 },
      { name: "Ibidorhynchidae", common: "Ibisbill", species: 1, genera: 1 },
      { name: "Haematopodidae", common: "Oystercatchers", species: 12, genera: 1 },
      { name: "Charadriidae", common: "Plovers and Lapwings", species: 69, genera: 12 },
      { name: "Pedionomidae", common: "Plains-wanderer", species: 1, genera: 1 },
      { name: "Thinocoridae", common: "Seedsnipes", species: 4, genera: 2 },
      { name: "Rostratulidae", common: "Painted-Snipes", species: 3, genera: 2 },
      { name: "Jacanidae", common: "Jacanas", species: 8, genera: 6 },
      { name: "Scolopacidae", common: "Sandpipers and Allies", species: 98, genera: 15 },
      { name: "Turnicidae", common: "Buttonquail", species: 18, genera: 2 },
      { name: "Dromadidae", common: "Crab-Plover", species: 1, genera: 1 },
      { name: "Glareolidae", common: "Coursers and Pratincoles", species: 17, genera: 4 },
      { name: "Stercorariidae", common: "Jaegers and Skuas", species: 7, genera: 1 },
      { name: "Alcidae", common: "Auks, Puffins, and Murres", species: 25, genera: 11 },
      {
        name: "Laridae",
        common: "Skimmers, Noddies, Terns, and Gulls",
        species: 105,
        genera: 23
      }
    ]
  },
  {
    name: "Eurypygiformes",
    species: 2,
    genera: 2,
    families: [
      { name: "Eurypygidae", common: "Sunbittern", species: 1, genera: 1 },
      { name: "Rhynochetidae", common: "Kagu", species: 1, genera: 1 }
    ]
  },
  {
    name: "Phaethontiformes",
    species: 3,
    genera: 1,
    families: [{ name: "Phaethontidae", common: "Tropicbirds", species: 3, genera: 1 }]
  },
  {
    name: "Gaviiformes",
    species: 5,
    genera: 1,
    families: [{ name: "Gaviidae", common: "Loons", species: 5, genera: 1 }]
  },
  {
    name: "Sphenisciformes",
    species: 19,
    genera: 6,
    families: [{ name: "Spheniscidae", common: "Penguins", species: 19, genera: 6 }]
  },
  {
    name: "Procellariiformes",
    species: 146,
    genera: 26,
    families: [
      { name: "Diomedeidae", common: "Albatrosses", species: 20, genera: 4 },
      { name: "Oceanitidae", common: "Southern Storm Petrels", species: 10, genera: 5 },
      { name: "Hydrobatidae", common: "Northern Storm Petrels", species: 18, genera: 1 },
      {
        name: "Procellariidae",
        common: "Petrels, Shearwaters, and Diving Petrels",
        species: 98,
        genera: 16
      }
    ]
  },
  {
    name: "Ciconiiformes",
    species: 20,
    genera: 6,
    families: [{ name: "Ciconiidae", common: "Storks", species: 20, genera: 6 }]
  },
  {
    name: "Suliformes",
    species: 54,
    genera: 12,
    families: [
      { name: "Fregatidae", common: "Frigatebirds", species: 5, genera: 1 },
      { name: "Sulidae", common: "Boobies and Gannets", species: 11, genera: 3 },
      { name: "Anhingidae", common: "Anhinga and Darters", species: 4, genera: 1 },
      { name: "Phalacrocoracidae", common: "Cormorants and Shags", species: 34, genera: 7 }
    ]
  },
  {
    name: "Pelecaniformes",
    species: 120,
    genera: 34,
    families: [
      { name: "Threskiornithidae", common: "Ibises and Spoonbills", species: 36, genera: 13 },
      { name: "Balaenicipitidae", common: "Shoebill", species: 1, genera: 1 },
      { name: "Scopidae", common: "Hamerkop", species: 1, genera: 1 },
      { name: "Pelecanidae", common: "Pelicans", species: 8, genera: 1 },
      { name: "Ardeidae", common: "Herons, Egrets, and Bitterns", species: 74, genera: 18 }
    ]
  },
  {
    name: "Caprimulgiformes",
    species: 98,
    genera: 22,
    families: [
      { name: "Caprimulgidae", common: "Nightjars and Nighthawks", species: 98, genera: 22 }
    ]
  },
  {
    name: "Steatornithiformes",
    species: 1,
    genera: 1,
    families: [{ name: "Steatornithidae", common: "Oilbird", species: 1, genera: 1 }]
  },
  {
    name: "Nyctibiiformes",
    species: 7,
    genera: 2,
    families: [{ name: "Nyctibiidae", common: "Potoos", species: 7, genera: 2 }]
  },
  {
    name: "Podargiformes",
    species: 16,
    genera: 3,
    families: [{ name: "Podargidae", common: "Frogmouths", species: 16, genera: 3 }]
  },
  {
    name: "Aegotheliformes",
    species: 10,
    genera: 1,
    families: [{ name: "Aegothelidae", common: "Owlet-nightjars", species: 10, genera: 1 }]
  },
  {
    name: "Apodiformes",
    species: 472,
    genera: 132,
    families: [
      { name: "Hemiprocnidae", common: "Treeswifts", species: 4, genera: 1 },
      { name: "Apodidae", common: "Swifts", species: 105, genera: 19 },
      { name: "Trochilidae", common: "Hummingbirds", species: 363, genera: 112 }
    ]
  },
  {
    name: "Strigiformes",
    species: 245,
    genera: 25,
    families: [
      { name: "Tytonidae", common: "Bay Owls and Barn Owls", species: 17, genera: 2 },
      { name: "Strigidae", common: "Owls", species: 228, genera: 23 }
    ]
  },
  {
    name: "Cathartiformes",
    species: 7,
    genera: 5,
    families: [{ name: "Cathartidae", common: "New World Vultures", species: 7, genera: 5 }]
  },
  {
    name: "Accipitriformes",
    species: 252,
    genera: 76,
    families: [
      { name: "Sagittariidae", common: "Secretarybird", species: 1, genera: 1 },
      { name: "Pandionidae", common: "Osprey", species: 1, genera: 1 },
      {
        name: "Accipitridae",
        common: "Kites, Old World Vultures, Eagles, and Hawks",
        species: 250,
        genera: 74
      }
    ]
  },
  {
    name: "Coliiformes",
    species: 6,
    genera: 2,
    families: [{ name: "Coliidae", common: "Mousebirds", species: 6, genera: 2 }]
  },
  {
    name: "Leptosomiformes",
    species: 1,
    genera: 1,
    families: [{ name: "Leptosomidae", common: "Cuckoo-roller", species: 1, genera: 1 }]
  },
  {
    name: "Trogoniformes",
    species: 47,
    genera: 7,
    families: [{ name: "Trogonidae", common: "Trogons", species: 47, genera: 7 }]
  },
  {
    name: "Bucerotiformes",
    species: 75,
    genera: 19,
    families: [
      { name: "Upupidae", common: "Hoopoes", species: 3, genera: 1 },
      { name: "Phoeniculidae", common: "Wood Hoopoes and Scimitarbills", species: 8, genera: 2 },
      { name: "Bucerotidae", common: "Hornbills", species: 64, genera: 16 }
    ]
  },
  {
    name: "Coraciiformes",
    species: 185,
    genera: 34,
    families: [
      { name: "Brachypteraciidae", common: "Ground Rollers", species: 5, genera: 4 },
      { name: "Coraciidae", common: "Rollers", species: 13, genera: 2 },
      { name: "Meropidae", common: "Bee-eaters", species: 31, genera: 3 },
      { name: "Todidae", common: "Todies", species: 5, genera: 1 },
      { name: "Momotidae", common: "Motmots", species: 14, genera: 6 },
      { name: "Alcedinidae", common: "Kingfishers", species: 117, genera: 18 }
    ]
  },
  {
    name: "Galbuliformes",
    species: 55,
    genera: 15,
    families: [
      { name: "Galbulidae", common: "Jacamars", species: 18, genera: 5 },
      { name: "Bucconidae", common: "Puffbirds", species: 37, genera: 10 }
    ]
  },
  {
    name: "Piciformes",
    species: 385,
    genera: 60,
    families: [
      { name: "Megalaimidae", common: "Asian Barbets", species: 35, genera: 2 },
      { name: "Lybiidae", common: "African Barbets", species: 43, genera: 10 },
      { name: "Capitonidae", common: "New World Barbets", species: 15, genera: 2 },
      {
        name: "Semnornithidae",
        common: "Prong-billed Barbet and Toucan Barbet",
        species: 2,
        genera: 1
      },
      { name: "Ramphastidae", common: "Toucans", species: 37, genera: 5 },
      { name: "Indicatoridae", common: "Honeyguides", species: 16, genera: 4 },
      { name: "Picidae", common: "Woodpeckers", species: 237, genera: 36 }
    ]
  },
  {
    name: "Cariamiformes",
    species: 2,
    genera: 2,
    families: [{ name: "Cariamidae", common: "Seriemas", species: 2, genera: 2 }]
  },
  {
    name: "Falconiformes",
    species: 65,
    genera: 10,
    families: [{ name: "Falconidae", common: "Falcons and Caracaras", species: 65, genera: 10 }]
  },
  {
    name: "Psittaciformes",
    species: 406,
    genera: 94,
    families: [
      { name: "Strigopidae", common: "New Zealand Parrots", species: 4, genera: 2 },
      { name: "Cacatuidae", common: "Cockatoos", species: 22, genera: 7 },
      {
        name: "Psittacidae",
        common: "African and New World Parrots",
        species: 180,
        genera: 37
      },
      { name: "Psittaculidae", common: "Old World Parrots", species: 200, genera: 48 }
    ]
  },
  {
    name: "Passeriformes",
    species: 6705,
    genera: 1361,
    families: [
      { name: "Acanthisittidae", common: "New Zealand Wrens", species: 4, genera: 3 },
      { name: "Philepittidae", common: "Asities", species: 4, genera: 2 },
      {
        name: "Eurylaimidae",
        common: "Grauer's Broadbill and Asian Broadbills",
        species: 10,
        genera: 7
      },
      {
        name: "Calyptomenidae",
        common: "African and Green Broadbills",
        species: 6,
        genera: 2
      },
      { name: "Sapayoidae", common: "Sapayoa", species: 1, genera: 1 },
      { name: "Pittidae", common: "Pittas", species: 46, genera: 3 },
      { name: "Pipridae", common: "Manakins", species: 55, genera: 16 },
      { name: "Cotingidae", common: "Cotingas", species: 65, genera: 24 },
      { name: "Tityridae", common: "Tityras, Becards, and Allies", species: 36, genera: 7 },
      { name: "Oxyruncidae", common: "Sharpbill", species: 1, genera: 1 },
      {
        name: "Onychorhynchidae",
        common: "Royal Flycatchers and Allies",
        species: 7,
        genera: 3
      },
      { name: "Tyrannidae", common: "Tyrant Flycatchers and Allies", species: 441, genera: 104 },
      { name: "Melanopareiidae", common: "Crescentchests", species: 4, genera: 1 },
      { name: "Conopophagidae", common: "Gnateaters", species: 12, genera: 2 },
      {
        name: "Thamnophilidae",
        common: "Antbirds, Antshrikes, Antwrens, and Antvireos",
        species: 239,
        genera: 63
      },
      { name: "Grallariidae", common: "Antpittas", species: 70, genera: 5 },
      { name: "Rhinocryptidae", common: "Tapaculos", species: 65, genera: 12 },
      { name: "Formicariidae", common: "Antthrushes", species: 12, genera: 2 },
      {
        name: "Furnariidae",
        common: "Ovenbirds and Woodcreepers",
        species: 321,
        genera: 71
      },
      { name: "Menuridae", common: "Lyrebirds", species: 2, genera: 1 },
      { name: "Atrichornithidae", common: "Scrubbirds", species: 2, genera: 1 },
      { name: "Climacteridae", common: "Australasian Treecreepers", species: 7, genera: 2 },
      { name: "Ptilonorhynchidae", common: "Bowerbirds", species: 23, genera: 8 },
      {
        name: "Maluridae",
        common: "Grasswrens, Fairywrens, and Emu-wrens",
        species: 33,
        genera: 6
      },
      { name: "Dasyornithidae", common: "Bristlebirds", species: 3, genera: 1 },
      { name: "Pardalotidae", common: "Pardalotes", species: 4, genera: 1 },
      {
        name: "Acanthizidae",
        common: "Gerygones, Thornbills, Scrubwrens, and Allies",
        species: 66,
        genera: 15
      },
      { name: "Meliphagidae", common: "Honeyeaters", species: 195, genera: 51 },
      { name: "Orthonychidae", common: "Logrunner and Chowchilla", species: 3, genera: 1 },
      { name: "Pomatostomidae", common: "Australasian Babblers", species: 5, genera: 2 },
      {
        name: "Cinclosomatidae",
        common: "Jewel-babblers and Quail-thrushes",
        species: 12,
        genera: 2
      },
      { name: "Campephagidae", common: "Cuckooshrikes", species: 107, genera: 11 },
      { name: "Mohouidae", common: "Whiteheads", species: 3, genera: 1 },
      { name: "Machaerirhynchidae", common: "Boatbills", species: 2, genera: 1 },
      {
        name: "Artamidae",
        common: "Woodswallows, Bellmagpies, and Allies",
        species: 24,
        genera: 6
      },
      { name: "Rhagologidae", common: "Berryhunter", species: 1, genera: 1 },
      { name: "Pityriasidae", common: "Bristlehead", species: 1, genera: 1 },
      { name: "Aegithinidae", common: "Ioras", species: 4, genera: 1 },
      { name: "Malaconotidae", common: "Bushshrikes and Allies", species: 50, genera: 9 },
      { name: "Platysteiridae", common: "Wattle-eyes and Batises", species: 32, genera: 4 },
      {
        name: "Vangidae",
        common: "Vangas, Helmetshrikes, and Allies",
        species: 40,
        genera: 21
      },
      { name: "Neosittidae", common: "Sittellas", species: 3, genera: 1 },
      { name: "Psophodidae", common: "Whipbirds and Wedgebills", species: 5, genera: 2 },
      { name: "Eulacestomatidae", common: "Ploughbill", species: 1, genera: 1 },
      { name: "Oreoicidae", common: "Australasian Bellbirds", species: 3, genera: 3 },
      { name: "Falcunculidae", common: "Shriketits", species: 3, genera: 1 },
      {
        name: "Paramythiidae",
        common: "Tit Berrypecker and Crested Berrypeckers",
        species: 3,
        genera: 2
      },
      { name: "Vireonidae", common: "Shrike-babblers, Erpornis, and Vireos", species: 64, genera: 8 },
      { name: "Oriolidae", common: "Old World Orioles", species: 41, genera: 4 },
      { name: "Pachycephalidae", common: "Whistlers and Allies", species: 61, genera: 5 },
      { name: "Rhipiduridae", common: "Fantails and Silktails", species: 64, genera: 4 },
      { name: "Dicruridae", common: "Drongos", species: 28, genera: 1 },
      {
        name: "Monarchidae",
        common: "Monarch Flycatchers, Paradise Flycatchers, and Shrikebills",
        species: 105,
        genera: 15
      },
      { name: "Corcoracidae", common: "White-winged Chough and Apostlebird", species: 2, genera: 2 },
      { name: "Ifritidae", common: "Ifrit", species: 1, genera: 1 },
      { name: "Paradisaeidae", common: "Birds-of-paradise", species: 44, genera: 17 },
      { name: "Melampittidae", common: "Melampittas", species: 2, genera: 2 },
      { name: "Platylophidae", common: "Jayshrike", species: 1, genera: 1 },
      { name: "Laniidae", common: "Shrikes", species: 34, genera: 4 },
      { name: "Corvidae", common: "Crows, Jays, and Magpies", species: 135, genera: 22 },
      { name: "Cnemophilidae", common: "Satinbirds", species: 3, genera: 2 },
      { name: "Melanocharitidae", common: "Longbills and Berrypeckers", species: 12, genera: 3 },
      { name: "Notiomystidae", common: "Stitchbird", species: 1, genera: 1 },
      { name: "Callaeidae", common: "New Zealand Wattlebirds", species: 5, genera: 3 },
      { name: "Eupetidae", common: "Rail-babbler", species: 1, genera: 1 },
      { name: "Chaetopidae", common: "Rockjumpers", species: 2, genera: 1 },
      { name: "Picathartidae", common: "Rockfowl", species: 2, genera: 1 },
      { name: "Petroicidae", common: "Australasian Robins", species: 51, genera: 16 },
      { name: "Stenostiridae", common: "Fairy Flycatchers", species: 9, genera: 4 },
      { name: "Hyliotidae", common: "Hyliotas", species: 4, genera: 1 },
      { name: "Remizidae", common: "Penduline Tits", species: 11, genera: 3 },
      { name: "Paridae", common: "Tits, Chickadees, and Titmice", species: 62, genera: 13 },
      { name: "Panuridae", common: "Reedling", species: 1, genera: 1 },
      { name: "Alaudidae", common: "Larks", species: 98, genera: 24 },
      { name: "Nicatoridae", common: "Nicators", species: 3, genera: 1 },
      { name: "Macrosphenidae", common: "Longbills, Crombecs, and Allies", species: 18, genera: 6 },
      { name: "Cisticolidae", common: "Cisticolas and Allies", species: 164, genera: 26 },
      { name: "Acrocephalidae", common: "Reed Warblers and Allies", species: 60, genera: 7 },
      { name: "Donacobiidae", common: "Donacobius", species: 1, genera: 1 },
      {
        name: "Bernieridae",
        common: "Malagasy Warblers and Tetrakas",
        species: 11,
        genera: 8
      },
      {
        name: "Locustellidae",
        common: "Grasshopper Warblers, Grassbirds, and Allies",
        species: 67,
        genera: 11
      },
      { name: "Pnoepygidae", common: "Cupwings", species: 4, genera: 1 },
      { name: "Hirundinidae", common: "Swallows", species: 92, genera: 21 },
      { name: "Hyliidae", common: "Hylias", species: 2, genera: 2 },
      {
        name: "Aegithalidae",
        common: "Tit-warblers, Bushtits, and Long-tailed Tit",
        species: 11,
        genera: 3
      },
      { name: "Erythrocercidae", common: "Yellow Flycatchers", species: 3, genera: 1 },
      { name: "Cettiidae", common: "Bush Warblers and Allies", species: 32, genera: 9 },
      { name: "Phylloscopidae", common: "Leaf Warblers", species: 80, genera: 1 },
      { name: "Pycnonotidae", common: "Bulbuls", species: 161, genera: 28 },
      { name: "Sylviidae", common: "Sylviid Warblers and Allies", species: 32, genera: 2 },
      { name: "Paradoxornithidae", common: "Parrotbills and Allies", species: 38, genera: 9 },
      { name: "Zosteropidae", common: "White-eyes, Yuhinas, and Allies", species: 147, genera: 13 },
      {
        name: "Timaliidae",
        common: "Tree Babblers, Scimitar Babblers, and Allies",
        species: 58,
        genera: 10
      },
      { name: "Pellorneidae", common: "Ground Babblers and Allies", species: 65, genera: 13 },
      { name: "Leiothrichidae", common: "Laughingthrushes and Allies", species: 143, genera: 17 },
      { name: "Dulidae", common: "Palmchat", species: 1, genera: 1 },
      { name: "Bombycillidae", common: "Waxwings", species: 3, genera: 1 },
      { name: "Ptiliogonatidae", common: "Silky-flycatchers", species: 4, genera: 3 },
      { name: "Hylocitreidae", common: "Hylocitrea", species: 1, genera: 1 },
      { name: "Hypocoliidae", common: "Hypocolius", species: 1, genera: 1 },
      { name: "Mohoidae", common: "Hawaiian Honeyeaters", species: 5, genera: 2 },
      { name: "Regulidae", common: "Kinglets", species: 6, genera: 2 },
      { name: "Tichodromidae", common: "Wallcreeper", species: 1, genera: 1 },
      { name: "Sittidae", common: "Nuthatches", species: 29, genera: 1 },
      { name: "Salpornithidae", common: "Spotted Creepers", species: 2, genera: 1 },
      { name: "Certhiidae", common: "Treecreepers", species: 9, genera: 1 },
      { name: "Polioptilidae", common: "Gnatwrens and Gnatcatchers", species: 20, genera: 3 },
      { name: "Troglodytidae", common: "Wrens", species: 96, genera: 19 },
      { name: "Elachuridae", common: "Elachura", species: 1, genera: 1 },
      { name: "Buphagidae", common: "Oxpeckers", species: 2, genera: 1 },
      { name: "Mimidae", common: "Mockingbirds and Thrashers", species: 35, genera: 10 },
      {
        name: "Sturnidae",
        common: "Rhabdornis, Starlings, and Mynas",
        species: 123,
        genera: 36
      },
      { name: "Cinclidae", common: "Dippers", species: 5, genera: 1 },
      { name: "Turdidae", common: "Thrushes and Allies", species: 194, genera: 17 },
      {
        name: "Muscicapidae",
        common: "Chats, Old World Flycatchers, and Allies",
        species: 352,
        genera: 57
      },
      { name: "Promeropidae", common: "Sugarbirds", species: 2, genera: 1 },
      { name: "Modulatricidae", common: "Dapple-throat and Allies", species: 3, genera: 3 },
      { name: "Dicaeidae", common: "Flowerpeckers", species: 56, genera: 3 },
      { name: "Nectariniidae", common: "Spiderhunters and Sunbirds", species: 151, genera: 16 },
      { name: "Chloropseidae", common: "Leafbirds", species: 12, genera: 1 },
      { name: "Irenidae", common: "Fairy-bluebirds", species: 3, genera: 1 },
      { name: "Peucedramidae", common: "Olive Warbler", species: 1, genera: 1 },
      { name: "Urocynchramidae", common: "Przevalski's Finch", species: 1, genera: 1 },
      { name: "Ploceidae", common: "Weavers and Allies", species: 122, genera: 16 },
      { name: "Viduidae", common: "Whydahs and Indigobirds", species: 20, genera: 2 },
      {
        name: "Estrildidae",
        common: "Munias, Parrotfinches, Waxbills, and Allies",
        species: 138,
        genera: 39
      },
      { name: "Prunellidae", common: "Accentors", species: 12, genera: 1 },
      { name: "Passeridae", common: "Snowfinches and Old World Sparrows", species: 43, genera: 8 },
      { name: "Motacillidae", common: "Wagtails and Pipits", species: 70, genera: 6 },
      { name: "Fringillidae", common: "Finches, Euphonias, and Allies", species: 236, genera: 50 },
      { name: "Rhodinocichlidae", common: "Thrush-tanager", species: 1, genera: 1 },
      { name: "Calcariidae", common: "Longspurs and Snow Buntings", species: 6, genera: 3 },
      { name: "Emberizidae", common: "Old World Buntings", species: 44, genera: 1 },
      { name: "Passerellidae", common: "New World Sparrows", species: 138, genera: 30 },
      { name: "Calyptophilidae", common: "Chat-tanagers", species: 2, genera: 1 },
      { name: "Zeledoniidae", common: "Wrenthrush", species: 1, genera: 1 },
      { name: "Phaenicophilidae", common: "Hispaniolan Tanagers", species: 4, genera: 3 },
      { name: "Nesospingidae", common: "Puerto Rican Tanager", species: 1, genera: 1 },
      { name: "Spindalidae", common: "Spindalises", species: 4, genera: 1 },
      { name: "Teretistridae", common: "Cuban Warblers", species: 2, genera: 1 },
      {
        name: "Icteridae",
        common: "New World Blackbirds, Troupials, and Allies",
        species: 108,
        genera: 31
      },
      { name: "Parulidae", common: "New World Warblers", species: 116, genera: 18 },
      { name: "Cardinalidae", common: "Cardinals and Allies", species: 52, genera: 14 },
      { name: "Mitrospingidae", common: "Mitrospingid Tanagers", species: 4, genera: 3 },
      { name: "Thraupidae", common: "Tanagers and Allies", species: 390, genera: 107 }
    ]
  }
];

const SPECIES_SEED = {
  Struthionidae: [
    {
      label: "Common Ostrich",
      scientificName: "Struthio camelus",
      summary: "The largest living bird, built for speed across open African landscapes.",
      habitat: "Savannas, Sahel scrub, and open semi-desert.",
      diet: "Seeds, grasses, leaves, flowers, and small invertebrates.",
      wingspan: "About 2 m",
      status: "Least Concern",
      notes: "A flightless ratite with powerful legs and highly social behavior."
    }
  ],
  Casuariidae: [
    {
      label: "Emu",
      scientificName: "Dromaius novaehollandiae",
      summary: "Australia's tallest native bird, adapted to wide-ranging movement in open country.",
      habitat: "Open woodland, grassland, and scrub across much of Australia.",
      diet: "Seeds, fruits, shoots, and invertebrates.",
      wingspan: "Vestigial wings",
      status: "Least Concern",
      notes: "Male emus incubate the eggs and care for the chicks."
    }
  ],
  Apterygidae: [
    {
      label: "North Island Brown Kiwi",
      scientificName: "Apteryx mantelli",
      summary: "A nocturnal kiwi with a long bill and a strong reliance on smell.",
      habitat: "Forest, scrub, and rough farmland in New Zealand.",
      diet: "Earthworms, insects, larvae, and fallen fruit.",
      wingspan: "Flightless",
      status: "Vulnerable",
      notes: "Kiwis are iconic flightless birds with whisker-like facial feathers."
    }
  ],
  Anatidae: [
    {
      label: "Mallard",
      scientificName: "Anas platyrhynchos",
      summary: "A widespread dabbling duck and the ancestor of most domestic duck breeds.",
      habitat: "Wetlands, ponds, lakes, estuaries, and city parks.",
      diet: "Aquatic plants, seeds, grains, and invertebrates.",
      wingspan: "81 to 98 cm",
      status: "Least Concern",
      notes: "Mallards are highly adaptable and thrive around people."
    }
  ],
  Phasianidae: [
    {
      label: "Indian Peafowl",
      scientificName: "Pavo cristatus",
      summary: "A large pheasant famous for the male's iridescent train and courtship display.",
      habitat: "Open forest, farmland edges, and villages in South Asia.",
      diet: "Seeds, insects, fruits, reptiles, and small animals.",
      wingspan: "140 to 160 cm",
      status: "Least Concern",
      notes: "The train is an ornamental tail covert display rather than the true tail."
    }
  ],
  Phoenicopteridae: [
    {
      label: "Greater Flamingo",
      scientificName: "Phoenicopterus roseus",
      summary: "A tall wader that filters food from saline lakes and lagoons.",
      habitat: "Salt pans, lagoons, estuaries, and shallow alkaline lakes.",
      diet: "Brine shrimp, algae, and other microscopic aquatic food.",
      wingspan: "140 to 170 cm",
      status: "Least Concern",
      notes: "Its pink color comes largely from carotenoid-rich food."
    }
  ],
  Columbidae: [
    {
      label: "Rock Pigeon",
      scientificName: "Columba livia",
      summary: "The wild ancestor of domestic pigeons and a globally familiar urban bird.",
      habitat: "Cliffs, towns, farmland, and cities worldwide.",
      diet: "Seeds, grains, and food scraps.",
      wingspan: "62 to 72 cm",
      status: "Least Concern",
      notes: "Rock Pigeons navigate exceptionally well and have long been used as messengers."
    }
  ],
  Rallidae: [
    {
      label: "Common Moorhen",
      scientificName: "Gallinula chloropus",
      summary: "A marsh bird with a red frontal shield and confident swimming gait.",
      habitat: "Ponds, marshes, canals, and slow vegetated water.",
      diet: "Aquatic plants, seeds, snails, and small invertebrates.",
      wingspan: "50 to 55 cm",
      status: "Least Concern",
      notes: "Moorhens often walk on floating vegetation with surprisingly long toes."
    }
  ],
  Alcidae: [
    {
      label: "Atlantic Puffin",
      scientificName: "Fratercula arctica",
      summary: "A compact seabird with a bright bill and powerful underwater wing-strokes.",
      habitat: "North Atlantic cliffs and offshore waters.",
      diet: "Small fish such as sand eels and capelin.",
      wingspan: "47 to 63 cm",
      status: "Vulnerable",
      notes: "Puffins carry multiple fish crosswise in the bill thanks to specialized tongue spines."
    }
  ],
  Spheniscidae: [
    {
      label: "Emperor Penguin",
      scientificName: "Aptenodytes forsteri",
      summary: "The tallest and heaviest penguin, breeding through Antarctic winter.",
      habitat: "Pack ice and surrounding Southern Ocean waters.",
      diet: "Fish, squid, and krill.",
      wingspan: "Flippered forelimbs",
      status: "Near Threatened",
      notes: "Males incubate the egg on their feet during the darkest part of winter."
    }
  ],
  Diomedeidae: [
    {
      label: "Wandering Albatross",
      scientificName: "Diomedea exulans",
      summary: "A giant oceanic glider with one of the longest wingspans of any bird.",
      habitat: "Open Southern Ocean, breeding on remote subantarctic islands.",
      diet: "Squid, fish, and carrion at sea.",
      wingspan: "250 to 350 cm",
      status: "Vulnerable",
      notes: "Dynamic soaring lets it cover huge distances with minimal flapping."
    }
  ],
  Ardeidae: [
    {
      label: "Great Blue Heron",
      scientificName: "Ardea herodias",
      summary: "A tall heron that stalks shallow water with slow, deliberate steps.",
      habitat: "Marshes, shorelines, rivers, and estuaries.",
      diet: "Fish, amphibians, crustaceans, and small vertebrates.",
      wingspan: "167 to 201 cm",
      status: "Least Concern",
      notes: "This species can hunt in fresh, brackish, and marine waters."
    }
  ],
  Trochilidae: [
    {
      label: "Ruby-throated Hummingbird",
      scientificName: "Archilochus colubris",
      summary: "A migratory hummingbird known for rapid wingbeats and precision hovering.",
      habitat: "Forest edges, gardens, meadows, and woodland clearings.",
      diet: "Nectar and small flying insects.",
      wingspan: "8 to 11 cm",
      status: "Least Concern",
      notes: "Many individuals cross the Gulf of Mexico during migration."
    }
  ],
  Strigidae: [
    {
      label: "Great Horned Owl",
      scientificName: "Bubo virginianus",
      summary: "A powerful owl with prominent ear tufts and a deep resonant voice.",
      habitat: "Forests, deserts, suburbs, and open country.",
      diet: "Mammals, birds, reptiles, and other vertebrates.",
      wingspan: "101 to 145 cm",
      status: "Least Concern",
      notes: "It is one of the most versatile avian predators in the Americas."
    }
  ],
  Accipitridae: [
    {
      label: "Red-tailed Hawk",
      scientificName: "Buteo jamaicensis",
      summary: "A broad-winged hawk often seen soaring over fields and roadsides.",
      habitat: "Open country, woodland edges, deserts, and suburbs.",
      diet: "Mostly small mammals, plus reptiles and birds.",
      wingspan: "114 to 133 cm",
      status: "Least Concern",
      notes: "Its classic scream is often used in film for any large raptor."
    },
    {
      label: "Bald Eagle",
      scientificName: "Haliaeetus leucocephalus",
      summary: "A large fish-eating eagle associated with major North American waterways.",
      habitat: "Lakes, rivers, reservoirs, and coastal estuaries.",
      diet: "Fish, waterbirds, carrion, and opportunistic prey.",
      wingspan: "180 to 230 cm",
      status: "Least Concern",
      notes: "The species has rebounded strongly in North America after major conservation efforts."
    }
  ],
  Bucerotidae: [
    {
      label: "Great Hornbill",
      scientificName: "Buceros bicornis",
      summary: "A huge forest hornbill with a striking casque and loud wingbeats.",
      habitat: "Tall evergreen and moist deciduous forest in South and Southeast Asia.",
      diet: "Mostly fruit, with insects and small vertebrates.",
      wingspan: "152 to 180 cm",
      status: "Vulnerable",
      notes: "Females seal themselves inside tree cavities while nesting."
    }
  ],
  Alcedinidae: [
    {
      label: "Common Kingfisher",
      scientificName: "Alcedo atthis",
      summary: "A jewel-like fishing bird that darts low over clear water.",
      habitat: "Streams, canals, ponds, and slow rivers with banks for nesting.",
      diet: "Small fish, aquatic insects, and crustaceans.",
      wingspan: "24 to 26 cm",
      status: "Least Concern",
      notes: "It nests in burrows excavated into banks."
    }
  ],
  Ramphastidae: [
    {
      label: "Toco Toucan",
      scientificName: "Ramphastos toco",
      summary: "A large toucan with an oversized bill and bold black, white, and orange patterning.",
      habitat: "Woodland edges, gallery forest, and savanna mosaics in South America.",
      diet: "Fruit, eggs, nestlings, and small animals.",
      wingspan: "50 to 60 cm",
      status: "Least Concern",
      notes: "The bill is lightweight despite its size, thanks to internal air spaces."
    }
  ],
  Picidae: [
    {
      label: "Great Spotted Woodpecker",
      scientificName: "Dendrocopos major",
      summary: "A familiar Eurasian woodpecker that drums loudly on resonant trunks.",
      habitat: "Woodland, parks, orchards, and large gardens.",
      diet: "Insects, larvae, seeds, and nuts.",
      wingspan: "34 to 39 cm",
      status: "Least Concern",
      notes: "It wedges seeds and cones into bark crevices before hammering them open."
    }
  ],
  Falconidae: [
    {
      label: "Peregrine Falcon",
      scientificName: "Falco peregrinus",
      summary: "A fast aerial predator famous for its high-speed hunting dives.",
      habitat: "Cliffs, coasts, cities, and open landscapes worldwide.",
      diet: "Mostly medium-sized birds captured in flight.",
      wingspan: "74 to 120 cm",
      status: "Least Concern",
      notes: "Peregrines have adapted especially well to nesting on urban towers and bridges."
    }
  ],
  Psittacidae: [
    {
      label: "Scarlet Macaw",
      scientificName: "Ara macao",
      summary: "A brilliantly colored macaw of tropical forest canopies and river corridors.",
      habitat: "Humid forest, woodland edges, and riverine forest.",
      diet: "Seeds, nuts, fruits, and clay from exposed licks.",
      wingspan: "99 to 109 cm",
      status: "Least Concern",
      notes: "Macaws often travel in noisy bonded pairs or small groups."
    }
  ],
  Psittaculidae: [
    {
      label: "Rose-ringed Parakeet",
      scientificName: "Psittacula krameri",
      summary: "A highly adaptable parakeet now established far beyond its native range.",
      habitat: "Woodland, farmland, cities, and suburban parks.",
      diet: "Seeds, fruits, buds, and cultivated crops.",
      wingspan: "38 to 42 cm",
      status: "Least Concern",
      notes: "Urban feral populations are now common in many parts of Europe."
    }
  ],
  Tyrannidae: [
    {
      label: "Eastern Phoebe",
      scientificName: "Sayornis phoebe",
      summary: "A familiar flycatcher that sallies from low perches and often nests on buildings.",
      habitat: "Woodland edges, farms, bridges, and suburban areas near water.",
      diet: "Flying insects and other small arthropods.",
      wingspan: "26 to 28 cm",
      status: "Least Concern",
      notes: "It pumps its tail repeatedly while perched."
    }
  ],
  Furnariidae: [
    {
      label: "Rufous Hornero",
      scientificName: "Furnarius rufus",
      summary: "A clay-nest building ovenbird widely seen in open habitats of South America.",
      habitat: "Grassland, farmland, towns, and open woodland.",
      diet: "Insects and other small invertebrates.",
      wingspan: "25 to 28 cm",
      status: "Least Concern",
      notes: "Its oven-shaped mud nest gives the family one of its common English names."
    }
  ],
  Paradisaeidae: [
    {
      label: "Greater Bird-of-paradise",
      scientificName: "Paradisaea apoda",
      summary: "A spectacular lekking species with elongated flank plumes and elaborate display behavior.",
      habitat: "Lowland and hill rainforest in New Guinea and nearby islands.",
      diet: "Fruit and arthropods.",
      wingspan: "43 to 48 cm",
      status: "Least Concern",
      notes: "Males gather at display trees and perform coordinated visual displays."
    }
  ],
  Corvidae: [
    {
      label: "Common Raven",
      scientificName: "Corvus corax",
      summary: "A large corvid with a wedge-shaped tail and a remarkably varied voice.",
      habitat: "Mountains, coasts, forests, and open country across the Northern Hemisphere.",
      diet: "Carrion, insects, grains, eggs, and small animals.",
      wingspan: "100 to 150 cm",
      status: "Least Concern",
      notes: "Ravens are highly adaptable and are well known for problem-solving behavior."
    },
    {
      label: "Blue Jay",
      scientificName: "Cyanocitta cristata",
      summary: "A crested jay with bold patterning and a strong role in woodland acorn dispersal.",
      habitat: "Mixed woodland, parks, and suburban edges in eastern North America.",
      diet: "Seeds, nuts, insects, and occasional eggs or small vertebrates.",
      wingspan: "34 to 43 cm",
      status: "Least Concern",
      notes: "Blue Jays often cache food and can mimic the calls of hawks."
    }
  ],
  Paridae: [
    {
      label: "Black-capped Chickadee",
      scientificName: "Poecile atricapillus",
      summary: "A small active tit that anchors mixed winter flocks in North America.",
      habitat: "Woodland, parks, suburban trees, and riparian edges.",
      diet: "Insects, seeds, and berries.",
      wingspan: "16 to 21 cm",
      status: "Least Concern",
      notes: "It stores food widely and remembers cache locations with impressive precision."
    }
  ],
  Hirundinidae: [
    {
      label: "Barn Swallow",
      scientificName: "Hirundo rustica",
      summary: "A graceful migrant with deeply forked tail streamers and agile aerial feeding.",
      habitat: "Open country, farmland, wetlands, and human structures.",
      diet: "Flying insects taken on the wing.",
      wingspan: "29 to 32 cm",
      status: "Least Concern",
      notes: "It often nests inside barns, sheds, and bridges."
    }
  ],
  Troglodytidae: [
    {
      label: "House Wren",
      scientificName: "Troglodytes aedon",
      summary: "A small loud wren that readily nests around houses and gardens.",
      habitat: "Shrubby edges, woodland openings, gardens, and towns.",
      diet: "Insects and spiders.",
      wingspan: "12 to 15 cm",
      status: "Least Concern",
      notes: "Males often start multiple nests before a female chooses one."
    }
  ],
  Mimidae: [
    {
      label: "Northern Mockingbird",
      scientificName: "Mimus polyglottos",
      summary: "A bold songster with an enormous repertoire and strong territorial behavior.",
      habitat: "Suburbs, parks, thorn scrub, and open woodland.",
      diet: "Insects, berries, and other fruit.",
      wingspan: "31 to 38 cm",
      status: "Least Concern",
      notes: "It is famous for repeating and recombining phrases from other birds and noises."
    }
  ],
  Turdidae: [
    {
      label: "American Robin",
      scientificName: "Turdus migratorius",
      summary: "A familiar thrush with a warm orange breast and an early dawn song.",
      habitat: "Lawns, woodland edges, parks, and suburbs.",
      diet: "Earthworms, insects, and fruit.",
      wingspan: "31 to 41 cm",
      status: "Least Concern",
      notes: "Robins shift seasonally from ground foraging to fruit-heavy diets."
    }
  ],
  Muscicapidae: [
    {
      label: "European Robin",
      scientificName: "Erithacus rubecula",
      summary: "A small chat-like flycatcher with a bright face and confiding behavior.",
      habitat: "Woodland, hedgerows, parks, and gardens.",
      diet: "Insects, spiders, and berries.",
      wingspan: "20 to 22 cm",
      status: "Least Concern",
      notes: "Despite its tame image, it is often fiercely territorial."
    }
  ],
  Nectariniidae: [
    {
      label: "Olive-backed Sunbird",
      scientificName: "Cinnyris jugularis",
      summary: "A small nectar-feeding passerine with a decurved bill and broad tropical range.",
      habitat: "Gardens, mangroves, forest edge, and disturbed tropical habitats.",
      diet: "Nectar, spiders, and small insects.",
      wingspan: "11 to 13 cm",
      status: "Least Concern",
      notes: "Sunbirds often hover briefly but usually feed while perched."
    }
  ],
  Fringillidae: [
    {
      label: "European Goldfinch",
      scientificName: "Carduelis carduelis",
      summary: "A bright finch with a red face mask and strong association with thistle seed.",
      habitat: "Open woodland, orchards, farmland, and gardens.",
      diet: "Seeds, especially from thistles and teasels.",
      wingspan: "21 to 25 cm",
      status: "Least Concern",
      notes: "Its fine bill is especially well suited to extracting small seeds."
    }
  ],
  Passerellidae: [
    {
      label: "Song Sparrow",
      scientificName: "Melospiza melodia",
      summary: "A widespread sparrow with rich regional variation in song and plumage.",
      habitat: "Marsh edges, shrubby fields, riparian cover, and gardens.",
      diet: "Seeds, insects, and small invertebrates.",
      wingspan: "18 to 25 cm",
      status: "Least Concern",
      notes: "Song structure varies strongly across populations and regions."
    }
  ],
  Icteridae: [
    {
      label: "Red-winged Blackbird",
      scientificName: "Agelaius phoeniceus",
      summary: "A marshland icterid whose males defend reedbeds with flashing shoulder patches.",
      habitat: "Marshes, wet meadows, roadside ditches, and agricultural fields.",
      diet: "Seeds, grains, and insects.",
      wingspan: "31 to 40 cm",
      status: "Least Concern",
      notes: "Outside breeding season it often gathers in very large flocks."
    }
  ],
  Parulidae: [
    {
      label: "Yellow Warbler",
      scientificName: "Setophaga petechia",
      summary: "A bright migratory warbler common in wet shrubs and riparian thickets.",
      habitat: "Willows, wetlands, shrubby stream edges, and second growth.",
      diet: "Insects and other small arthropods.",
      wingspan: "16 to 22 cm",
      status: "Least Concern",
      notes: "Females may bury cowbird eggs under fresh nest lining."
    }
  ],
  Cardinalidae: [
    {
      label: "Northern Cardinal",
      scientificName: "Cardinalis cardinalis",
      summary: "A conspicuous songbird with a crest, stout bill, and strong pair bonds.",
      habitat: "Gardens, woodland edge, shrubland, and suburban neighborhoods.",
      diet: "Seeds, fruit, and insects.",
      wingspan: "25 to 31 cm",
      status: "Least Concern",
      notes: "Both sexes sing, and pairs may duet in the breeding season."
    }
  ],
  Thraupidae: [
    {
      label: "Blue-gray Tanager",
      scientificName: "Thraupis episcopus",
      summary: "A widespread Neotropical tanager comfortable in edges, parks, and cities.",
      habitat: "Forest edge, gardens, plantations, and urban green space.",
      diet: "Fruit, nectar, and insects.",
      wingspan: "26 to 30 cm",
      status: "Least Concern",
      notes: "It is one of the most familiar garden birds in much of tropical America."
    }
  ]
};

function toId(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildOrderSummary(order) {
  return `AviList v2025 recognizes ${order.species} species across ${order.genera} genera and ${order.families.length} families in ${order.name}.`;
}

function buildFamilySummary(family) {
  return `${family.common} recognized by AviList v2025 with ${family.species} species across ${family.genera} genera.`;
}

function buildGenusSummary(genusName, family) {
  return `${genusName} represented here as a genus branch within ${family.name}.`;
}

function addChild(tree, parentId, childId) {
  tree.children[parentId] ||= [];
  tree.children[parentId].push(childId);
  tree.parents[childId] = parentId;
}

function getSpeciesGenusName(species) {
  return species.genus || species.scientificName.split(/\s+/)[0];
}

function ensureGenus(tree, familyId, family, genusName) {
  const genusId = toId(genusName);

  if (!tree.nodes[genusId]) {
    tree.nodes[genusId] = {
      id: genusId,
      type: "taxon",
      label: genusName,
      rank: "genus",
      summary: buildGenusSummary(genusName, family)
    };
    addChild(tree, familyId, genusId);
  }

  return genusId;
}

function addSpecies(tree, parentId, species) {
  const id = toId(species.label);
  const node = {
    id,
    type: "species",
    label: species.label,
    rank: "species",
    summary: species.summary,
    profile: {
      scientificName: species.scientificName,
      habitat: species.habitat,
      diet: species.diet,
      wingspan: species.wingspan,
      status: species.status
    },
    notes: species.notes
  };
  if (species.image) {
    node.image = species.image;
  }
  tree.nodes[id] = node;
  addChild(tree, parentId, id);
}

function applyDerivedBranchImages(tree) {
  const resolvedImages = new Map();

  function resolveNodeImage(nodeId) {
    if (resolvedImages.has(nodeId)) {
      return resolvedImages.get(nodeId);
    }

    const node = tree.nodes[nodeId];

    if (!node) {
      resolvedImages.set(nodeId, "");
      return "";
    }

    if (node.type === "species") {
      const image = node.image || "";
      resolvedImages.set(nodeId, image);
      return image;
    }

    let image = "";

    for (const childId of tree.children[nodeId] || []) {
      image = resolveNodeImage(childId);

      if (image) {
        break;
      }
    }

    if (image) {
      node.image = image;
    }

    resolvedImages.set(nodeId, image);
    return image;
  }

  resolveNodeImage(tree.meta.rootId);
}

function buildTaxonomy() {
  const tree = {
    meta: {
      title: "Bird Atlas",
      rootId: "all-birds",
      sourceNote:
        "Seeded from the public Birds of the World taxonomy pages and AviList v2025 order/family checklist: 46 orders, 252 families, and selected example species pages.",
      leafTemplate: [
        {
          key: "scientificName",
          label: "Scientific name"
        },
        {
          key: "habitat",
          label: "Habitat"
        },
        {
          key: "diet",
          label: "Diet"
        },
        {
          key: "wingspan",
          label: "Wingspan"
        },
        {
          key: "status",
          label: "Conservation status"
        }
      ]
    },
    nodes: {
      "all-birds": {
        id: "all-birds",
        type: "taxon",
        label: "Aves",
        rank: "class",
        summary:
          "A broad starter scaffold for the class Aves, seeded with public Birds of the World and AviList structure so you can keep expanding it yourself."
      }
    },
    children: {
      "all-birds": []
    },
    parents: {}
  };

  ORDER_SEED.forEach((order) => {
    const orderId = toId(order.name);
    tree.nodes[orderId] = {
      id: orderId,
      type: "taxon",
      label: order.name,
      rank: "order",
      summary: buildOrderSummary(order)
    };
    addChild(tree, tree.meta.rootId, orderId);

    order.families.forEach((family) => {
      const familyId = toId(family.name);
      tree.nodes[familyId] = {
        id: familyId,
        type: "taxon",
        label: family.name,
        rank: "family",
        summary: buildFamilySummary(family)
      };
      addChild(tree, orderId, familyId);

      (SPECIES_SEED[family.name] || []).forEach((species) => {
        const genusId = ensureGenus(
          tree,
          familyId,
          family,
          getSpeciesGenusName(species)
        );
        addSpecies(tree, genusId, species);
      });
    });
  });

  applyDerivedBranchImages(tree);
  return tree;
}

export const defaultTaxonomy = buildTaxonomy();
