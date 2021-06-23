import type { AWS } from '@serverless/typescript';

const service = 'service'
const BucketName = 'bucket-name'

const serverlessConfiguration: AWS = {
  service,
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    stage: "${opt:stage, 'dev'}",
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    region: 'us-east-2',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      s3Bucket: {
        DeletionPolicy: 'Retain',
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName,
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;