import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type LocalCheckHeroProps = {
  heroImageSrc: string;
};

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const LocalCheckHero = ({ heroImageSrc }: LocalCheckHeroProps) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames - 1], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const copyOpacity = interpolate(frame, [32, 102], [1, 0], clamp);
  const copyY = interpolate(frame, [26, 106], [0, 68], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const chromeOpacity = interpolate(frame, [92, 152], [1, 0], clamp);
  const auraOpacity = interpolate(frame, [0, 126, 179], [0.38, 0.64, 0.58], clamp);
  const auraScale = interpolate(frame, [0, 179], [0.92, 1.14], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#050507", overflow: "hidden" }}>
      <Img
        src={heroImageSrc}
        style={{
          position: "absolute",
          inset: "-2%",
          width: "104%",
          height: "104%",
          objectFit: "cover",
          objectPosition: "52% 50%",
          filter: "saturate(1.075) contrast(1.045) brightness(1.025)",
          scale: 1.015 + progress * 0.145,
          translate: `${progress * -34}px ${progress * -52}px`,
          transformOrigin: "63% 50%",
        }}
      />

      <AbsoluteFill
        style={{
          opacity: 0.34 + progress * 0.2,
          background:
            "radial-gradient(circle at 63% 50%, rgba(255,90,22,.3) 0, rgba(255,90,22,.11) 8%, transparent 23%), conic-gradient(from 14deg at 63% 50%, transparent 0 7%, rgba(252,76,2,.06) 8% 10%, transparent 11% 31%, rgba(252,76,2,.055) 32% 34%, transparent 35% 61%, rgba(252,76,2,.05) 62% 65%, transparent 66% 100%)",
          mixBlendMode: "screen",
          filter: "blur(8px)",
          scale: 1.04,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "63%",
          top: "50%",
          width: 370,
          height: 370,
          opacity: auraOpacity,
          translate: "-50% -50%",
          scale: auraScale,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,91,23,.18) 0, rgba(252,76,2,.075) 28%, transparent 69%)",
            filter: "blur(14px)",
          }}
        />
        {[0.94, 0.68, 0.43].map((size, index) => (
          <div
            key={size}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: `${size * 100}%`,
              height: `${size * 100}%`,
              border: `1px solid rgba(255, ${107 + index * 16}, ${43 + index * 18}, ${0.22 + index * 0.06})`,
              borderRadius: "50%",
              boxShadow: "0 0 18px rgba(252,76,2,.08), inset 0 0 18px rgba(252,76,2,.045)",
              translate: "-50% -50%",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "20%",
            height: "20%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,180,130,.42) 0, rgba(255,103,34,.18) 38%, transparent 74%)",
            filter: "blur(2px)",
            translate: "-50% -50%",
          }}
        />
      </div>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(4,4,6,.58) 0%, rgba(4,4,6,.18) 40%, rgba(4,4,6,.025) 71%), linear-gradient(180deg, rgba(4,4,6,.35) 0%, transparent 25%, transparent 67%, rgba(4,4,6,.72) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 54,
          left: 72,
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: chromeOpacity,
          translate: `0 ${interpolate(frame, [92, 152], [0, -18], clamp)}px`,
          color: "#f2f2f6",
          fontFamily: "Arial Narrow, sans-serif",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: ".055em",
        }}
      >
        <span style={{ color: "#fc4c02", fontSize: 38 }}>⌗</span>
        LOCALCHECK
      </div>

      <div
        style={{
          position: "absolute",
          left: 82,
          top: 292,
          opacity: copyOpacity,
          translate: `0 ${copyY}px`,
          color: "#f2f2f6",
          fontFamily: "Inter, Arial, sans-serif",
          textTransform: "uppercase",
        }}
      >
        <div
          style={{
            marginBottom: 18,
            color: "#c9c9d1",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: ".18em",
          }}
        >
          SEVEN CITIES NOW MAPPED
        </div>
        <div
          style={{
            fontSize: 166,
            fontWeight: 850,
            letterSpacing: "-.07em",
            lineHeight: 0.74,
          }}
        >
          FIND<br />YOUR<br />RUN<span style={{ color: "#fc4c02" }}>.</span>
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 19,
            fontWeight: 600,
            letterSpacing: ".15em",
          }}
        >
          LIVE COURTS. REAL COMPETITION.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 74,
          bottom: 48,
          opacity: chromeOpacity,
          color: "rgba(242,242,246,.72)",
          fontFamily: "Inter, Arial, sans-serif",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: ".16em",
          textTransform: "uppercase",
        }}
      >
        LOCALCHECK · FIND YOUR RUN
      </div>
    </AbsoluteFill>
  );
};
