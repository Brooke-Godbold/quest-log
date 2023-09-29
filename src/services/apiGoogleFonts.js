import axios from 'axios';

const googleFontsKey = import.meta.env.VITE_GOOGLE_FONTS_KEY;

export async function getFonts() {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${googleFontsKey}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}

export async function getFont(fontFamily) {
  if (!fontFamily) return null;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${googleFontsKey}&family=${fontFamily}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}
