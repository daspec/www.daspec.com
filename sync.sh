aws --profile sauf s3 sync jekyll-site/_site s3://daspec.com --delete --cache-control="max-age=3600" --acl public-read
