export default {
  rules: {
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'test', 'build', 'docs', 'perf', 'chore'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
  },
  prompt: {
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          feat: {
            description: 'Add a new feature',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'Fix a bug',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          test: {
            description: 'Changes related to testing',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description:
              'Alterations affecting the build system or external dependencies',
            title: 'Builds',
            emoji: '🛠',
          },
          docs: {
            description: 'Documentation changes',
            title: 'Documentation',
            emoji: '📚',
          },
          perf: {
            description: 'Code changes to improve performance',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          chore: {
            description: 'Routine tasks or maintenance work on the codebase',
            title: 'General changes',
            emoji: '🔧',
          },
        },
      },
      subject: {
        description:
          'Write a short, imperative tense description of the change',
      },
    },
  },
};
