import Skeleton from "@site/src/components/common/Skeleton";
import React from "react";
import FullScreenWrapper from "@site/src/components/common/FullScreenWrapper";

const SkeletonFullLoading = () => {
  return (
    <FullScreenWrapper>
      <Skeleton />
    </FullScreenWrapper>
  );
};

export default SkeletonFullLoading;
