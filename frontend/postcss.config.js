/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import withMT from "@material-tailwind/react/utils/withMT";
import tailwindConfig from "./src/css/tailwind.config.js";

export default {
  plugins: [tailwind(withMT(tailwindConfig)), autoprefixer]
};
