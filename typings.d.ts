declare module '*.css';
// declare module '*.less';
declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.less' {
  const content: { [className: string]: string };
  export default content;
}
