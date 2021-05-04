call rollup game.mjs --file game2.js --format iife 

call google-closure-compiler.cmd --language_out NO_TRANSPILE --js=game2.js --js_output_file=game-min.js 

call rollup game2.mjs --file game2a.js --format iife 

call google-closure-compiler.cmd --language_out NO_TRANSPILE --js=game2a.js --js_output_file=game2-min.js 

:call google-closure-compiler
