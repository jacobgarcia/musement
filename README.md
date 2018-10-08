**Welcome to Musement!**

Musement is a platform for people who want to share their ideas and projects, creating the moment.

### Getting started

##### System requirements

macOS, Ubuntu Linux

| Module   | Version  |
| -------- | -------- |
| NodeJS   | v4.4.4   |
| MongoDB  | v3.2.10  |
| NPM      | v2.15.9  |
| SendGrid | v4.7.1   |

**Install dependencies**

```bash
npm install
```

### Building Musement

Musement currently uses Angular as the main frontend framework, Webpack as compiler and module manager, Gulp in CSS and HTML minification and more.

Compile files in the project
```bash
gulp build
```

Test the project
```bash
gulp test
```

Run the project
```bash
npm start
```

### Setting SendGrid

Musement uses SendGrid as its mailing service. The current web API we are using it is v3. Please consider this for API consulting.

Run these on terminal for API Key designation
```bash
echo "export SENDGRID_API_KEY='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'" > sendgrid.env
echo "sendgrid.env" >> .gitignore
source ./sendgrid.env
```
