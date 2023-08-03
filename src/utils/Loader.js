import { createRef } from "react";
import { useSelector } from "react-redux";

//Loader
import { BounceLoader } from "react-spinners";

// MUI
import Dialog from "@material-ui/core/Dialog";

const LoaderDialogue = () => {
  const ref = createRef();
  const { isLoading } = useSelector((state) => state.isLoading);

  return (
    <>
      <Dialog
        open={isLoading}
        disableBackdropClick
        disableEscapeKeyDown
        PaperComponent="div"
        ref={ref}
        style={{
          // background: "#9a3757",
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <BounceLoader size={60} color="#fd6283" loading={isLoading} />
      </Dialog>
    </>
  );
};

export default LoaderDialogue;
