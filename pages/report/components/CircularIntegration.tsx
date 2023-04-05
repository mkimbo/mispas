import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import UploadIcon from "@mui/icons-material/CloudUpload";
import WarnIcon from "@mui/icons-material/Warning";
import { useTranslation } from "../../../i18n";

interface IProps {
  handleClick: () => void;
  loading: boolean;
  success: boolean;
  error: boolean;
}

const CircularIntegration: React.FunctionComponent<IProps> = ({
  handleClick,
  loading,
  success,
  error,
}) => {
  const timer = React.useRef<number>();

  const t = useTranslation();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
    ...(error == true && {
      bgcolor: "error.main",
      "&:hover": {
        bgcolor: "error.dark",
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ m: 1, position: "relative" }}>
        <Fab
          aria-label="save"
          color="primary"
          sx={
            success
              ? {
                  bgcolor: green[500],
                  "&:hover": {
                    bgcolor: green[700],
                  },
                }
              : error
              ? {
                  bgcolor: "error.main",
                  "&:hover": {
                    bgcolor: "error.dark",
                  },
                }
              : undefined
          }
          onClick={handleClick}
        >
          {success ? <CheckIcon /> : error ? <WarnIcon /> : <UploadIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: success ? green[500] : error ? "error.main" : "primary",
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
      <Box sx={{ m: 1, position: "relative" }}>
        <Button
          variant="contained"
          sx={
            success
              ? {
                  bgcolor: green[500],
                  "&:hover": {
                    bgcolor: green[700],
                  },
                }
              : error
              ? {
                  bgcolor: "error.main",
                  "&:hover": {
                    bgcolor: "error.dark",
                  },
                }
              : undefined
          }
          disabled={loading}
          onClick={handleClick}
        >
          {success ? t("Upload successful") : t("Upload person image")}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default CircularIntegration;
