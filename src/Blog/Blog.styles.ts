import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  blogPostContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
    padding: '10px',
    // alignItems: 'center',
    textAlign: 'justify'
  }
});

export default useStyles;
