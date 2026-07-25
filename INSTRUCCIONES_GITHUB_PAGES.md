# Procedimiento para subir la Landing Page de Karla Godoy a GitHub Pages

¡Hola! Hemos generalizado y exportado toda la landing page con todos sus componentes visuales, textos de lujo, calculadoras de calorías/macros interactivas y formularios de contacto directo en una carpeta estática autogestionada llamada `docs/`.

Al estar todo organizado en `docs/index.html`, `docs/data.js` y `docs/app.js`, la web funciona perfectamente tanto al hacer doble clic en local (sin problemas de CORS ni necesidad de un servidor web local) como al subirla a **GitHub Pages** de forma gratuita en 2 minutos.

A continuación tienes las instrucciones paso a paso para publicarla.

---

## Opción 1: Usando GitHub Desktop o la Web directamente (Sin consola)

Si prefieres no usar la consola de comandos, puedes subir los archivos usando la interfaz web de GitHub:

1. Ve a tu cuenta de [GitHub](https://github.com/) y crea un nuevo repositorio público (por ejemplo, `karlagodoy-web`).
2. Haz clic en **"uploading an existing file"** (subir archivos existentes).
3. Selecciona y arrastra únicamente los tres archivos que están dentro de la carpeta `docs` de tu computadora:
   - `index.html`
   - `data.js`
   - `app.js`
   *(¡Asegúrate de subirlos en la raíz del repositorio, no dentro de una carpeta `docs` si vas a usar esta opción!)*
4. Escribe un mensaje de commit (ej. `Subir archivos de la web`) y presiona **"Commit changes"**.
5. Ve a la pestaña **Settings** (Configuración) en tu repositorio.
6. En el menú de la izquierda, selecciona **Pages** (GitHub Pages).
7. En la sección **Build and deployment**, asegúrate de que esté seleccionado **Deploy from a branch**.
8. En **Branch** (Rama), selecciona `main` o `master` y la carpeta `/ (root)`.
9. Presiona **Save** (Guardar).
10. ¡Listo! En un minuto, GitHub te dará tu dirección pública (por ejemplo: `https://tuusuario.github.io/karlagodoy-web/`).

---

## Opción 2: Si ya tienes instalado Git en tu máquina

Si te desenvuelves bien con Git en consola, ejecuta los siguientes comandos en tu terminal en la raíz de tu proyecto:

```bash
# 1. Inicializar git si no está inicializado
git init

# 2. Agregar tu repositorio remoto de GitHub
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# 3. Crear y cambiar a la rama principal main
git branch -M main

# 4. Agregar sólo los archivos de producción estáticos de la carpeta docs
# Puedes renombrar o mover la carpeta o subir el proyecto con docs/
git add docs/

# 5. Guardar los cambios
git commit -m "feat: landing page estática para Karla Godoy"

# 6. Empujar a GitHub
git push -u origin main
```

### Configuración del repositorio en GitHub:
1. Entra a tu repositorio en GitHub y ve a **Settings** -> **Pages**.
2. En la opción **Source / Branch**, selecciona la rama `main` y en la opción de subcarpeta selecciona **/docs** en vez de `/` (root).
3. Presiona **Save**.
4. GitHub Pages leerá directamente la carpeta `docs/` y publicará la web al instante en `https://tu-usuario.github.io/tu-repositorio/`.

---

## ¿Deseas hacer cambios de textos o precios en el futuro?
Cualquier cambio de texto, testimonios nuevos, precios de e-books, beneficios de programas o colores que quieras ajustar, solo tienes que editar el archivo [docs/data.js](docs/data.js) sin tocar nada de código HTML o JS de lógica de la aplicación. ¡Es súper amigable y limpio!
