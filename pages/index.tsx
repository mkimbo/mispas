import { Button } from "@mui/material";
import Link from "next/link";
import GetLocation from "../src/components/GetLocation";
import {
  useAppContext,
  useAppDispatch,
} from "../src/context/GlobalContext";

import { useTranslation } from "../src/i18n";
export default function Home() {
  const dispatch = useAppDispatch();
  const state = useAppContext();
  const t = useTranslation();
  return (
    <div>
      <Link href="/admin">admin</Link>
      <br />
      <Link href="/login">login</Link>
      <br />
      <Button
        onClick={() => {
          if (state.langCode === "en") {
            dispatch({ type: "SET_LANG_CODE", payload: "sw" });
          } else {
            dispatch({ type: "SET_LANG_CODE", payload: "en" });
          }
        }}
      >
        {t("homepage.languageButton.text")}
      </Button>
      <br />
      <GetLocation />
      <br />
      <Link href="/search">Search</Link>
      <br />
      <Link href="/missing">Missing</Link>
      <br />
    </div>
  );
}
