import mainLogo from "../assets/images/logo-upscaled.png";
import texture_1 from "/src/assets/images/texture_1.webp";

const link1 = document.createElement("link");
link1.rel = "preload";
link1.as = "image";
link1.href = mainLogo;
document.head.appendChild(link2);

const link2 = document.createElement("link");
link2.rel = "preload";
link2.as = "image";
link2.href = texture_1;
document.head.appendChild(link2);
