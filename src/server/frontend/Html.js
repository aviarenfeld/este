// @flow
/* eslint-disable react/no-danger */
import React from 'react';

const GoogleAnalytics = ({ id }) => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', '${id}', 'auto'); ga('send', 'pageview');`,
    }}
  />
);

GoogleAnalytics.propTypes = {
  id: React.PropTypes.string.isRequired,
};

const polyfillFeatures = [
  'default', // https://polyfill.io/v2/docs/features/#default-sets
  'fetch',
  'performance.now',
  'Symbol',
  'Array.prototype.find',
  'Array.prototype.findIndex',
  'Array.prototype.includes',
];

const Polyfill = ({ path }) => (
  <script src={`${path}?features=${polyfillFeatures.join()}&unknown=polyfill&flags=gated`} />
);

Polyfill.propTypes = {
  path: React.PropTypes.string.isRequired,
};

type Props = {
  appCssFilename: string,
  bodyCss: string,
  bodyHtml: string,
  googleAnalyticsId: string,
  helmet: Object,
  isProduction: boolean,
};

const Html = (
  {
    appCssFilename,
    bodyCss,
    bodyHtml,
    googleAnalyticsId,
    helmet,
    isProduction,
  }: Props,
) => (
  <html {...helmet.htmlAttributes.toComponent()}>
    <head>
      {helmet.title.toComponent()}
      {helmet.base.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.link.toComponent()}
      <Polyfill path={`https://cdn.polyfill.io/v2/polyfill${isProduction ? '.min' : ''}.js`} />
      {helmet.script.toComponent()}
      {appCssFilename && <link href={appCssFilename} rel="stylesheet" />}
      {isProduction &&
        googleAnalyticsId !== 'UA-XXXXXXX-X' &&
        <GoogleAnalytics id={googleAnalyticsId} />}
      <style dangerouslySetInnerHTML={{ __html: bodyCss }} id="stylesheet" />
    </head>
    <body dangerouslySetInnerHTML={{ __html: bodyHtml }} />
  </html>
);

export default Html;
