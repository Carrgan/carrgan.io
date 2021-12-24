/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import useBaseUrl from "@docusaurus/useBaseUrl";

const Scene = props => {
  const group = useRef();
  const { nodes, materials } = useGLTF(useBaseUrl("/Bit-Dj-model/8-bit-dj.glb")) as any;
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[2.9, 1.5, 3.6]} rotation={[-Math.PI / 2, -0.1, 0]} scale={[69, 69, 69]}>
        <mesh
          geometry={nodes.Cube001_Material003_0.geometry}
          material={nodes.Cube001_Material003_0.material}
        />
        <mesh
          geometry={nodes.Cube001_Material003_0001.geometry}
          material={nodes.Cube001_Material003_0001.material}
        />
      </group>
      <group position={[2.9, 1.5, 3.6]} rotation={[-Math.PI / 2, -0.1, 0]} scale={[69, 69, 69]}>
        <mesh
          geometry={nodes.Cube018_Gameboy_bc002_0.geometry}
          material={materials["Gameboy_bc.002"]}
        />
        <mesh
          geometry={nodes.Cube018_Gameboy_bc003_0.geometry}
          material={materials["Gameboy_bc.003"]}
        />
        <mesh
          geometry={nodes.Cube018_Gameboy_bevelc001_0.geometry}
          material={materials["Gameboy_bevelc.001"]}
        />
        <mesh
          geometry={nodes.Cube018_Gameboy_dc002_0.geometry}
          material={materials["Gameboy_dc.002"]}
        />
        <mesh
          geometry={nodes.Cube018_Gameboy_dc003_0.geometry}
          material={materials["Gameboy_dc.003"]}
        />
        <mesh
          geometry={nodes.Cube018_Marshall_bc002_0.geometry}
          material={materials["Marshall_bc.002"]}
        />
        <mesh
          geometry={nodes.Cube018_Marshall_bc003_0.geometry}
          material={materials["Marshall_bc.003"]}
        />
        <mesh
          geometry={nodes.Cube018_Marshall_dc001_0.geometry}
          material={materials["Marshall_dc.001"]}
        />
        <mesh
          geometry={nodes.Cube018_Marshall_dc2002_0.geometry}
          material={materials["Marshall_dc2.002"]}
        />
        <mesh
          geometry={nodes.Cube018_Marshall_dc2003_0.geometry}
          material={materials["Marshall_dc2.003"]}
        />
        <mesh
          geometry={nodes.Cube018_Material_Marshall001_0.geometry}
          material={materials["Material_Marshall.001"]}
        />
        <mesh
          geometry={nodes.Cube018_Material002_0.geometry}
          material={materials["Material.002"]}
        />
        <mesh geometry={nodes.Cube018_Metal001_0.geometry} material={materials["Metal.001"]} />
        <mesh geometry={nodes.Cube018_MS_bc002_0.geometry} material={materials["MS_bc.002"]} />
        <mesh geometry={nodes.Cube018_MS_bc003_0.geometry} material={materials["MS_bc.003"]} />
        <mesh geometry={nodes.Cube018_MS_bc2001_0.geometry} material={materials["MS_bc2.001"]} />
        <mesh geometry={nodes.Cube018_P001_0.geometry} material={materials["P.001"]} />
        <mesh geometry={nodes.Cube018_Red001_0.geometry} material={materials["Red.001"]} />
        <mesh geometry={nodes.Cube018_8bit001_0.geometry} material={materials["8bit.001"]} />
      </group>
    </group>
  );
};

useGLTF.preload(useBaseUrl("/Bit-Dj-model/8-bit-dj.glb"));

export default Scene;
