import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";
import crypto from 'crypto';


export const generateSlug = () => {
  try {
    return (
      uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        separator: "-",
        style: "lowerCase",
        length: 2,
      }) +
      "-" +
      Math.floor(Math.random() * 9000 + 1000)
    );
  } catch (error) {
    console.log(error);
    return false;
    
  }
};
export function generateId() {
  return crypto.randomUUID();
}

