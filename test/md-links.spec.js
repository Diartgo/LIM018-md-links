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

const truePath = "D:/Laboratoria/LIM018-md-links/LIM018-md-links/readme2.md";
const relativePath = "readme2.md";
const nuevoPath = "D:/Laboratoria/LIM018-md-links/LIM018-md-links/readme3.md"
const otroPath = ".txt";
const emptyPath = "D:/Laboratoria/LIM018-md-links/LIM018-md-links/test/readme4.md"

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




describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});



