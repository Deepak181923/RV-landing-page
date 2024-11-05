#!/bin/bash
set -o errexit
pushd "$(cd "$(dirname "$0")" ; pwd -P )/.." > /dev/null

sed -i 's/\r$//' ../.env

source ../.env

aws cloudformation deploy \
  --template-file cloudformation/cloudfront.yaml \
  --stack-name "${AWS_NAMESPACE}-website-lp-cloudfront" \
  --capabilities CAPABILITY_NAMED_IAM \
  --no-fail-on-empty-changeset \
  --parameter-overrides \
    BucketName="${AWS_NAMESPACE}-website-lp-cloudfront-s3" \
  --profile "${AWS_PROFILE}"