# keepr
useless uploading panel written in Hapi.js
<p align="center">
	<img src="screenshot.png" alt="Screenshot" width="400"/>
</p>

# Running
Just do these commands:
```bash
    export UPLOAD_PATH=/path/to/where/you/save/files
    export MAX_BYES=6666 # Maximum upload allowed size.
    export KEEPR_HOST=0.0.0.0 # Who is going to host keepr?
    export KEEPR_PORT=8080 # Which port you want to expose keepr on?
    docker-compose build
    docker-compose up
```


# License
MIT License

Copyright (c) 2018 keepr project.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
