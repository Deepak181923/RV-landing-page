#!/bin/bash
set -o errexit
pushd "$(cd "$(dirname "$0")" ; pwd -P )/.." > /dev/null

if [ -z "$CI_CD" ]; then
  sed -i 's/\r$//' ../.env

  source ../.env
fi

aws s3 cp build/ "s3://${AWS_NAMESPACE}-website-lp-cloudfront-s3" \
  --recursive \
  --exclude "index.html" \
  --cache-control max-age=604800 \
  --profile "${AWS_PROFILE}"

aws s3 cp build/index.html "s3://${AWS_NAMESPACE}-website-lp-cloudfront-s3" \
  --cache-control max-age=0 \
  --profile "${AWS_PROFILE}"

if [ -z "$AWS_WEBSITE_LP_CLOUDFRONT_DISTRIBUTION_ID" ]; then
  aws cloudfront create-invalidation \
      --distribution-id "${AWS_WEBSITE_LP_CLOUDFRONT_DISTRIBUTION_ID}" \
      --paths "/*" \
      --profile "${AWS_PROFILE}"
fi
