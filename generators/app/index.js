'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'list',
        name: 'features',
        message: 'What more would you like?',
        choices: [
          {
            name: 'React',
            value: 'react',
            checked: true
          },
          {
            name: 'Vue',
            value: 'vue',
            checked: false
          },
          {
            name: 'TypeScript',
            value: 'typescript',
            checked: false
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    if (['react', 'vue'].indexOf(this.props.features) !== -1) {
      this.fs.copy(
        this.templatePath('.eslintignore'),
        this.destinationPath('.eslintignore')
      );
    }

    if (this.props.features === 'react') {
      this.fs.copy(
        this.templatePath('.eslintrc_react.json'),
        this.destinationPath('.eslintrc.json')
      );
    } else if (this.props.features === 'vue') {
      this.fs.copy(
        this.templatePath('.eslintrc_vue.json'),
        this.destinationPath('.eslintrc.json')
      );
    } else if (this.props.features === 'typescript') {
      this.fs.copy(
        this.templatePath('tslint.json'),
        this.destinationPath('tslint.json')
      );
    } else {
      this.fs.copy(
        this.templatePath('.eslintrc_react.json'),
        this.destinationPath('.eslintrc.json')
      );
    }
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
