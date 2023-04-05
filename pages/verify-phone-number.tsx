import React, { FC, VFC } from "react";
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
  OutlinedInput,
  Typography,
  FormLabel,
  TextField,
  Paper,
  Container,
  Button,
} from "@mui/material";
import { Password } from "@mui/icons-material";
import { onVerifyCode } from "../utils/firebase";
import { useRouter } from "next/router";
import { verifyPhoneNumber } from "../utils/axios";

type TVerificationCode = {
  verificationCode: string;
};

const schema = z.object({
  verificationCode: z.string().min(6),
});

const VerifyPhoneNumber: FC = (props) => {
  const router = useRouter();
  const referer = router.query?.referer as string;
  const phoneNumber = router.query?.phoneNumber as string;
  const authUser = useAuthUser();
  const methods = useForm<TVerificationCode>({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: { verificationCode: "" },
  });
  const { handleSubmit, control, formState } = methods;
  const handleVerifyPhoneNumber = async (verificationCode: string) => {
    const response = await verifyPhoneNumber({
      phoneNumber: phoneNumber,
      otp: verificationCode,
    });
    if (response.status === 200) {
      console.log("phone number was successfully verified", referer);
      router.push(referer);
    }
  };
  return (
    <div>
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
                <Password color="primary" />

                <Typography
                  sx={{ marginTop: "10px" }}
                  gutterBottom
                  variant="h6"
                >
                  Enter the verification code sent to your phone number.
                </Typography>

                <Typography component="div">
                  <Controller
                    name="verificationCode"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Enter code"
                        variant="outlined"
                        error={!!error}
                      />
                    )}
                  />
                </Typography>
                <Button
                  size="small"
                  sx={{
                    mt: 2,
                  }}
                  disabled={!formState.isValid}
                  onClick={() => {
                    handleSubmit((values) => {
                      handleVerifyPhoneNumber(values.verificationCode);
                      // onVerifyCode(values.verificationCode).then((success) => {
                      //   if (success) {
                      //     console.log(
                      //       "phone number was successfully verified",
                      //       referer
                      //     );
                      //     router.push(referer);
                      //   }
                      // });
                    })();
                  }}
                  variant="contained"
                >
                  Verify
                </Button>
              </Grid>
            </Container>
          </form>
        </FormProvider>
      </AppLayout>
    </div>
  );
};

//VerifyPhoneNumber.defaultProps = defaultProps;

export const getServerSideProps = withAuthUserSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  return {
    props: {},
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(VerifyPhoneNumber);
