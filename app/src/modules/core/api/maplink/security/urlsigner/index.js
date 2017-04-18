// Native nodejs helper for parsing url
const
  url     = require('url'),
  crypto  = require('crypto'),
  util    = require('util');

function getSignature( completeUrl, key, body ) {

    let parsedUrl = url.parse( completeUrl );

    // Get the path and the query, which are the necessary parts to generate the signature
    let signatureElements = parsedUrl.path;

    if (body)
      signatureElements += body;

    // Handle the replacements (invalid characters for the key)
    let usablePrivateKey = key.replace( "-", "+" ).replace( "_", "/" );

    //Creates a buffer to be passed to hmac constructor (using base64 encoding)
    let privateKeyBuffer = new Buffer( usablePrivateKey, 'base64' )

    // Creates a buffer to be passed to hmac instance
    let pathAndQueryBuffer = new Buffer( signatureElements, 'utf8' );

    // Generates the hash using SHA1
    let hash = crypto.createHmac( 'sha1', privateKeyBuffer )
                                .update( pathAndQueryBuffer )
                                .digest( 'base64' );

    // Make the generated hash url-safe, replacing '+' and '/' characters
    let signature = hash.replace( "+", "-" ).replace( "/", "_" );

    return signature;
}

function getSignedURL (completeUrl, key, body) {
  let url = util.format("%s&signature=%s", completeUrl, getSignature(completeUrl, key, body));
  return url;
}

exports.getSignature  = getSignature;
exports.getSignedURL  = getSignedURL;
