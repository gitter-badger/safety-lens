/* @flow */

import { lens } from './lens'

import type { Lens, Lens_, Traversal_ } from './lens'

export {
  index,
  prop,
  _1,
  _2,
}

/* arrays */

function index<A>(idx: number): Traversal_<A[],A> {
  return f => (pure, array) => {
    if (typeof array[idx] !== 'undefined') {
      return f(pure, array[idx]).map(updatedValue => (
        array.map((v, i) => i === idx ? updatedValue : v)
      ))
    }
    else {
      return pure(array)
    }
  }
}


/* objects */

function prop<S:Object,A>(key: $Enum<S>): Lens_<S,A> {
  return lens(
    obj => obj[key],
    (obj, val) => {
      var newObj = {}
      for (var k of Object.keys(obj)) {
        newObj[k] = k === key ? val : obj[k]
      }
      return newObj
    }
  )
}


/* tuples */

function _1<A,B,C>(): Lens<[A,B],[C,B],A,C> {
  return lens(
    ([a,_]) => a,
    ([_,b], c) => [c,b]
  )
}

function _2<A,B,C>(): Lens<[A,B],[A,C],B,C> {
  return lens(
    ([_,b]) => b,
    ([a,_], c) => [a,c]
  )
}

