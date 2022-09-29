// module.exports = () => {
//   // ...
// };
const path = require('node:path');
const fs = require('fs');
const axios = require('axios');
const { data } = require('browserslist');
const { darkmagenta } = require('color-name');
const ERROR_ROUTE_NOT_EXIST = 'La ruta no existe';
const route = './readme2.md'

// const mdLinks = (filePath, options) => {
//   const absolutePath = validateRoute(filePath);
//   if (absolutePath !== ERROR_ROUTE_NOT_EXIST) {
//     if (fs.statSync(pathAbsolute).isDirectory() === true){
//       //leer el directorio y sacar los archivos
      
//     }
//     else{ 

//     }
//   } else {
//     console.log(absolutePath) //TODO: cuando sea una promesa poner un reject
//   }

// }
let pathAbsolute = ''
// validamos si la ruta existe
const validateRoute = (route) => {
  return fs.existsSync(route) 
  }


// vemos si una ruta es absoluta
const isAbsolute = (route) => {
  if (path.isAbsolute(route) === false) {
      //convertir una ruta relativa en absoluta
      pathAbsolute = path.resolve(route);
      // console.log(pathAbsolute)
      return pathAbsolute;
  } else {
    return route
  }
}

// vemos que extension tiene el archivo
const fileExt = (route) => {
  const pathMd = path.extname(route);
  if (pathMd === '.md'){
    // console.log(pathMd)
    return pathMd
  } 
  else {
     ERROR_ROUTE_NOT_EXIST
  }
} 

//leemos el archivo 
const readFile = (route) => {
  if (path.extname(route)==='.md'){
    // console.log(fs.readFileSync(route, 'utf-8'))
    return fs.readFileSync(route, 'utf-8');
  } else{
    return 'no es un archivo md'
  }
}
  



// /**
//  * 
//  * @param {*} route 
//  */
// const readDirectory = (route) => {

// }

// validateRoute(route);
// isAbsolute(route);
// fileExt(route);
// readFile(route);



const extractLinks = (route) => {
  const paths = isAbsolute(route)
  const regExp = /\[(.+)\]\((https?:\/\/.+)\)/gi;
  // const fileMd = fileExt(paths);
  // console.log(fileMd)
  const fileLinks = readFile(paths).match(regExp);
    const newFilelinks = fileLinks.map((links) => {
    const textLink = /\[[^\s]+(.+?)\]/gi;
    const matchText = links.match(textLink)
    const httpsLink = /\((https?.+?)\)/gi;
    const matchHttp = links.match(httpsLink);
    const objLinks = {
      href: matchHttp[0].slice(1, -1),
      text: matchText[0].slice(1, -1),
      file: paths
    }
    return objLinks;
  });
  return newFilelinks;
}

// console.log(extractLinks(isAbsolute(route)));

const validateLink = (path) =>{
  const contentLink = extractLinks(path)
  const axiosObject = contentLink.map((obj)=>{
    return axios.get(obj.href)
    .then((result)=>{
        const resultObj={
          ...obj,
        status: result.status,
        ok: result.statusText
      };
       return resultObj
      
    })
    // .catch((error)=>{
    //   return 'error';
    // });
  })
  return Promise.all(axiosObject)
}
 
// validateLink(extractLinks(isAbsolute(route))).then((result)=>{
//   console.log(result)
// })

const statsLinks = (path) => {
  const arrObjLinks = validateLink(path)
  return arrObjLinks.then((objLink) => {
    const arrayLinks = objLink.map((link) => {
      return link.href;
    });
    const totalLinks = arrayLinks.length;
    const uniqueLinks = [];
    arrayLinks.forEach((link) => {
      if (!uniqueLinks.includes(link)) {
        uniqueLinks.push(link);
      }
    });
    return { totalLinks, uniqueLinks: uniqueLinks.length };
  });
};

const brokenLinks = (paths) => {
  const arrObjLinks = validateLink(paths);
  return arrObjLinks.then((objLink) => {
    return objLink.filter((link) => {
      return link.message === 'fail';
    }).length;
  });
};

// statsLinks(route).then((result)=>{
//   console.log(result)
// })

// extractLinks(D:\Laboratoria\LIM018-md-links\LIM018-md-links\test\readme4.md)



// const paths = 'D:\\Laboratoria\\LIM018-md-links\\readme2.md';
const mdLinks = (path, options= {validate:false, stats:false} ) => {
  return new Promise((resolve, reject) => {
    // let links = [];
    if (!validateRoute(path)) {
      reject(new Error('La ruta ingresada no existe, ingrese una ruta valida !!'));
    }
    const absolute = isAbsolute(path);
    if (!fileExt(absolute)) {
      reject(new Error('¡No hay archivos con extencion .md!'));
    }
    const arrayObjetos = extractLinks(path);
    // if (arrayObjetos === null) {
    //   reject(new Error('El archivo no contiene'));
    // }
      if (options.validate && !options.stats) {
        // links = validateLink(path);
        resolve(validateLink(path));
      
      } else if (options.stats && options.validate) {
        console.log('para ver los links')
        // const stats = statsLinks(validateLink(arrayObjetos));
        resolve(statsLinks(path));
        
      } else {
      resolve(extractLinks(path));    
    }
  })
  ;

};

// mdLinks('D:/Laboratoria/LIM018-md-links/LIM018-md-links/readme2.md',{validate:true}).then((result)=>{
//     console.log(result, 'holiii')
//   })

module.exports = { 
  validateRoute, 
  isAbsolute, 
  fileExt, 
  readFile, 
  extractLinks,
  validateLink,
  statsLinks,
  mdLinks,
  brokenLinks
};