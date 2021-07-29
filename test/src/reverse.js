import test from 'ava';

import {alloc} from '@array-like/alloc';
import {copy} from '@array-like/copy';

import {reverse} from '../../src/index.js';

const macro = (t, a, i, j, expected) => {
	const reference = alloc(a.length);
	copy(a, 0, a.length, reference, 0);

	reverse(a, i, j);
	t.deepEqual(a, expected, 'reverse x 1');

	reverse(a, i, j);
	t.deepEqual(a, reference, 'reverse x 2');
};

const repr = JSON.stringify;

macro.title = (title, a, i, j, expected) =>
	title ?? `reverse(${repr(a)}, ${i}, ${j}) is ${repr(expected)}`;

const immutable = (t, a, i, j) => macro(t, a, i, j, a.slice());
immutable.title = (title, a, i, j) => macro.title(title, a, i, j, a.slice());

const whole = (t, a, expected) => macro(t, a, 0, a.length, expected);
whole.title = (title, a, expected) =>
	macro.title(title, a, 0, a.length, expected);

test(immutable, [1, 2, 3, 4, 5, 6, 7, 8, 9], 4, 4);
test(immutable, [1, 2, 3, 4, 5, 6, 7, 8, 9], 5, 5);
test(immutable, [1, 2, 3, 4, 5, 6, 7, 8, 9], 2, 1);
test(immutable, [1, 2, 3, 4, 5, 6, 7, 8, 9], 0, -1);
test(immutable, [1, 2, 3, 4, 5, 6, 7, 8, 9], 1, 0);
test(immutable, [1, 2, 3, 4, 5, 6, 7, 8, 9], 9, 0);
test(immutable, [1, 2, 3, 4, 5, 6, 7, 8, 9], 27, -32);

test(whole, [], []);
test(whole, [1], [1]);
test(whole, [1, 2, 3], [3, 2, 1]);
test(whole, [1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1]);
test(whole, [1, 2, 3, 4, 5, 6, 7, 8, 9], [9, 8, 7, 6, 5, 4, 3, 2, 1]);

test(macro, [1, 2, 3, 4, 5, 6, 7, 8, 9], 3, 7, [1, 2, 3, 7, 6, 5, 4, 8, 9]);
test(macro, [1, 2, 3, 4, 5, 6, 7, 8, 9], 3, 8, [1, 2, 3, 8, 7, 6, 5, 4, 9]);
test(macro, [1, 2, 3, 4, 5, 6, 7, 8, 9], 3, 9, [1, 2, 3, 9, 8, 7, 6, 5, 4]);
test(macro, [1, 2, 3, 4, 5, 6, 7, 8, 9], 0, 6, [6, 5, 4, 3, 2, 1, 7, 8, 9]);
test(macro, [1, 2, 3, 4, 5, 6, 7, 8, 9], 0, 5, [5, 4, 3, 2, 1, 6, 7, 8, 9]);
test(macro, [1, 2, 3, 4, 5, 6, 7, 8, 9], 0, 4, [4, 3, 2, 1, 5, 6, 7, 8, 9]);
