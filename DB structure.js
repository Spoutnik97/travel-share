/* eslint-disable */
const db = {
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
      conversations: {
        conv1: Date, // date de la dernière consultation
        conv3: Date,
      },
      good_plans_saved: {
        // bons plans enregistrés par l'utilisateur
        place1: true,
        place97: true,
      },
      good_plans_shared: {
        // partagé par les autres utilisateurs
        place3: true,
        place103: true,
      },
      points: Integer,
      meets: {
        user2: true,
        user5: true,
      },
      last_logins: '...',
    },
    user2: '...',
    user3: ' ...',
  },
  conversations: {
    conv1: {
      id: String,
      name: String,
      members: ['user1', 'user3'],
      created_at: Date,
      messages: {
        mess1: {
          sender_id: String,
          text: String,
          payload: Oneof(String, Binary, JSON, '...'),
          type: [
            'text',
            'image',
            'link',
            'audio',
            'video',
            'location',
            'contact',
          ],
          created_at: Date,
          status: ['sent', 'waiting'],
        },
        mess2: '...',
        mess3: '...',
      },
      last_message: String,
      last_message_time: Date,
      last_message_sender: String,
    },
  },
  airports: {
    airport1: {
      name: String,
      location: Object,
      location_name: String,
      picture: URL,
      map: URL,
      services: {
        service1: {
          name: String,
          description: String,
          type: ['restaurant', 'atm', '...'],
          location: String,
          location_name: String,
          picture: URL,
          likes: Integer,
        },
      },
      tips: {
        tip1: {
          idontknow: '...',
        },
      },
    },
  },
  places: {
    // les bons plans
    place1: {
      name: String,
      description: String,
      picture: URL,
      type: ['restaurant', 'outdoor', 'indoor', '...'],
      location: String,
      location_name: String,
      created_at: Date,
      creator_id: String,
      opinion: {
        likes: Integer, // juste rating ?
        rating: Number,
        likers: {
          liker1: true,
          liker2: true,
        }, // shared ?
      },
      comments: {
        sender_id: String,
        title: String,
        description: Sring,
        created_at: Date,
      },
    },
  },
};

const locationObject = {
  coords: {
    latitude: Number, // The latitude in degrees.
    longitude: Number, // The longitude in degrees.
    altitude: Number, // The altitude in meters above the WGS 84 reference ellipsoid.
    accuracy: Number, // The radius of uncertainty for the location, measured in meters.
    altitudeAccuracy: Number, // The accuracy of the altitude value, in meters (iOS only).
    heading: Number, //  Horizontal direction of travel of this device, measured in degrees starting at due north and continuing clockwise around the compass. Thus, north is 0 degrees, east is 90 degrees, south is 180 degrees, and so on.
    speed: Number, // The instantaneous speed of the device in meters per second.
  },
};
