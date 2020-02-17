#!/bin/bash


function dashToCapital {
  echo "$1" | awk -F"-" '{for(i=1;i<=NF;i++){$i=toupper(substr($i,1,1)) substr($i,2)}} 1' OFS=""
}

function createSrcFileTemplate {
  echo "Creating source file..."
  mkdir -p src/$1/$2
  local compClassName=`dashToCapital $2`
  local srcFile=src/$1/$2/$compClassName.js
  touch $srcFile
  echo -e "\
import React from 'react';\n\n\
// Styles\n\
import './$compClassName.scss';\n\n\n\
class $compClassName extends React.Component {\n\n\
  constructor(props) {\n\
    super(props);\n\
  }\n\n\n\
  render() {\n\
    return (\n\
      <div className=\"$compClassName\"></div>\n\
    );\n\
  }\n\n\
}\n\n\n\
export default $compClassName;\
" > $srcFile
}

function createStyleFileTemplate {
  echo "Creating style file..."
  mkdir -p src/$1/$2
  local compClassName=`dashToCapital $2`
  local styleFile=src/$1/$2/$compClassName.scss
  touch $styleFile
  echo -e ".$compClassName {}" > $styleFile
}


component=$1
if [ -z "$component" ]; then
  read -p "Enter component name (in dash case) : " component
fi
if [ -z "$component" ]; then
  echo "You must specify a component name !\n" >&2
  exit 1
fi

createSrcFileTemplate components $component
createStyleFileTemplate components $component

exit 0
