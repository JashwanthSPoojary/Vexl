import {existsSync, readdirSync, readFileSync} from "fs";
import {join} from "path";
import dotenv from "dotenv";

dotenv.config();

class Config {
    private secrets:Record<string,string> = {}
    constructor(){
        this.loadSecrets();
    }
    private loadSecrets(){
        const secret_path = '/run/secrets';
        if(existsSync(secret_path)){
            readdirSync(secret_path).forEach((file)=>{
                this.secrets[file] = readFileSync(join(secret_path,file),'utf-8').trim();
            })
        }
    }
    get(key:string):string{
        return this.secrets[key] || process.env[key] || '';
    }
}

export const config = new Config();