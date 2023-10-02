import { createGlobalStyle, css } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  /* Brand */
  --color-brand-50: #fdfbf7;
  --color-brand-100: #f7edde;
  --color-brand-200: #f2e4cd;
  --color-brand-300: #eedbbd;
  --color-brand-400: #ead2ac;
  --color-brand-500: #bba88a;
  --color-brand-600: #8c7e67;
  --color-brand-700: #5e5445;
  --color-brand-800: #171511;

  --color-brand-700-transparent: rgba(94, 84, 69, 0.6);

  /* Brown */
  --color-brown-500: #502419;
  --color-brown-600: #401d14;
  --color-brown-700: #30160f;
  --color-brown-800: #200e0a;
  --color-brown-850: #100705;
  --color-brown-900: #080402;

  /* Blue */
  --color-blue-300: #2B50AA;
  --color-blue-600: #132a64;

  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #ffdfdf;
  --color-red-400: rgb(255, 84, 84, 0.7);
  --color-red-600: #db2727;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --color-green-300: #69db7c;
  --color-green-500: #2b8a3e

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --border-radius-sm: 3px;
  --border-radius-md: 5px;
  --border-radius-lg: 7px;

  /* For dark mode */
  --image-grayscale: 0;
  --image-opacity: 100%;

  --brand-image-url: "https://xhkwznfhytvgvorvkcdp.supabase.co/storage/v1/object/public/brand/logo.png"
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

*::selection {
  background: var(--color-red-400);
  color: var(--color-red-100);
}

html {
  font-size: 62.5%;
  height: 100%;
}

body {
  font-family: "Overlock", sans-serif;
  color: var(--color-brand-700);
  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
  height: 100%;

  &::-webkit-scrollbar {
    width: 18px; /* width of the entire scrollbar */
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-brand-600); /* color of the scroll thumb */
    border: 3px solid var(--color-brand-600); /* creates padding around scroll thumb */
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-brand-400); /* color of the scroll thumb */
    border: 3px solid var(--color-brand-400); /* creates padding around scroll thumb */
  }

  scrollbar-color: var(--color-brand-600) transparent;
  scroll-padding: 3px;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

a {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
}

div,
p {
  cursor: default;
}

select {
  cursor: pointer;
}
`;

const CommonInput = css`
  border-radius: var(--border-radius-sm);
  border: none;
  background-color: var(--color-brand-50);
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  color: var(--color-brand-600);

  &::placeholder {
    color: var(--color-brand-400);
  }
`;

const CommonButton = css`
  padding: 1rem 2rem;
  font-size: 2rem;
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border-radius: 5px;
  background-color: ${(props) =>
    props.$light ? 'var(--color-brand-200)' : 'var(--color-brand-700)'};
  color: ${(props) => (props.$light ? '#333' : '#ddd')};
  border: 4px solid transparent;
  transition: all 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    background-color: ${(props) =>
      props.$light ? 'var(--color-brand-400)' : 'var(--color-brand-800)'};
  }

  &:focus,
  &:active {
    outline: none;
    border: 4px solid
      ${(props) =>
        props.$light ? 'rgb(17, 17, 17, 0.4)' : 'rgb(119, 119, 119, 0.4)'};
  }

  @media (max-width: 120em) {
    font-size: 1.6rem;
  }

  @media (max-width: 30em) {
    padding: 0.6rem 1.2rem;
  }
`;

const CommonScrollBar = css`
  &::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-brand-600); /* color of the scroll thumb */
    border: 3px solid var(--color-brand-600); /* creates padding around scroll thumb */
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-brand-400); /* color of the scroll thumb */
    border: 3px solid var(--color-brand-400); /* creates padding around scroll thumb */
  }

  scrollbar-width: thin;

  scrollbar-color: var(--color-brand-600) transparent;
  scroll-padding: 3px;
`;

const CommonPage = css`
  margin: 0 auto;
  height: 100%;
  max-width: 50%;
  padding: 5rem;
  background-color: var(--color-brand-200);

  @media (max-width: 150em) {
    max-width: 75%;
  }

  @media (max-width: 100em) {
    max-width: 100%;
  }

  @media (max-width: 40em) {
    padding: 10rem 1.2rem;
  }
`;

const CommonItem = css`
  background-color: var(--color-brand-500);
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  padding: 2.4rem;
  position: relative;

  transition: all 0.3s;

  &:hover {
    background-color: var(--color-brand-400);
  }

  @media (max-width: 20em) {
    padding: 1.2rem;
  }
`;

const CommonCloseButton = css`
  border: none;
  border-radius: 5px;
  background: none;

  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-brand-500);
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.15);

  flex-shrink: 0;
  width: 3.6rem;
  height: 3.6rem;

  transition: all 0.3s;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-brand-600);

    transition: all 0.3s;
  }

  &:hover {
    background-color: var(--color-brand-400);

    & svg {
      color: var(--color-brand-500);
    }
  }
`;

const CommonTextArea = css`
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border: none;
  border-radius: 3px;
  background-color: var(--color-brand-50);
  color: var(--color-brand-600);
  width: 100%;
  padding: 1.6rem;
`;

export default GlobalStyles;

export {
  CommonButton,
  CommonInput,
  CommonScrollBar,
  CommonPage,
  CommonItem,
  CommonCloseButton,
  CommonTextArea,
};
