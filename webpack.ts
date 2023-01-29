import CopyPlugin from "copy-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { join } from "path";
import * as webpack from "webpack";

const rawMode = process.env.NODE_ENV;
if (rawMode !== "development" && rawMode !== "production") {
  throw new Error("NODE_ENV must be either 'development' or 'production'");
}
const mode: "development" | "production" = rawMode;

const srcDir = join(__dirname, "src");

const config: webpack.Configuration = {
  mode,
  entry: {
    background: join(srcDir, "background.ts"),
    content_script: join(srcDir, "content_script.ts"),
    app: join(srcDir, "app.tsx"),
  },
  output: {
    path: join(__dirname, "dist/js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "@linaria/webpack5-loader",
            options: {
              sourceMap: mode === "development",
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(s)?css$/,
        exclude: /\.module\.(s)?css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.module\.(s)?css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "@teamsupercell/typings-for-css-modules-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: {
                localIdentName: "[local]--[hash:base64:5]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new CopyPlugin({
      // the `to` option is relative to the webpack output path (dist/js)
      patterns: [{ from: ".", to: "../", context: "public" }],
      options: {},
    }),
    new ESLintPlugin({
      emitError: true,
      emitWarning: true,
      failOnError: true,
      extensions: ["ts", "tsx", "js", "jsx"],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ],
};

if (mode === "development") {
  config.devtool = "inline-source-map";
}
export default config;
