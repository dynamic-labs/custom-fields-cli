import * as readline from "readline";
import dotenv from "dotenv";

dotenv.config();

const ENV_ID = process.env.ENV_ID;
const BEARER_TOKEN = process.env.BEARER_TOKEN;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question: string): Promise<string> => {
  return new Promise((resolve) => rl.question(question, resolve));
};

const getFieldData = async () => {
  const name = await askQuestion("Enter field name: ");
  const enabled = true;
  const required =
    (await askQuestion("Is the field required? (y/n): ")) === "y";
  const fieldType = await askQuestion(
    "Enter field type (text/checkbox/select): "
  );

  const validationRules: any = {};

  if (fieldType === "checkbox") {
    validationRules.checkboxText = await askQuestion(
      "Enter the text that will be displayed for the checkbox field: "
    );
  } else if (fieldType === "select") {
    const options = await askQuestion(
      "Enter dropdown options for the select field, separated by commas: "
    );
    validationRules.validOptions = options
      .split(",")
      .map((option) => ({ label: option.trim() }));
  } else if (fieldType === "text") {
    const regex = await askQuestion(
      "Enter the regex pattern that the text field must match (leave empty if not applicable): "
    );
    const unique =
      (await askQuestion(
        "Should this field be unique for every user in the environment? (y/n): "
      )) === "y";
    if (regex) validationRules.regex = regex;
    if (unique) validationRules.unique = unique;
  } else {
    console.error("Invalid field type");
    rl.close();
    return;
  }

  const fieldData = {
    name,
    enabled,
    required,
    fieldType,
    validationRules:
      Object.keys(validationRules).length > 0 ? validationRules : undefined,
  };

  rl.close();
  return fieldData;
};

const postData = async (data: any) => {
  const url = `https://app.dynamic.xyz/api/v0/environments/${ENV_ID}/custom/fields`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    console.log("Field created successfully");
  } else {
    console.error("Error creating field:", response.statusText);
  }
};

interface Field {
  name: string;
  id: string;
  fieldType: string;
}

const getExistingFields = async (): Promise<Field[]> => {
  const url = `https://app.dynamic.xyz/api/v0/environments/${ENV_ID}/custom/fields`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  });

  if (response.ok) {
    const data: Field[] = (await response.json()) as Field[];
    return data;
  } else {
    console.error("Error fetching fields:", response.statusText);
    return [];
  }
};

const deleteFields = async (existingFields: string[]) => {
  const url = `https://app.dynamic.xyz/api/v0/custom/fields`;

  for (const fieldId of existingFields) {
    const response = await fetch(`${url}/${fieldId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });

    if (response.ok) {
      console.log("Field deleted successfully");
    } else {
      console.error("Error deleting field:", response.statusText);
    }
  }
};

const main = async () => {
  const existingFields = await getExistingFields();
  if (existingFields && existingFields.length > 0) {
    console.log("Existing fields:", JSON.stringify(existingFields, null, 2));

    const action = await askQuestion(
      "Do you want to delete all existing fields? Type 'n' if you only want to delete one (y/n): "
    );

    if (action.toLowerCase() === "y") {
      await deleteFields(existingFields.map((field) => field.id));
    } else {
      const fieldToDelete = await askQuestion(
        "Type the name of the field you would like to delete, or press Enter to skip: "
      );

      if (fieldToDelete) {
        const field = existingFields.find(
          (field) => field.name === fieldToDelete
        );
        if (field) {
          await deleteFields([field.id]);
        } else {
          console.error("Field not found");
        }
      }
    }
  }

  console.log("Create a new field!");
  const fieldData = await getFieldData();
  if (fieldData) {
    await postData(fieldData);
  }
};

main();
