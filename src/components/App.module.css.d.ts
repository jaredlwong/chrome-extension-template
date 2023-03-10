declare namespace AppModuleCssNamespace {
  export interface IAppModuleCss {
    h1: string;
  }
}

declare const AppModuleCssModule: AppModuleCssNamespace.IAppModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AppModuleCssNamespace.IAppModuleCss;
};

export = AppModuleCssModule;
