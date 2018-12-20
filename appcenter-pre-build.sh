#!/usr/bin/env bash
#Replacing Secret Variables from ENV

echo "Arguments for updating:"
echo " - ONESIGNAL_API_KEY: $ONESIGNAL_API_KEY"

sed -i '' "s/\$ONESIGNAL_API_KEY/$ONESIGNAL_API_KEY/g" settings.js


# Print out file for reference
cat settings.js

echo "Updated OS-API-Key!"
echo "removing drawables: (duplicate recources)"
rm -r android/app/src/main/res/drawable-*