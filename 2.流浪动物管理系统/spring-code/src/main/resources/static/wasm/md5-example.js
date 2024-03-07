let _module; // 保存 wasm 模块对象

// wasm 胶水代码导出一个 wasm 对象为 Promise
window.WasmModule().then((module) => {
    _module = module;
});

// 处理文件读取
const getMd5 = (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        let buffer;

        if (file) {
            reader.readAsArrayBuffer(file);
        }
        reader.onloadend = function (event) {
            buffer = event.target.result;
            // wasm 模块分配内存,大小为文件 buffer 的字节
            const pr = _module._malloc(buffer.length);

            // 在 wasm 内存中，从 pr 偏移到 pr + buffer.byteLength 写入 buffer
            const tyarr = new Uint8Array(buffer);
            for (let i = 0; i < buffer.byteLength; i++) {
                _module.HEAP8[pr + i] = tyarr[i];
            }

            // buffer 转化为字符串, 每个字符占一个字节
            const ab2str = function (buf) {
                return String.fromCharCode.apply(null, new Uint8Array(buf));
            };

            // 输出文件内容 md5 的结果
            const md5pr = _module._getMd5(pr);
            const md5 = ab2str(_module.HEAP8.slice(md5pr, md5pr + 64));

            resolve(md5)

            // 最后释放内存
            _module._free(pr);
        };
    })
};
