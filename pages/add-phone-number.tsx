import React, { FC, useEffect } from "react";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserSSR,
  AuthAction,
} from "next-firebase-auth";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AppLayout from "../layout/AppLayout";
import {
  Grid,
  IconButton,
  Typography,
  TextField,
  Container,
  Button,
} from "@mui/material";
import { Phone } from "@mui/icons-material";
import { PhoneNumberRegex } from "../utils/constants";
import { RecaptchaVerifier } from "firebase/auth";
import { auth, onSendCode } from "../utils/firebase";
import { useRouter } from "next/router";
import { addPhoneNumber } from "../utils/axios";

interface IAddPhoneNumber {
  referer: string;
}

type TPhoneNumber = {
  phoneNumber: string;
};

const schema = z.object({
  phoneNumber: z.string().regex(PhoneNumberRegex),
});

const AddPhoneNumber: FC<IAddPhoneNumber> = (props) => {
  const authUser = useAuthUser();
  const router = useRouter();
  const methods = useForm<TPhoneNumber>({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: { phoneNumber: "" },
  });
  const { referer } = props;
  const { handleSubmit, control, formState } = methods;
  const handleSubmitPhoneNumber = async (phoneNumber: string) => {
    const response = await addPhoneNumber({
      phoneNumber: phoneNumber,
    });
    if (response.status === 200) {
      router.push({
        pathname: "/verify-phone-number",
        query: {
          phoneNumber: phoneNumber,
          referer: referer,
        },
      });
    }
  };
  return (
    <AppLayout email={authUser.email} signOut={authUser.signOut}>
      <FormProvider {...methods}>
        <form>
          <Container
            //variant="outlined"
            maxWidth="md"
            sx={{
              my: { xs: 3, md: 2 },
              py: { xs: 2, md: 2 },
              backgroundColor: "transparent",
            }}
          >
            <Grid textAlign="center">
              <IconButton
                sx={{ backgroundColor: "lightgrey", marginBottom: "10px" }}
              >
                <Phone color="primary" />
              </IconButton>

              <Typography component="h1" gutterBottom variant="h5">
                Add your Phone number.
              </Typography>
              <Typography variant="body2">
                We need it as simple verification and also in case you need to
                be contacted urgently.
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: { xs: 3, md: 2 },
                }}
              >
                We will not disclose your phone number to anyone.
              </Typography>
              <Typography component="div">
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      required
                      //label={t("Nickname")}
                      label="Phone Number"
                      variant="outlined"
                      error={!!error}
                    />
                  )}
                />
              </Typography>
              <Button
                size="small"
                id="submit-phone-number"
                disabled={!formState.isValid}
                sx={{
                  mt: 2,
                }}
                onClick={() =>
                  handleSubmit((values) => {
                    const phoneNumber = `+254${values.phoneNumber.slice(1)}`;
                    handleSubmitPhoneNumber(phoneNumber);
                    // onSendCode(phoneNumber).then((success) => {
                    //   if (success) {
                    //     router.push({
                    //       pathname: "/verify-phone-number",
                    //       query: {
                    //         referer: referer,
                    //       },
                    //     });
                    //   }
                    // });
                  })()
                }
                variant="contained"
              >
                Confirm
              </Button>
            </Grid>
          </Container>
        </form>
      </FormProvider>
    </AppLayout>
  );
};

AddPhoneNumber.defaultProps = {};

export const getServerSideProps = withAuthUserSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  const referer = req.headers.referer;
  return {
    props: {
      referer: referer,
    },
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(AddPhoneNumber);
