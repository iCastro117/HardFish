🔁 0. REQUISITOS PREVIOS (fuera del proyecto)

INSTALAR ESTO todos los pasos wn powershell:

https://github.com/coreybutler/nvm-windows/releases/download/1.2.2/nvm-setup.exe


Instala Node.js (usa v20 preferiblemente):
👉 https://nodejs.org/es

Verifica la Instalacion:
node -v
npm -v


O
Luego, abre una nueva ventana de PowerShell o CMD y ejecuta:
o con NVM:

nvm install 20
nvm use 20


🔨 1. INICIALIZAR TU PROYECTO
mkdir hardfish
cd hardfish
npm init -y


⚛️ 2. INSTALAR FRONTEND: Next.js + React + TypeScript
npm install next react react-dom
npm install -D typescript @types/react @types/react-dom
👉 Después de esto, corre:

npx tsc --init



🎨 3. TAILWIND CSS (opcional pero lo estás usando)

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss-cli@latest init -p
Y

Luego configura tailwind.config.js y globals.css como ya tienes en tu estructura.



🚀 4. INSTALAR BACKEND: Express + MongoDB + Mongoose + Types

npm install express mongoose cors body-parser
npm install -D @types/express @types/node


🧰 5. HERRAMIENTAS EXTRA (según lo que ya usas en tu proyecto)

npm install axios                # Para fetch con token
npm install jose                # Para JWT
npm install clsx tailwind-merge # Para utilidades de CSS
npm install @radix-ui/react-toast class-variance-authority lucide-react # Para UI feedback


🛠 6. FRONTEND + BACKEND en paralelo (opcional)

npm install --save-dev concurrently




Y en tu package.json, puedes poner en scripts:

Editar

  "scripts": {
        "dev": "concurrently \"next dev\" \"node backend/server.js\"",
  "start": "next start",
  "build": "next build",
  "lint": "next lint",
  "serve": "node app/backend/server.js"
  },



💻 7. LEVANTAR EL PROYECTO

npm install dotenv


npm install bcryptjs

npm install jsonwebtoken

npm install


npx next dev


node backend/server.js



🚀 8. Ejecutá este comando en tu terminal DE POWERSHELL COMO ADMINSITARDOR:

pwd

cd "C:\Users\ORDENADOR\3D Objects\hardfish"


npm install recharts react-day-picker embla-carousel-react react-hook-form sonner @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toggle-group @radix-ui/react-toggle @radix-ui/react-tooltip cmdk vaul input-otp


o separadas:
npm install recharts react-day-picker embla-carousel-react react-hook-form sonner `
@radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio `
@radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible `
@radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu `
@radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar `
@radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress `
@radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select `
@radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch `
@radix-ui/react-tabs @radix-ui/react-toggle-group @radix-ui/react-toggle `
@radix-ui/react-tooltip cmdk vaul input-otp



npm install next-themes

npm install react-resizable-panels

npm list react-day-picker

npm i react-day-picker

npm install react-day-picker@latest


🎨 9. Para proyectos de JavaScript/TypeScript:
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev

npx eslint . --ext .js,.jsx,.ts,.tsx



VER ERRORES:npx tsc --noEmit

INICIAR: 

npm run dev

Esto iniciará Next.js y Express.js juntos.