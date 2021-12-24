import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import Scene from "@site/src/components/Bit-Dj/scene";
import Style from "./index.module.css";
import clsx from "clsx";
import Loader from "@site/src/components/Bit-Dj/loader";

const BitDj = () => {
  return (
    <div>
      <Canvas>
        <Suspense fallback={<Loader />}>
          <fog attach="fog" args={["#272730", 16, 30]} />
          <ambientLight intensity={0.25} />
          <PerspectiveCamera
            key={undefined}
            attach={undefined}
            attachArray={undefined}
            attachObject={undefined}
            args={undefined}
            onUpdate={undefined}
            visible={undefined}
            type={undefined}
            id={undefined}
            uuid={undefined}
            name={undefined}
            parent={undefined}
            modelViewMatrix={undefined}
            normalMatrix={undefined}
            matrixWorld={undefined}
            matrixAutoUpdate={undefined}
            matrixWorldNeedsUpdate={undefined}
            castShadow={undefined}
            receiveShadow={undefined}
            frustumCulled={undefined}
            renderOrder={undefined}
            animations={undefined}
            userData={undefined}
            customDepthMaterial={undefined}
            customDistanceMaterial={undefined}
            isObject3D={undefined}
            onBeforeRender={undefined}
            onAfterRender={undefined}
            applyMatrix4={undefined}
            applyQuaternion={undefined}
            setRotationFromAxisAngle={undefined}
            setRotationFromEuler={undefined}
            setRotationFromMatrix={undefined}
            setRotationFromQuaternion={undefined}
            rotateOnAxis={undefined}
            rotateOnWorldAxis={undefined}
            rotateX={undefined}
            rotateY={undefined}
            rotateZ={undefined}
            translateOnAxis={undefined}
            translateX={undefined}
            translateY={undefined}
            translateZ={undefined}
            localToWorld={undefined}
            worldToLocal={undefined}
            lookAt={undefined}
            add={undefined}
            remove={undefined}
            clear={undefined}
            getObjectById={undefined}
            getObjectByName={undefined}
            getObjectByProperty={undefined}
            getWorldPosition={undefined}
            getWorldQuaternion={undefined}
            getWorldScale={undefined}
            getWorldDirection={undefined}
            raycast={undefined}
            traverse={undefined}
            traverseVisible={undefined}
            traverseAncestors={undefined}
            updateMatrix={undefined}
            updateMatrixWorld={undefined}
            updateWorldMatrix={undefined}
            toJSON={undefined}
            clone={undefined}
            copy={undefined}
            addEventListener={undefined}
            hasEventListener={undefined}
            removeEventListener={undefined}
            dispatchEvent={undefined}
            zoom={undefined}
            view={undefined}
            focus={undefined}
            near={undefined}
            far={undefined}
            updateProjectionMatrix={undefined}
            setViewOffset={undefined}
            clearViewOffset={undefined}
            matrixWorldInverse={undefined}
            projectionMatrix={undefined}
            projectionMatrixInverse={undefined}
            isCamera={undefined}
            isPerspectiveCamera={undefined}
            fov={undefined}
            aspect={undefined}
            filmGauge={undefined}
            filmOffset={undefined}
            setFocalLength={undefined}
            getFocalLength={undefined}
            getEffectiveFOV={undefined}
            getFilmWidth={undefined}
            getFilmHeight={undefined}
            setLens={undefined}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
