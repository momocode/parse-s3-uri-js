parse-s3-uri
============

`parse-s3-uri` is a very simple function to parse uris of form

    s3://bucket/key

and optionally to interpret whether a "directory" is intended if key ends with a slash e.g

    s3://bucket/dir/

Usage
-----

    const parseS3Uri = require('@momocode/parse-s3-uri')
    parseS3Uri('s3://bucket/key')
    // { bucket: 'bucket', key: 'key' }
    parseS3Uri('s3://bucket/no-slash', {interpretDirectory: true})
    // { bucket: 'bucket', key: 'no-slash', isDirectory: false }
    parseS3Uri('s3://bucket/dir/', {interpretDirectory: true})
    // { bucket: 'bucket', key: 'dir', isDirectory: true }

Note that only uris of form s3://bucket/key are parsed i.e anything else
including actual s3 https urls such as `https://s3.amazonaws.com/bucket/key`
will not work.

If anything but a string is given as parameter, a `TypeError` is thrown. If the
uri is not of the expected form, a `parseS3Uri.S3UriError` is thrown.
