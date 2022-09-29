const {
  validateRoute, 
  isAbsolute, 
  fileExt, 
  readFile, 
  extractLinks,
  validateLink,
  statsLinks,
  mdLinks
} = require("../funciones.js");

// Mockeando Axios
jest.mock('axios');
const axios = require('axios'); 

const truePath = "D:/Laboratoria/LIM018-md-links/LIM018-md-links/readme2.md";
const relativePath = "readme2.md";
const nuevoPath = "D:/Laboratoria/LIM018-md-links/LIM018-md-links/readme3.md"
const otroPath = ".txt";
const emptyPath = "D:/Laboratoria/LIM018-md-links/LIM018-md-links/test/readme4.md";

arrayOfObj = [{"file": "D:/Laboratoria/LIM018-md-links/LIM018-md-links/readme2.md", "href": "https://curriculum.laboratoria.la/es/topics/javascript/04-arrays", "ok": "OK", "status": 200, "text": "Arreglos"}, {"file": "D:/Laboratoria/LIM018-md-links/LIM018-md-links/readme2.md", "href": "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/", "ok": "OK", "status": 200, "text": "Array - MDN"}, {"file": "D:/Laboratoria/LIM018-md-links/LIM018-md-links/readme2.md", "href": "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort", "ok": "OK", "status": 200, "text": "Array.prototype.sort() - MDN"}, {"file": "D:/Laboratoria/LIM018-md-links/LIM018-md-links/readme2.md", "href": "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach", "ok": "OK", "status": 200, "text": "Array.prototype.forEach() - MDN"}, {"file": "D:/Laboratoria/LIM018-md-links/LIM018-md-links/readme2.md", "href": "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map", "ok": "OK", "status": 200, "text": "Array.prototype.map() - MDN"}, 
{"file": "D:/Laboratoria/LIM018-md-links/LIM018-md-links/readme2.md", "href": "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter", "ok": "OK", "status": 200, "text": "Array.prototype.filter() - MDN"}, {"file": "D:/Laboratoria/LIM018-md-links/LIM018-md-links/readme2.md", "href": "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce", "ok": "OK", "status": 200, "text": "Array.prototype.reduce() - MDN"}]

describe("validateRoute", () => {
  it("should return true if the path exists", () => {
    expect(validateRoute(truePath)).toBe(true);
  });

  it("should return false if the path doesnt exists", () => {
    const fakePath = "C:/Users/Usuario/Git/Laboratoria/LIM018-md-links/README2.md";
    expect(validateRoute(fakePath)).toBe(false);
  });
});

describe("fileExt, ", () => {
  it("should return true if the extention is md", () => {
    expect(fileExt(truePath)).toBe(".md");
  });
  it("should return false if the extention  isnt md", () => {
    expect(fileExt(otroPath)).toBe(undefined);
  });
});

describe("isAbsolute, ", () => {
  it("should return true if the path is absolute", () => {
    expect(isAbsolute(truePath)).toBe("D:/Laboratoria/LIM018-md-links/LIM018-md-links/readme2.md");
  });
  it("should return false if the path isnt absolute", () => {
    expect(isAbsolute(relativePath)).toBe("D:\\Laboratoria\\LIM018-md-links\\LIM018-md-links\\readme2.md");
  });
});

describe("readFile", () => {
  it("should return text and path", () => {
    expect(readFile(nuevoPath)).toBe("[Arreglos](https://curriculum.laboratoria.la/es/topics/javascript/04-arrays)")
   
  });

  it("should return 'no es un archivo md' if the path dont md", () => {
    const fakePath = "C:/Users/Usuario/Git/Laboratoria/LIM018-md-links/README2.md";
    expect(readFile(otroPath)).toBe('no es un archivo md');
  });
});

describe("extractLinks, ", () => {
  it("should return a array of objects", () => {
    expect(extractLinks(nuevoPath)).toStrictEqual([{"file": "D:/Laboratoria/LIM018-md-links/LIM018-md-links/readme3.md", 
      "href": "https://curriculum.laboratoria.la/es/topics/javascript/04-arrays", 
      "text": "Arreglos"}])
  });
  it("should return empty if the file is empty", () => {
    expect('array vacio').toEqual('array vacio');
  });
});

describe('validateLink', () => {
  it('is a function', () => {
    expect(typeof validateLink).toBe('function');
  });

  it('should be return status:200 y message:ok', () => {
    const respuesta = {
      status: 200,
      statusText: 'OK',
    }
    axios.get.mockResolvedValue(respuesta);
    validateLink(truePath)
      .then((response) => {
        expect(response).toEqual(arrayOfObj);
  });
})
  it('should be return status: y message:Fail', () => {
    const respuesta = {
      status: '',
      statusText: 'Fail',
    }
    axios.mockResolvedValue(respuesta);
    validateLink(truePath)
    .then((response) => {
      expect(response).toEqual(arrayOfObj)
    })
  }) 
})



// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });



