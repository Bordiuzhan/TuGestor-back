const { path } = require("../app");
const fs=require("fs/promises")
const hbs=require("handlebars")

 const compile = async function (templateName, data) {
    const filePath = path.join(process.cwd(), 'templates', `${templateName}.hbs`);
    const html = fs.readFileSync(filePath, 'utf8');
    return hbs.compile(html)(data);
  };

  module.exports={compile,}