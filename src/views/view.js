/**
 * @typedef Hideable
 * @property {function():void} hide hides the fragment
 */

/**
 * @typedef View
 * @property {function():DocumentFragment} render
 */

/**
 * @template T
 * @typedef Updatable<T>
 * @property {function(T):void} setState
 * @property {function():void} update
 */

/**
 * @template T
 * @mixes Hideable
 * @typedef {Updatable<T> & View & Hideable}  UpdatableView<T>
 */
