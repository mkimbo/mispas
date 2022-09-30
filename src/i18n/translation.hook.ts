//
import { useCallback, useMemo } from "react";
import { translate } from ".";
import { useAppContext } from "../context/GlobalContext";
//import { TLangAny } from "../models";

export type TLangAny<T = any> = {
  en: T;
  sw: T;
};

export type TLangCode = "en" | "sw";

export const useTranslation = () => {
  const langCode = useLangCode();
  return useMemo(() => translate.bind(null, langCode), [langCode]);
};

export const useLangCode = () => useAppContext().langCode;

export const useTranslateWithJsonsFunc = <T = any>(): ((
  json: TLangAny<T>
) => T) => {
  const langCode = useLangCode();
  return useMemo(
    () => (json) => json[langCode] || json["en"] || json["sw"],
    [langCode]
  );
};
