#!/bin/bash

# Variables used in the script - largely file names
resultsFile="results.csv"
layoutListFile="layout-list.txt"
tempDirectory="temp"
tempContentDirectory="content"
exampleFrontMatter="example-front-matter.markdown"
numberOfFiles=2000
numberOfRunsToAvg=10

# Delete files if they exist
[[ -f "$resultsFile" ]] && rm -f "$resultsFile"
[[ -f "$layoutListFile" ]] && rm -f "$layoutListFile"
rm -rf ./"$tempDirectory"

# Start results json file
printf "Filename, Milliseconds\n" >> "$resultsFile"

# Copy over jekyll
cp -r ./../../../src/jekyll "$tempDirectory"/

# Get list of includes from jekyll
find "$tempDirectory"/_layouts/ -type f > "$layoutListFile"
# Parse the file as an array
readarray -t layoutsList < $layoutListFile

# Loop over the includes file array and perform tests on each
for layoutFile in "${layoutsList[@]}";
do
   # Remove temp/_includes/ from file name
   emptyString=''
   filteredLayoutName="${layoutFile/"$tempDirectory"\/_layouts\//$emptyString}"

   # Generate new directory to place fake content
   rm -rf ./"$tempDirectory"/"$tempContentDirectory"
   mkdir "$tempDirectory"/"$tempContentDirectory"

   # Generate the files to be used in the test
   for i in $(seq 1 $numberOfFiles);
   do
      # Copy the example markdown and add the include
      cp $exampleFrontMatter ./"$tempDirectory"/"$tempContentDirectory"/example-$i.markdown
   done

   # The sed command doesn't like '/' - messes with it's regex, need to
   # replace with '\/'
   ymlLayoutName="${filteredLayoutName//\//'\/'}"
   # Jekyll layout names in the yml don't need the liquid bit
   ymlLayoutName="${ymlLayoutName//.liquid/''}"
   # Sed replaces the example layout with the tested layout name
   sed -i "s/example-layout/$ymlLayoutName/g" ./"$tempDirectory"/"$tempContentDirectory"/*.markdown

   # Start timer, perform jekyll build, end the timer
   runtimeTotal=0
   for i in $(seq 1 $numberOfRunsToAvg);
   do
     start=`date +%s%N`
     jekyll build --config _config/common.yml > /dev/null 2>&1
     end=`date +%s%N`
     runtime=$(($((end-start))/1000000))
     runtimeTotal=$(($runtimeTotal+$runtime))
  done

  runtimeAvg=$(($runtimeTotal/$numberOfRunsToAvg))
   # Print output so we know something is running
   echo "$filteredLayoutName" Took $runtimeAvg'ms'

   # Save result to csv file
   printf "\"$filteredLayoutName\", \"$runtimeAvg\"\n" >> "$resultsFile"
done

# Time to do some tidy up
rm -rf ./"$tempDirectory"
rm "$layoutListFile"
