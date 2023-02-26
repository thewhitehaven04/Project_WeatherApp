/**
 * @typedef View
 * @property {function():DocumentFragment} render
 * @property {function():void} hide removes the rendered element 
 */

/**
 * @template T
 * @typedef Updatable<T>
 * @property {function(T):void} setState
 * @property {function():void} update
 */

/**
 * @template T
 * @typedef {Updatable<T> & View} UpdatableView<T> 
 */
