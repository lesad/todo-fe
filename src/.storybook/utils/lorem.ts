import { LoremIpsum } from "lorem-ipsum";

export const lorem = new LoremIpsum({});

/**
 * Long text with several paragraphs.
 */
export const loremText = lorem.generateParagraphs(15);

/**
 * Short random lorem ipsum text (3 words)
 */
export const loremShorText: string = lorem.generateWords(3);
