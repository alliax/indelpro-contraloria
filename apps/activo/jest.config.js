module.exports = {
  name: 'activo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/activo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
