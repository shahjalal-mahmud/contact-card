// src/components/ThemeSelector.jsx
import { useTheme } from "../context/ThemeContext";

const ThemeSelector = () => {
  const { theme, toggleTheme, font, toggleFont } = useTheme();

  const fontOptions = [
    "Inter",
    "Roboto",
    "Open Sans",
    "Montserrat",
    "Poppins",
    "Lato",
    "Nunito",
    "Raleway",
    "Ubuntu",
    "Merriweather"
  ];

  const themeOptions = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
    "caramellatte",
    "abyss",
    "silk"
  ];

  return (
    <div className="flex gap-2 items-center">
      {/* Font Selector */}
      <select
        className="select select-sm select-bordered"
        value={font}
        onChange={(e) => toggleFont(e.target.value)}
      >
        {fontOptions.map((fontOption) => (
          <option key={fontOption} value={fontOption}>
            {fontOption}
          </option>
        ))}
      </select>

      {/* Theme Selector */}
      <select
        className="select select-sm select-bordered"
        value={theme}
        onChange={(e) => toggleTheme(e.target.value)}
      >
        {themeOptions.map((themeOption) => (
          <option key={themeOption} value={themeOption}>
            {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;