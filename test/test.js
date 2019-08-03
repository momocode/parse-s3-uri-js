'use strict'

const chai = require('chai')
const {expect} = chai

const parse = require('../index.js')

describe('parse-s3-uri', () => {
  it('should throw TypeError when given anything but a string', () => {
    expect(() => parse()).to.throw(TypeError)
    expect(() => parse(1)).to.throw(TypeError)
    expect(() => parse(true)).to.throw(TypeError)
    expect(() => parse({})).to.throw(TypeError)
  })
  it('should throw S3UriError if url does not match pattern s3://bucket/key', () => {
    expect(() => parse('https://s3.amazonaws.com/bucket/key')).to.throw(parse.S3UriError)
    expect(() => parse('')).to.throw(parse.S3UriError)
    expect(() => parse('abc')).to.throw(parse.S3UriError)
  })
  it('should return bucket and key', () => {
    expect(parse('s3://bucket/key')).to.deep.equal({
      bucket: 'bucket',
      key: 'key'
    })
  })
  it('should check for and remove trailing slashes if given option interpretDirectory', () => {
    expect(parse('s3://bucket/key', {interpretDirectory: true})).to.deep.equal({
      bucket: 'bucket',
      key: 'key',
      isDirectory: false
    })
    expect(parse('s3://bucket/dir/', {interpretDirectory: true})).to.deep.equal({
      bucket: 'bucket',
      key: 'dir',
      isDirectory: true
    })
    expect(parse('s3://bucket/dir//', {interpretDirectory: true})).to.deep.equal({
      bucket: 'bucket',
      key: 'dir',
      isDirectory: true
    })
  })
  it('should preserve trailing slashes if not given interpretDirectory option', () => {
    expect(parse('s3://bucket/key/')).to.deep.equal({
      bucket: 'bucket',
      key: 'key/'
    })
  })
})
