import { InputData, jsonInputForTargetLanguage, quicktype } from "quicktype-core";
import { CSharpTargetLanguage } from "quicktype-core/dist/language/CSharp";

export const quicktypeJSON = async (
  targetLanguage,
  typeName,
  jsonString,
  options?: { [name: string]: string | boolean }
) => {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

  // We could add multiple samples for the same desired
  // type, or many sources for other types. Here we're
  // just making one type from one piece of sample JSON.
  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString]
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  const cSharpTargetLanguage = new CSharpTargetLanguage();

  return await quicktype({
    inputData,
    rendererOptions: options,
    lang: targetLanguage
  });
};
