#!/bin/bash

rm src/assets/photos/thumbs/*
mkdir src/assets/photos/tmp
for img in src/assets/photos/*.jpg ; do
	echo $img
	mogrify -strip $img
	convert $img -resize '2000000@>' src/assets/photos/tmp/$(basename $img) # convert image if it's too big
	mv src/assets/photos/tmp/$(basename $img) $img # overwrite
	convert $img -resize 10% src/assets/photos/thumbs/$(basename $img) # generate thumbnail
done
rm -r src/assets/photos/tmp

sed -i "s/\(NIMAGES = \)[0-9]\{2\}/\1$(ls src/assets/photos/*.jpg | wc -l)/" src/app/constants.ts
