# # Use the following commands to run this script
# docker run -dit --name emscripten -v $(pwd):$(pwd) trzeci/emscripten-fastcomp bash
# docker exec -it -w $(pwd) emscripten bash ./emscripten-build.sh

set -e
export EMSCRIPTEN_DIR="$(dirname $(which emcc))"
make emscripten-release
