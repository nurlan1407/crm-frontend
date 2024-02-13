declare module '*.module.scss';

// declare module "@reduxjs/toolkit";

declare module '*.svg' {
  // eslint-disable-next-line no-undef
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

// declare const __IS_DEV__: boolean

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
