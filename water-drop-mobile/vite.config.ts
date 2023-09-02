import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   host: "0.0.0.0", // 打开通过IP地址访问的开关
  //   port: 3334,
  //   open: true, // 自动打开浏览器
  //   cors: true, // 打开跨域
  //   // proxy: {
  //   //   "/graphql": "http://localhost:3000",
  //   // },
  // },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve("./src"),
      },
    ],
  },
})
