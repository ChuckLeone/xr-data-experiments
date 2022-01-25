import React from "react";
import reactDom from "react-dom";
import * as THREE from "three";
import { VRButton } from "three/examples/jsm/webxr/VRButton";

const Button = () => {
  //THREE.renderer.xr.enabled = true;
  const Button = new VRButton();
  return reactDom.render(
    <Button />,
    document.body.appendChild(VRButton.createButton(THREE.renderer))
  );
};

export default Button;
