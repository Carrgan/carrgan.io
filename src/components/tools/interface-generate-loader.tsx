import React from "react";
import Skeleton from "@site/src/components/common/skeleton";
import { Grid } from "@mui/joy";

const InterfaceGenerateLoader = () => {
  return (
    <div style={{ height: "1050px", width: "100%" }}>
      <Grid container spacing={2} sx={{ flexGrow: 1 }} style={{ height: "100vh", padding: 20 }}>
        <Grid xs={6}>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid style={{ display: "flex" }}>
              <div style={{ height: "40px", width: "143px", paddingRight: "16px" }}>
                <Skeleton />
              </div>
              <div style={{ height: "40px", width: "318px", padding: "2px" }}>
                <Skeleton />
              </div>
            </Grid>
          </Grid>
          <div style={{ width: "100%", height: "925px", marginTop: "16px" }}>
            <Skeleton />
          </div>
        </Grid>
        <Grid xs={6}>
          <div style={{ width: "100%", height: "412px", marginBottom: "16px" }}>
            <Skeleton />
          </div>
          <div style={{ width: "100%", height: "566px", marginBottom: "16px" }}>
            <Skeleton />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default InterfaceGenerateLoader;
