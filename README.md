# custom-fields-cli

There are three types of custom fields:
Text
- unique: can force uniqueness in the environment, ex. only one user can have the nickname "Bob"
- regex: can follow a regex, ex. text must be an ethereum address: ^0x

Select
- provide a comma seperated list of options that a user can select in a dropdown

Checkbox
- provide the text that goes along with a checkbox
- currently this field is not editable after first login

use a node version with fetch, such as 18.x.x

swap these values in .ENV:
ENV_ID, BEARER_TOKEN

`npm install`

`npm start`
