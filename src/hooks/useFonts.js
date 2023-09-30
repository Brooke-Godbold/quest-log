import { useEffect, useState } from 'react';
import { useGoogleFont } from '../query/google/useGoogleFont';

export function useFonts(fontFamily) {
  const [fontLoaded, setFontLoaded] = useState(false);

  const { fontData } = useGoogleFont(fontFamily);

  useEffect(() => {
    if (!fontData) return;

    const url = fontData.items[0].files.regular.replace('http', 'https');

    const fontFace = new FontFace(fontData.items[0].family, `url(${url})`);

    async function loadFontFace(fontFace) {
      const loadedFont = await fontFace.load();
      document.fonts.add(loadedFont);

      setFontLoaded(true);
    }

    loadFontFace(fontFace);
  }, [fontData]);

  return { fontLoaded };
}
