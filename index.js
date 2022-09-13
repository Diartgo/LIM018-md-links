// module.exports = () => {
//   // ...
// };
const path = require('node:path');
const fs = require('fs');

const route = './README.md'
// const mdLinks = (ruta)=> {
// }
let pathAbsolute;
const routeValidator = (route) => {

  const rutaExiste=fs.existsSync(route);
  // devuelve un true o false
   if (rutaExiste==true){
  
    //ver si un link es absoluto 
    const tipoRuta=path.isAbsolute(route);

    //convertir una ruta relativa en absoluta
    if (tipoRuta == false){
      pathAbsolute = path.resolve(route);
   
    } else pathAbsolute=tipoRuta

    //como sacar la extension que tiene un archivo
    const pathMd = path.extname(pathAbsolute);

      if (pathMd =='.md'){
        return pathAbsolute
        
      }
   }
  
}

console.log(routeValidator(route));


// const leerArchivo = (rutaValidada) => {
//   fs.readFileSync(rutaValidada, 'utf-8');
//   console.log(leerArchivo)

// }



console.log(fs.readFileSync(routeValidator(route), 'utf-8'));