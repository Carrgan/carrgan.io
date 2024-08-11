import Skeleton from "@site/src/components/common/skeleton";
import React from "react";
import FullScreenWrapper from "@site/src/components/common/full-screen-wrapper";

const SkeletonFullLoading = () => {
  return (
    <FullScreenWrapper>
      <Skeleton />
    </FullScreenWrapper>
  );
};

export default SkeletonFullLoading;
