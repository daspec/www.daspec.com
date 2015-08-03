dest=jekyll-site
rm -rf $dest/guides $dest/examples
mkdir $dest/guides
for c in guides/*.md; do 
  title=`grep '#' $c| head -1 | sed s/#//`
  cat > $dest/$c  << EOF 
---
title: $title
layout: page 
---
EOF
  sed s/\.md\)/\.html\)/g $c >> $dest/$c
done
cp -R guides/images $dest/guides/images
cp -R examples $dest
cd $dest
jekyll build
cd ..
