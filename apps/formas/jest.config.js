module.exports = {
  name: 'formas',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/formas',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
