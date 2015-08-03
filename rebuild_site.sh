dest=jekyll-site

rm -rf $dest/guides $dest/examples $dest/_includes/examples

#rebuilding guides

mkdir $dest/guides
cp -R guides/images $dest/guides/images

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


#rebuilding examples
mkdir $dest/examples
mkdir $dest/_includes/examples

for c in examples/*.md; do \
  example=`basename $c .md`
  title=`echo $example | sed 's/_/ /g'`
  cat > $dest/$c  << EOF 
---
title: $title
layout: example 
example: $example
---
EOF

cp $c $dest/_includes/examples/$example.txt
done

cp examples/*.js $dest/_includes/examples

cd $dest
jekyll build
cd ..
