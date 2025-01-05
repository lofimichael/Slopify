#!/bin/bash

# Check if --fresh flag is passed
if [ "$1" = "--fresh" ]; then
    echo "🌱 FRESH START MODE ACTIVATED 🌱"
    echo "⚠️  This will delete ALL local files and get a fresh copy!"
    echo "Are you sure? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]; then
        echo "🧹 Cleaning local repository..."

        # Store the current branch name before cleaning
        CURRENT_BRANCH=$(git branch --show-current)

        # Remove all files (including .git) but keep the script
        find . -mindepth 1 ! -name 'sync-slopify.sh' -exec rm -rf {} +

        # Re-init git and set remote
        git init
        git remote add origin https://github.com/lofimichael/Slopify.git

        # Fetch everything fresh
        echo "📡 Fetching fresh copy..."
        git fetch origin

        # Reset to remote state
        git reset --hard origin/$CURRENT_BRANCH

        echo "✨ Repository has been reset to a pristine state!"
        exit 0
    else
        echo "Fresh start cancelled!"
        exit 0
    fi
fi

echo "🎵 Syncing Slopify with remote repository..."
echo "   Hint: Use --fresh flag to completely reset your local copy to the latest upstream state"
echo "   Example: ./sync-slopify.sh --fresh"

# Store the current branch name
CURRENT_BRANCH=$(git branch --show-current)

# Fetch all changes from remote
echo "📡 Fetching updates..."
git fetch origin

# Check if there are any changes to pull
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})
BASE=$(git merge-base @ @{u})

if [ $LOCAL = $REMOTE ]; then
    echo "✨ Already up to date!"
elif [ $LOCAL = $BASE ]; then
    echo "⬇️  Pulling new changes..."
    # Try to pull, handling potential conflicts
    if git pull --rebase origin $CURRENT_BRANCH; then
        echo "✅ Successfully updated!"
    else
        echo "⚠️  Conflicts detected!"
        echo "1. Resolve conflicts in your editor"
        echo "2. After resolving, run: git add ."
        echo "3. Then run: git rebase --continue"
        echo "4. Finally: git push origin $CURRENT_BRANCH"
        exit 1
    fi
elif [ $REMOTE = $BASE ]; then
    echo "⬆️  You have unpushed changes. Push them first:"
    echo "git push origin $CURRENT_BRANCH"
else
    echo "🔄 Branches have diverged. Attempting to sync..."
    if git pull --rebase origin $CURRENT_BRANCH; then
        echo "✅ Successfully synced!"
    else
        echo "⚠️  Conflicts detected!"
        echo "1. Resolve conflicts in your editor"
        echo "2. After resolving, run: git add ."
        echo "3. Then run: git rebase --continue"
        echo "4. Finally: git push origin $CURRENT_BRANCH"
        exit 1
    fi
fi

echo "🎉 Sync process completed!"

echo "
💡 Tips:
- Regular sync: ./sync-slopify.sh
- Complete reset: ./sync-slopify.sh --nuke"
