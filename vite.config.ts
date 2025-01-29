import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(),tailwindcss()],
    base: '/EfoutsCode/',
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})

//import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'
//
//// https://vite.dev/config/
//export default defineConfig({
//  plugins: [react()],
//  base: '/EfoutsCode/',
//})
