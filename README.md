# Custom Fields

There are three types of custom fields:

### Text

- **Unique**: Can force uniqueness in the environment, e.g., only one user can have the nickname `Bob`.
- **Regex**: Can follow a regex, e.g., text must be an Ethereum address: `^0x`.

### Select

- Provide a comma-separated list of options that a user can select in a dropdown.

### Checkbox

- Provide the text that goes along with a checkbox.
- Currently, this field is not editable after the first login.

# Setup Instructions

1. Use a Node version with fetch, such as 18.x.x.
2. Swap these values in `.ENV`:

   - `ENV_ID`
   - `BEARER_TOKEN`

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run:
   ```bash
   npm start
   ```

![Alt Text](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTN2azYyM2JkY3BpcDk4enB4bGV3aWs3Y2hoZGRvNDJ5NHEwb3VqZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hC9XfswIWS9tMzITYP/giphy.gif)
