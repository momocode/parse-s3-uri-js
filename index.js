'use strict'

module.exports = parseS3Uri

function parseS3Uri (uri, {interpretDirectory = false} = {}) {
  if (typeof uri !== 'string')
    throw new TypeError('uri is not a string')
  const match = uri.match(/^s3:\/\/([^/]+)\/(.+?)(\/*)$/)
  if (!match)
    throw new S3UriError(uri + ' is not of form s3://bucket/key')
  const trailingSlashes = match[3]
  const key = match[2]
  return {
    bucket: match[1],
    key: interpretDirectory ? key : key + trailingSlashes,
    ...interpretDirectory ? {isDirectory: trailingSlashes !== ''} : {}
  }
}

class S3UriError extends Error {}
