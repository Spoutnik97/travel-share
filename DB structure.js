/* eslint-disable */
{
  users: {
    user1: {
      given_name: String,
      family_name: String,
      birthdate: Date,
      email: String,
      picture: URL, // link to DB
      languages: {
        french: true,
        english: true,
      },
      resume: String, // description du profil
      countries_visited: {
        france: true,
        italy: true,
      },
      countries_dreamed: {
        spain: true,
        china: true,
      },
      is_verified: Boolean, // email vérfié
      is_blocked: Boolean, // utilisateur bloqué
      is_reported: Boolean, // utilisateur signalé
      is_active: Boolean, // utilisateur en ligne
      created_at: Date,
      conversations:{
        conv1: Date, // date de la dernière consultation
        conv3: Date,
      },
      good_plans_saved: { // bons plans enregistrés par l'utilisateur
        place1: true,
        place97: true,
      },
      good_plans_shared: { // partagé par les autres utilisateurs
        place3: true,
        place103: true,
      },
      points: Integer,
      meets: {
        user2: true,
        user5: true,
      },
      last_logins:...,
    },
    user2: ...,
    user3: ...
  },
  conversations: {
    conv1: {
      name: String,
      members: {
        user1: true,
        user3: true;
      },
      created_at: Date,
      messages: {
        mess1: {
          sender_id: String,
          text: String,
          payload: Oneof( String, Binary, JSON, ...),
          type: ['text', 'image', 'link', 'audio', 'video', 'localisation', 'contact'],
          created_at: Date,
          status: ['sent', 'waiting', ]
        },
        mess2: ...,
        mess3: ...,
      },
      last_message: String,
      last_message_time: Date,
    },
   },
   airports: {
     airport1: {
       name: String,
       localisation_coord:,
       localisation_name: String,
       picture: URL,
       map: URL,
       services: {
         service1: {
           name: String,
           description: String,
           type: ['restaurant', 'atm', '...'],
           localisation_coord:,
           localisation_name: String,
           picture: URL,
           likes: Integer,
         }
       },
       tips: {
         tip1: {
           ...
         }
       }
     }
   },
   places: { // les bons plans
     place1: {
       name: String,
       description: String,
       picture: URL,
       type: ['restaurant', 'outdoor', 'indoor', ...],
       localisation_coord:,
       localisation_name: String,
       created_at: Date,
       creator_id: String,
       opinion: {
         likes: Integer,// juste rating ?
         rating: Number,
         likers: {
           liker1: true,
           liker2: true,
           ...
         }, // shared ?
       },
       comments: {
         sender_id: String,
         title: String,
         description: Sring,
         created_at: Date,
       }

     },
   },
 },
