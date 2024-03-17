import React from 'react';
import useStyles from './Skeleton.styles';

interface PropType {
  config: {
    count: number; 
    height?: string | number;
    width?: string | number;
  };
}

const Skeleton: React.FC<PropType> = (props) => {
  const { config } = props;
  const classes = useStyles();
  const {count, height = '30px', width = '100%' } = config;
  const skeletonArr = new Array(count).fill(1); 
  const lastChildWidth = '60%';

  const getChildWidth = (index: number) => {
    const childLength = count;
    if (childLength > 1 && index === childLength - 1) {
      return lastChildWidth;
    } 
    return width;
  }


  return <div className={classes.skeletonContainer}>
    {skeletonArr.map((item, index) => {
      const childWidth = getChildWidth(index);
      return <div className={classes.skeletonStrip} style={{height, width: childWidth}} key={`${index}`}></div>
    })}
  </div>
};

export default Skeleton;