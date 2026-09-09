import { Composition } from "remotion";
import { LocalCheckHero } from "./LocalCheckHero";

export const RemotionRoot = () => {
  return (
    <Composition
      id="LocalCheckHero"
      component={LocalCheckHero}
      durationInFrames={180}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        heroImageSrc: "https://localcheck-web.chatjess.chatgpt.site/hero-map.png",
      }}
    />
  );
};
