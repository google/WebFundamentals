#!/bin/bash

# Variables used in the script - largely file names
resultsFile="results.csv"
includesListFile="includes-list.txt"
tempDirectory="temp"
tempContentDirectory="content"
exampleLayout="example-layout.liquid"
exampleFrontMatter="example-front-matter.markdown"
blankInclude="blank-include.liquid"
numberOfFiles=2000
numberOfRunsToAvg=10

# Delete files if they exist
[[ -f "$resultsFile" ]] && rm -f "$resultsFile"
[[ -f "$includesListFile" ]] && rm -f "$includesListFile"
rm -rf ./"$tempDirectory"

# Start results json file
printf "Filename, Milliseconds\n" >> "$resultsFile"

# Copy over jekyll
cp -r ./../../../src/jekyll "$tempDirectory"/
# Copy over example layout
cp "$exampleLayout" "$tempDirectory"/_layouts/
# Copy over blank include
cp "$blankInclude" "$tempDirectory"/_includes/

# Get list of includes from jekyll
find "$tempDirectory"/_includes/ -type f > "$includesListFile"
# Parse the file as an array
readarray -t includesList < $includesListFile

# Loop over the includes file array and perform tests on each
for includeFile in "${includesList[@]}";
do
   # Remove temp/_includes/ from file name
   emptyString=''
   filteredIncludeName="${includeFile/"$tempDirectory"\/_includes\//$emptyString}"

   # Generate new directory to place fake content
   rm -rf ./"$tempDirectory"/"$tempContentDirectory"
   mkdir "$tempDirectory"/"$tempContentDirectory"

   # Generate the files to be used in the test
   for i in $(seq 1 $numberOfFiles);
   do
      # Copy the example markdown and add the include
      cp $exampleFrontMatter ./"$tempDirectory"/"$tempContentDirectory"/example-$i.markdown
      echo {% include "$filteredIncludeName" %} >> ./"$tempDirectory"/"$tempContentDirectory"/example-$i.markdown
   done

   # Start timer, perform jekyll build, end the timer
   runtimeTotal=0
   for i in $(seq 1 $numberOfRunsToAvg);
   do
     start=`date +%s%N`
     jekyll build --config _config/common.yml
     end=`date +%s%N`
     runtime=$(($((end-start))/1000000))
     runtimeTotal=$(($runtimeTotal+$runtime))
  done

  runtimeAvg=$(($runtimeTotal/$numberOfRunsToAvg))
   # Print output so we know something is running
   echo "$filteredIncludeName" Took $runtimeAvg'ms'

   # Save result to csv file
   printf "\"$filteredIncludeName\", \"$runtimeAvg\"\n" >> "$resultsFile"
done

# Time to do some tidy up
rm -rf ./"$tempDirectory"
rm "$includesListFile"
