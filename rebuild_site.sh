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
sed -e s/\.md\)/\.html\)/g $c >> $dest/$c
done


#rebuilding examples
mkdir $dest/examples
mkdir $dest/_includes/examples

for cat in examples/*; do 
  category=`basename $cat`
  for c in $cat/*; do
    example=`basename $c`
    title=`echo $example | sed 's/_/ /g'`

    cat > $dest/examples/$example.md  << EOF 
---
title: $title
layout: example 
example: $category/$example
categories: [$category]
permalink: /examples/$category/$example/
---
EOF

    sed s/\.md\)/\.html\)/g $c/README.md >>  $dest/examples/$example.md
  done
done

cp -r examples $dest/_includes

cd $dest
jekyll build
cd ..
