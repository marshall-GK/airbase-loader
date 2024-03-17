import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  skeletonContainer: {
  },
  skeletonStrip: {
    // border: "solid 1px grey",
    width: "100%",
    marginTop: "10px",
    background: `linear-gradient(to right, #f1f0f0, #c1c0c0, #f1f0f0)`,
    backgroundSize: "200%",
    animationName: "Skeleton-active",
    animation: "0.4s ease-out infinite linear",
  },
});

export default useStyles;
