export const theme = {
  // Palette principale avec dégradés verts + complémentaires
  gradients: {
    primary: "linear-gradient(135deg, #00f5a0 0%, #00d9ff 100%)",
    secondary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    accent: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    success: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    dark: "linear-gradient(135deg, #0c4a6e 0%, #1e293b 100%)",
    glass:
      "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)",
    card: "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)",
  },

  // Couleurs solides pour textes et borders
  colors: {
    primary: "#00f5a0",
    secondary: "#00d9ff",
    accent: "#667eea",
    dark: "#0f172a",
    light: "#f8fafc",
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
      light: "#94a3b8",
    },
    border: "rgba(255,255,255,0.2)",
    shadow: "rgba(0, 245, 160, 0.25)",
  },

  // Espacements et tailles
  spacing: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },

  // Border radius organiques
  borderRadius: {
    sm: "12px",
    md: "20px",
    lg: "28px",
    xl: "40px",
    round: "50%",
    organic: "20px 40px 30px 15px",
  },

  // Ombres modernes
  shadows: {
    sm: "0 4px 20px rgba(0, 245, 160, 0.1)",
    md: "0 8px 40px rgba(0, 245, 160, 0.15)",
    lg: "0 20px 60px rgba(0, 245, 160, 0.2)",
    glow: "0 0 40px rgba(0, 245, 160, 0.3)",
    inset: "inset 0 2px 4px rgba(0,0,0,0.1)",
  },

  // Typography
  fonts: {
    heading: '"Poppins", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
  },
};
