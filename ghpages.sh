PREVIOUS_BRANCH=$(git rev-parse --abbrev-ref HEAD)

  
if [ -z "$(git status --porcelain)" ]; then 
  # Working directory clean
  echo "Deploying gh-pages..."
  if git show-ref --verify --quiet "refs/heads/gh-pages"; then
    git checkout gh-pages
  else
    echo "Creating branch gh-pages..."
    git checkout -b gh-pages
  fi
  git merge master --no-edit
  if [[ $* == *-i* ]]; then
    echo "Modifying .gitignores..."
    ghpages-ignores
  fi
  npm run docs:build
  git add .
  git commit -m 'new build'
  git push origin gh-pages
  git checkout $PREVIOUS_BRANCH
else 
  # Uncommitted changes
  echo "Uncommitted git changes! Deploy failed."
fi