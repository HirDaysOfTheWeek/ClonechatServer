ClonechatServer
===============

This is the server used to support Clonechat, it is in active development. 

### Testing

* Go to your root directory for this repository and open a new tab

* In the new tab, run `mongod` and AFTER, in the original tab, run `node app.js`

* For text: `curl -v -F fieldname=value` and repeat the part after `-v` for every field needed in the request

* For images: same as above but prepend an @ symbol before the path name so `curl -v -F imagefieldname=@imagepath.jpg`

* Both can be combined

### Routes

Note: all endpoints return a json object with a field called `status` which has values of `ok` or `error` to determien if request was successful and a field called `message` to see the message corresponding to the status

* users
  * endpoints
    * /register, method=POST - takes in email, username, password, and returns user object without password if successful
    * /login, method=POST - takes in username, password and returns user object without password if successful
* snaps
  * endpoints
    * /postSnap, method=POST - takes in username, recipient, ycoordinate, caption, showLength, and snapPhoto where all fields are text except for snapPhoto which is a JPEG image, and it returns the snap object if successful
