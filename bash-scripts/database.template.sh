#!/bin/sh
REMOTE='DEFAULT_REMOTE'

# 1 for backup, 2 for restore
OPERATION=1

# If args, then remote is passed as first argument
if [ -n "$1" ]; then
  REMOTE="$1"
fi

# If args, then operation is passed as second argument
if [ -n "$2" ]; then
  case "$2" in
    backup|b)
      OPERATION=1
      ;;
    restore|r)
      OPERATION=2
      ;;
  esac
fi

echo "connecting to ${REMOTE} ..."

# If we are going for restore upload the backup to the server
# NOTE: MAKE SURE THAT YOU HAVE ONLY ONE DUMP FILE IN ~/backups
if [ $OPERATION -eq 2 ]; then

  # Remove any old dumps on remote firstly
  ssh $REMOTE 'rm -rf ~/DUMP_NAME'

  # Upload the dump file to the server
  scp -r ~/backups/DUMP_NAME $REMOTE:~/

ssh -T $REMOTE <<HERE

export LC_ALL="en_US.UTF-8"

# Restoring from dump file
# NOTE: MUST HAVE ONLY ONE DUMP FILE IN BACKUPS
mongorestore --db sems ~/DUMP_NAME/DATABASE_NAME

exit
HERE

  echo 'restored database successfully'

else
  # If backup then backup ¯\_(ツ)_/¯

ssh -T $REMOTE <<HERE

# Remove any old dumps from server if existing
if ls DUMP_NAME 1> /dev/null 2>&1; then
    rm -rf DUMP_NAME
fi

export LC_ALL="en_US.UTF-8"

# Dumping the db to DUMP_NAME
mongodump --db sems --out DUMP_NAME

exit
HERE

  # Copy the file to the local machine
  scp -r $REMOTE:~/DUMP_NAME ~/backups/

  echo 'backup succeeded, check ~/backups/'

fi
