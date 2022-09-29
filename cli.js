#!/usr/bin/env node
const { mdLinks, statsLinks, brokenLinks} = require('./funciones.js');
const chalk = require('chalk');

// console.log(chalk.blue('hello world!'))

const process = require('node:process');
const { linkSync } = require('node:fs');
const path = require('node:path');
const pathsNew = process.argv[2];
const config = process.argv;

//argv[0] es la ruta del node 
//argv[1] es la ruta del codigo de secuencia de comandos, md-links
const isValidate = config.includes('--validate');
// console.log(hasValidate)
const isStats = config.includes('--stats');


     if (!isValidate && !isStats){
        mdLinks(pathsNew, {validate:isValidate})
            .then((links) => {
                links.forEach(link =>
                console.log(`
                 ◕ ‿‿ ◕    Links Encontrados    ◕ ‿‿ ◕ 
                   HREF : ${chalk.orange(link.href)};
                   TEXT : ${chalk.magenta(link.text)};
                   FILE : ${chalk.green(link.file)};
                ++++----++++----++++----++++----++++----++++`
                ))  
            }).catch((error) => {
                if (error.message === 'no existe la ruta') {
                    console.log(chalk.green(`La ruta no existe`))
                }})
    
        } else if (isValidate && !isStats){
            mdLinks(pathsNew, {validate:isValidate})
            .then((result) => {
                result.forEach(link =>
                console.log(`
                ◕ ‿‿ ◕          Links Encontrados y validados           ◕ ‿‿ ◕ 

                    HREF    : ${chalk.yellowBright(link.href)};
                    TEXT    : ${chalk.green(link.text)};
                    FILE    : ${chalk.red(link.file)};
                    STATUS  : ${chalk.magenta(link.status)};
                    MESSAGE : ${chalk.blue(link.ok)};
                
                ++++----++++----++++----++++----++++----++++----++++----++++----++++
                `
              ))
            })
            .catch((error) => {
                console.log(chalk.red(error));
              }) 

        } else if (isStats && !isValidate){
            statsLinks(pathsNew)
            .then((link) => {
              console.log( ` 
              ◕ ‿‿ ◕         Stats       ◕ ‿‿ ◕  
             +++++++++++++++++++++++++++++++++++++++++

                TOTAL LINKS  : ${chalk.blueBright(link.totalLinks)};
                UNIQUE LINKS : ${chalk.greenBright(link.uniqueLinks)};

            ++++----++++----++++----++++----++++----++++
            `
            )
            })
            .catch((error) => {
            console.log(chalk.red(error));
            })

        } else if (isStats && isValidate || isValidate && isStats){
            statsLinks(pathsNew)
            .then((result) => {
              console.log( ` 
              ◕ ‿‿ ◕             Stats  y Validate           ◕ ‿‿ ◕  
              +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
              
                          TOTAL LINKS  : ${chalk.greenBright(result.totalLinks)};
                          UNIQUE LINKS : ${chalk.blueBright(result.uniqueLinks)}; 
             ++++----++++----++++----++++----++++----++++----++++----++++
            `
              )
            });
            brokenLinks(pathsNew)
            .then((result)=>{
                console.log( ` 
                           BROKEN LINKS : ${chalk.blueBright(result)};   
            ++++----++++----++++----++++----++++----++++----++++----++++`
                )
            })
            .catch((error) => {
              console.log(chalk.red(error));
            })  
        
        }
    

