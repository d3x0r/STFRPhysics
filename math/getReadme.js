getReadme("d3x0r","STFRPhysics", "LightSpeedSim.md");

function getReadme(owner, repo, path) {
    // set header
    document.getElementById('avatar').src = `https://github.com/${owner}.png`;
    document.getElementById('userName').innerHTML = `${owner}`;


    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
            "Accept": "application/vnd.github+json",
        }
    }) // Fetch the file from GitHub's api
        .then(response => response.json())
        .then(data => {
            var content = atob(data.content);//atob(data.content); // Convert from base64 to readable text
            //console.log( content );
            //console.log( cleaned );
            var lines = content.split('\n');
            var title = lines[0].replace("#", "");
            document.getElementById( 'title' ).innerHTML = title;
            // get string from start to pos
            var pos = content.indexOf("(https:");
            // get until )
            var endPos = content.indexOf(")",pos);
            // get full path
            var pathWithAFile = content.substring(pos+1, endPos);
            console.log("path with file = ");
            console.log( pathWithAFile );
            // get file
            pos = pathWithAFile.lastIndexOf("/");
            var path = pathWithAFile.substring(0, pos);
            console.log( path );
            // get local folder
            pos = path.lastIndexOf("/");
            var localFolder = path.substring(pos+1, path.length);
            var pathWithoutLocal = path.substring( 0, pos );
            console.log( localFolder );
            // replace local folder with full path
            content = content.replace('![Screenshot](' + localFolder, '![Screenshot](' + path);
            // find if no folder on image
            pos = 0;
            pos = content.indexOf('Image](', pos);
            var max = 0; // incase infinite loop from bad logic
            while( pos>0 && max < 1000 ) {
                endPos = content.indexOf(")", pos);
                var testStr = content.substring( pos, endPos);
                var testPos = testStr.indexOf("/");
                if( testPos < 1 ) {
                    // we got a local link, fix it
                    // get the filename
                    var newPos = pos + 7;
                    var substituteStr = content.substring( newPos, endPos)
                    console.log( substituteStr );
                    content = content.replace(substituteStr, pathWithoutLocal + '/' + substituteStr );
                }
                ++pos;
                pos = content.indexOf('Image](', pos);
                ++max;
            }
            
            console.log( content );
            // now lets post it again to convert it to html
            fetch(`https://api.github.com/markdown/raw`, {
                method: "POST"
                , headers: {
                    "Content-Type": "text/x-markdown"
                }
                , body: content
                
            })
            .then(response => response.text())
            .then(data=> {
                //console.log(data);
                document.getElementById("readme-text").innerHTML = data; // Apply content to the document
            })
            .catch(error => console.log(error)); // Catch any errors
            
        })
        .catch(error => console.log(error)); // Catch any errors
}


