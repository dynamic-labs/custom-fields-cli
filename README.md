# Custom Fields

There are three types of custom fields:

### Text

- **Unique**: Can force uniqueness in the environment, e.g., only one user can have the nickname `Bob`.
- **Regex**: Can follow a regex, e.g., text must be an Ethereum address: `^0x`.

### Select

- Provide a comma-separated list of options that a user can select in a dropdown.

### Checkbox

- Provide the text that goes along with a checkbox.

# Setup Instructions

First, you must use a Dynamic SDK version of >= v2.1.0-alpha.24

1. Use a Node version with fetch, such as 18.x.x.
2. Swap these values in `.env`:

   - `ENV_ID` : https://app.dynamic.xyz/dashboard/developer/api => Environment ID
   - `BEARER_TOKEN`: https://app.dynamic.xyz/dashboard/developer/api => Create Token

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run:
   ```bash
   npm start
   ```

Example:
<img width="643" alt="Screenshot 2024-06-04 at 9 36 11 AM" src="https://github.com/dynamic-labs/custom-fields-cli/assets/100806611/a09bccd3-f3f6-4335-9ed9-8285bc8bf33b">
<img width="363" alt="Screenshot 2024-06-04 at 9 46 15 AM" src="https://github.com/dynamic-labs/custom-fields-cli/assets/100806611/2f3aaf72-ddef-4e69-a20e-8d19afb3e394">

