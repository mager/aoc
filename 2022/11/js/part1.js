#!/usr/bin / env node
"use strict";

import { readFileSync } from "node:fs";
import { load as yamlLoad } from "js-yaml";

// Common JavaScript helpers
// TODO add vim fold markers?
// NOTE arrow functions does not bind 'this': https://www.w3schools.com/js/js_arrow_function.asp
//
// Import like this:
// * Just prototypes:
//import "../../utils/commons.js";
// * prototypes + exports (classes, functions):
//import { DefaultObject } from "../../utils/commons.js";

// ===== Object =====
// Filter on key/value like Array.filter.
// Ref: https://stackoverflow.com/a/37616104/265508
Object.filter = function (obj, predicate) {
    return Object.fromEntries(Object.entries(obj).filter(predicate));
};

Object.prototype.values = function (a, b) {
    return Object.values(this);
};

Object.prototype.keys = function (a, b) {
    return Object.keys(this);
};

Object.prototype.entries = function (a, b) {
    return Object.entries(this);
};

// ===== Number =====

// Inclusive range check.
Number.prototype.inRange = function (a, b) {
    return this >= a && this <= b;
};

// ===== Array =====
// Ref: https://stackoverflow.com/a/10249772/265508
Array.prototype.eachSlice = function (size, callback) {
    for (var i = 0, l = this.length; i < l; i += size) {
        callback.call(this, this.slice(i, i + size));
    }
};

// Ref: https://stackoverflow.com/a/57477913/265508
Array.prototype.eachCons = function (num) {
    return Array.from({ length: this.length - num + 1 }, (_, i) =>
        this.slice(i, i + num)
    );
};

// Ref: https://stackoverflow.com/a/17428705/265508
Array.prototype.transpose = function () {
    return this[0].map((x, i) => this.map((y) => y[i]));
};

// Ref: https://stackoverflow.com/a/1669222
Array.prototype.max = function () {
    return Math.max.apply(null, this);
};

// Ref: https://stackoverflow.com/a/1669222
Array.prototype.min = function () {
    return Math.min.apply(null, this);
};

Array.prototype.minmax = function () {
    return [this.min(), this.max()];
};

// Count number of element for which the predicate is true.
Array.prototype.count = function (predicate) {
    return this.filter(predicate).length;
};

// Sum elements.
Array.prototype.sum = function () {
    return this.reduce((sum, e) => sum + e, 0);
};

// Multiply elements.
Array.prototype.mul = function () {
    return this.reduce((prod, e) => prod * e, 1);
};

// ===== Set =====
Set.prototype.intersection = function (other) {
    return new Set([...this].filter((e) => other.has(e)));
};

// ===== Classes =====
// A map/dict/hash with default value.
// Ref: https://stackoverflow.com/a/44622467/265508
export class DefaultObject {
    constructor(defaultVal) {
        return new Proxy(
            {},
            {
                get: (target, name) => (name in target ? target[name] : defaultVal),
            }
        );
    }
}

// ===== Utility functions =====

// Create integer range with start (inclusive), end (exclusive)
// Ref: https://stackoverflow.com/a/44957114/265508
export const range = (start, stop, step = 1) =>
    Array(Math.ceil((stop - start) / step))
        .fill(start)
        .map((x, y) => x + y * step);

// Repeated function invocations.
export const repeat = function (times, func) {
    for (let t = 0; t < times; t++) {
        func(t);
    }
};

const yaml = readFileSync('../input.txt')
    .toString()
    .toLowerCase()
    .replaceAll(/ {2}if /g, "")
    .replaceAll(/starting /g, "")
    .replaceAll(/throw to /g, "")
    .replaceAll(/monkey /g, "")
    .replaceAll(/divisible by /g, "")
    .replaceAll(/test:/g, "test_div:")
    .replaceAll(/(new|old)/g, "item");
const monkeys = yamlLoad(yaml);

const ROUNDS = 20;
const WORRY_DIVIDER = 3;

for (const monkey of monkeys.values()) {
    monkey.inspections = 0;
    if (typeof monkey.items != "string") monkey.items = monkey.items.toString();
    monkey.items = monkey.items.split(", ").map((n) => Number.parseInt(n, 10));
}

for (let round = 0; round < ROUNDS; ++round) {
    monkeys.values().forEach((monkey) => {
        monkey.inspections += monkey.items.length;
        monkey.items.forEach((item) => {
            eval(monkey.operation);
            item = Math.floor(item / WORRY_DIVIDER);
            const destMonkey =
                item % monkey.test_div == 0 ? monkey.true : monkey.false;
            monkeys[destMonkey].items.push(item);
        });
        monkey.items = [];
    });
}

const monkey_business = monkeys
    .values()
    .sort((a, b) => a.inspections - b.inspections)
    .slice(-2)
    .map((m) => m.inspections)
    .mul();
console.log(monkey_business);