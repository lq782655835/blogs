#!/usr/bin/env sh

# # 确保脚本抛出遇到的错误
# set -e

# # 生成静态文件
# npm run docs:build

# # Commit changes.
# msg="deploy at `date`"
# if [ $# != 0 ]
#   then msg="$*"
# fi
# git add -A
# git commit -m "$msg"
# echo 'local commited'

# git push -f https://github.com/lq782655835/blogs.git master
# echo 'remote commited'
# # cd -

# set ORIGIN to current git origin
ORIGIN=$(git remote -v | awk '$1=="origin" && $3=="(push)" {print $2}');
# get current version
VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g');

# target folder: /dist/site, make it clean and step into
rm -fr dist
mkdir dist
cd dist

# init an empty git repo, checkout branch gh-pages
git clone -b gh-pages --depth 1 $ORIGIN site

# remove all existed files in the repo, run the site build script
cd site
rm -rf *
# npm run docs:build

# commit and push to gh-pages
git add . -A
git commit -m "$VERSION publish!"
git push origin gh-pages