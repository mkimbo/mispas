import { TLangCode } from "./translation.hook";
import layout_en from "./layout/en";
import layout_sw from "./layout/sw";
import search_en from "./search/en";
import search_sw from "./search/sw";
import homepage_en from "./homepage/en";
import homepage_sw from "./homepage/sw";
type TLangTrans = {
  en: Record<string, string>;
  sw: Record<string, string>;
};

const _trans: TLangTrans = {
  en: Object.assign({}, layout_en, search_en, homepage_en),
  sw: Object.assign({}, layout_sw, search_sw, homepage_sw),
};
// /**
//  * @deprecated
//  */
// var _lang: TLangCode | null;
export const translate = (
  langCode: TLangCode,
  s: string,
  replacements?: any
) => {
  const defaultTrans = _trans["en"];
  let useTrans = _trans["en"];
  if (
    _trans.hasOwnProperty(langCode) &&
    typeof _trans[langCode] === "object"
  ) {
    useTrans = _trans[langCode];
  }
  s = useTrans[s] || defaultTrans[s] || s;

  for (const key in replacements) {
    const pattern = `%%${key}%%`;
    const value = replacements[key];
    while (s.indexOf(pattern) !== -1) {
      if (typeof value === "string") {
        s = s.replace(pattern, translate(langCode, value));
      } else {
        s = s.replace(pattern, value);
      }
    }
  }
  return s;
};

/* export const getTranslateFunc = () => {
  return translate.bind(null, store.getState().ui.settings.langCode);
} */

// /**
//  * @deprecated please use useI18n instead
//  */
// export const t = (s: string, replacements?: any): string => {
//   if (!_lang) {
//     _lang = store.getState().ui.settings.langCode;
//   }
//   return translate(_lang, s, replacements);
// };

// export const updateLang = (lang: TLangCode) => {
//   _lang = lang;
// }

// /**
//  * @deprecated please use useLangCode instead
//  */
// export const tGetLang = (): TLangCode => {
//   if (!_lang) {
//     _lang = store.getState().ui.settings.langCode;
//   }
//   return _lang;
// };

// /**
//  * @deprecated please use useTranslateWithJsonsFunc instead
//  */
// export const tLocaleObject = (langObj: TLangLabel | string | any) => {
//   if (!_lang) {
//     _lang = store.getState().ui.settings.langCode;
//   }
//   // console.log(langObj)
//   if (typeof langObj === 'object') {
//     if (!langObj['zh-Hant']) {
//       const newlangObj = {}
//       _.forEach(langObj, (val, key) => {
//         newlangObj[normalizeLangCode(key)] = val;
//       })
//       langObj = newlangObj;
//     }
//     return langObj[_lang] || langObj.en;
//   } else if (typeof langObj === 'string') {
//     return langObj;
//   } else {
//     return _.toString(langObj)
//   }
// }

export * from "./translation.hook";
// export default t;

/* export const appendTranslation = (trans: TLangTrans) => {
  _.merge(_trans, trans);
} */

/* export const normalizeLangCode = (langCode: string): TLangCode => {
  if (langCode.startsWith('zh')) {
    const suffix = langCode.split('-')[1] || 'hant';
    switch (suffix) {
      case 'hant':
      case 'tw':
      case 'hk':
        return 'zh-Hant';
      default:
        return 'zh-Hans';
    }
  } else {
    return 'en';
  }
} */
