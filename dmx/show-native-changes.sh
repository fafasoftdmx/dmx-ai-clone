#!/bin/sh
LAST_TAG=$(git describe --abbrev=0 --tags)
DIRECTORIES='ios android'
ROOT_DIRECTORY=''

for ((i=1;i<=$#;i++));
do

    if [ ${!i} = "-tag" ]
    then ((i++))
        LAST_TAG=${!i};

    elif [ ${!i} = "-platform" ];
    then ((i++))
	PLATFORM=${!i};
	if [ "$PLATFORM" != 'android' ] && [ "$PLATFORM" != 'ios' ]; then
		echo INVALID PLATFORM: $PLATFORM
		exit 1;
	fi
        DIRECTORIES=$ROOT_DIRECTORY$PLATFORM;
    fi

done;

echo TAG: $LAST_TAG
echo PLATFORM: $DIRECTORIES

git log $LAST_TAG..HEAD -- $DIRECTORIES