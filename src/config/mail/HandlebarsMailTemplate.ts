import fs  from "fs";
import Handlebars from "handlebars";

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMail {
  file: string, 
  variable: ITemplateVariable;
}

export default class HandlebarsMailTemplate {
  public async paser({ file, variable }: IParseMail): Promise<string> {
    const templateFileContente = await fs.promises.readFile(file, { encoding: 'utf-8'}); 
    
    const parseTemplate = Handlebars.compile(file);

    return parseTemplate(variable);
  }
} 
