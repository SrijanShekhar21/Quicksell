import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

const Loading = ({
  size = 100,
  color = "#4fa94d",
  text = "Loading...",
  showLoader = true,
  textColor = "#4fa94d",
  textStyle = {},
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.backgroundAnimation}></div>
      {showLoader && (
        <PuffLoader size={size} color={color} cssOverride={styles.loader} />
      )}
      <span style={{ ...styles.text, color: textColor, ...textStyle }}>
        {text}
      </span>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
  },
  backgroundAnimation: {
    position: "absolute",
    width: "200%",
    height: "200%",
    background:
      "linear-gradient(135deg, #4fa94d 25%, #1a1a1a 50%, #4fa94d 75%)",
    animation: "rotateBackground 6s linear infinite",
    transformOrigin: "center",
    zIndex: 1,
    opacity: 0.05,
  },
  loader: {
    zIndex: 2,
    marginBottom: "20px",
  },
  text: {
    fontSize: "1.5em",
    fontWeight: "600",
    letterSpacing: "1.5px",
    zIndex: 2,
    opacity: 0.8,
    animation: "fadeIn 1.5s ease-in-out infinite",
  },
};

// Keyframe animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `
  @keyframes rotateBackground {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,
  styleSheet.cssRules.length
);

styleSheet.insertRule(
  `
  @keyframes fadeIn {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
`,
  styleSheet.cssRules.length
);

export default Loading;
