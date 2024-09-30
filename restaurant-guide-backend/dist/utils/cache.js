"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cache {
    constructor(ttl) {
        this.store = new Map();
        this.ttl = ttl;
    }
    set(key, data) {
        const entry = {
            data,
            timestamp: Date.now(),
        };
        this.store.set(key, entry);
    }
    get(key) {
        const entry = this.store.get(key);
        if (!entry)
            return null;
        if (Date.now() - entry.timestamp > this.ttl) {
            this.store.delete(key);
            return null;
        }
        return entry.data;
    }
    clear() {
        this.store.clear();
    }
}
exports.default = Cache;
