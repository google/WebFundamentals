#!/bin/bash

#
# Flush MemCache after deployment
#

# Flush the MemCache
echo "Flushing MemCache..."
curl https://$AE_APP_ID.appspot.com/flushMemCache
