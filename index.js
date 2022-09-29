const func = require('./funciones.js');

// // const paths = 'D:\\Laboratoria\\LIM018-md-links\\readme2.md';
// const mdLinks = (path, options) => {
//   return new Promise((resolve, reject) => {
//     let links = [];
//     if (!func.validateRoute(path)) {
//       reject(new Error('La ruta ingresada no existe, ingrese una ruta valida !!'));
//     }
//     const absolute = func.isAbsolute(path);
//     if (!func.fileExt(absolute)) {
//       reject(new Error('¡No hay archivos con extencion .md!'));
//     }
//     const arrayObjetos = func.extractLinks(absolute);
//     // if (arrayObjetos === null) {
//     //   reject(new Error('El archivo no contiene'));
//     // }
//     if (!options.validate) {
//       links = arrayObjetos;
//       resolve(links);
//     }else {
//     links = func.validateLinks(arrayObjetos);
//     resolve(links);
//     }
//   });
// };
// mdLinks(  { validate: true })
//   .then((result) => {
//     console.log(result);
//   });

module.exports = mdLinks;
