 const DEFAULT_LANG='EN'


const EMPTY_MESSAGE = {
  en: 'System error, Please try again later',
  fr: 'Erreur système, veuillez réessayer ultérieurement',
};

 const MESSAGES = {

  TITLE_OOPS: {
    en: 'Oops',
    fr: 'Oops',
  },
  PHONE_IS_REQUIRED: {
    en: 'Phone required',
    fr: 'Phone required',
  },
  DEVICE_ID_IS_REQUIRED: {
    en: 'Device ID required',
    fr: 'Device ID required',
  },
  REQUEST_AUTH_API_ERROR: {
    en: 'System error, Please try again later',
    fr: 'Erreur système, veuillez réessayer ultérieurement',
  },
  ANY_RESPONSE_FROM_AUTH_API: {
    en: 'System error, Please try again later',
    fr: 'Erreur système, veuillez réessayer ultérieurement',
  },
  PIN_IS_REQUIRED: {
    en: 'Pin is required',
    fr: 'Pin is required',
  },
  BAD_REQUEST: {
    en: 'System error, Please try again later',
    fr: 'Erreur système, veuillez réessayer ultérieurement',
  },
  MAX_FAILURE: {
    en: 'Maximum request limit reached',
    fr: 'Limite de demande maximale atteinte',
  },
  CONSECUTIVE_REQUEST: {
    en: 'Maximum request limit reached',
    fr: 'Limite de demande maximale atteinte',
  },
  INTERNAL_SERVER_ERROR: {
    en: 'System error, Please try again later',
    fr: 'Erreur système, veuillez réessayer ultérieurement',
  },
  PHONE_NOT_VALID: {
    en: 'Invalid phone number format',
    fr: 'Numéro de téléphone au format invalide',
  },
  CODE_PIN_NOT_VALID: {
    en: 'Invalid pin code',
    fr: 'Code PIN invalide',
  },
  MAX_FAILURE_CHECK_PIN: {
    en: 'You have tried more than once, you should request for anpther code pin',
    fr: 'Vous avez essayé plusieurs fois, vous devez demander à nouveau un nouveau code de vérification',
  },
  RIDER_PROFILE_UPDATE_TITLE: {
    fr: 'Bravo',
    en: 'Great,',
  }
};
 const MESSAGES_BY_COUNTRY = {
     DZA: {
     },
     MAR: {
         TRIP_ESTIMATE_NO_PRICING: {
             en: 'Soon available in Tanger',
             fr: 'Prochainement disponible à Tanger',
         },
         // en: 'Our service will be available 24/7 starting Decemer 1st. The application is currently available from 8 pm to 7 am.',
         // fr: "Notre service sera disponible 24h/24 à partir du 1 Decembre. L'application est actuellement disponible de 20h à 7h.",
         //

     },
     TUN: {},
 };
 module.exports=MESSAGES;
 module.exports=MESSAGES_BY_COUNTRY;

module.exports.getLocalMessage= function (key, lang = DEFAULT_LANG, defaultMessage) {
  try {
    return MESSAGES[key][lang];
  } catch (e) {
    return defaultMessage || '';
  }
}

module.exports.getLocalMessageExt=  function (key, {
  msgfield = 'msg', msgsfields = 'msgs', lang = DEFAULT_LANG, defaultMessage = '',
} = {}) {
  let msg;
  try {
    msg = MESSAGES[key];
    const defaultLangMessage = (msg[lang]) ? msg[lang] : defaultMessage;
    return {
      [msgfield]: defaultLangMessage,
      [msgsfields]: msg,
    };
  } catch (e) {
    return defaultMessage || '';
  }
}

module.exports.getLocalMessageExtError= function (key, {
  msgfield = 'error', msgsfields = 'msgs', lang = DEFAULT_LANG, defaultMessage = '',
} = {}) {
  let msg;
  try {
    msg = MESSAGES[key];
    const defaultLangMessage = (msg[lang]) ? msg[lang] : defaultMessage;
    return {
      [msgfield]: defaultLangMessage,
      [msgsfields]: msg,
    };
  } catch (e) {
    return {
      [msgfield]: defaultMessage,
      [msgsfields]: EMPTY_MESSAGE,
    };
  }
}


module.exports.getMLMessage= function (key, defaultMessages) {
    try {
    return MESSAGES[key];
  } catch (e) {
    return defaultMessages || EMPTY_MESSAGE;
  }
}
module.exports.getMLMessageByCountry= function (key, Country, defaultMessages) {
  try {
    return MESSAGES_BY_COUNTRY[Country][key] || MESSAGES[key] || defaultMessages || EMPTY_MESSAGE;
  } catch (e) {
    return defaultMessages || EMPTY_MESSAGE;
  }
}


// export { messages, getLocalMessage, getMultiLangMessage };
