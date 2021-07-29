import {swap} from '@array-like/swap';

/**
 * Reverse.
 *
 * @param {{[x:number]: any}} a
 * @param {number} i
 * @param {number} j
 */
const reverse = (a, i, j) => {
	while (i < j) swap(a, i++, --j);
};

export default reverse;
