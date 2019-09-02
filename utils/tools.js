module.exports = {
    /**
     * @desc 深拷贝
     */
    extend: (target, source) => {
        for (var obj in source) {
            target[obj] = source[obj]
        }
        return target
    }
}