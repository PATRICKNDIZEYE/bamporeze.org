#!/bin/bash

#  Generate module and both it service and provider
nest g module $1
nest g service $1 --no-spec
nest g controller $1 --no-spec

echo "Module $1 created successfully"
