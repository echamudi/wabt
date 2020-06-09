/*
 * Copyright 2016 WebAssembly Community Group participants
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var examples = [
  {
    name: 'empty',
    contents: '(module)',
    js: '',
  },

  {
    name: 'simple',
    contents:
`(module
  (memory 1)
 
  (data (offset (i32.const 0))
  	(f64 
      3.14159265358979323846 ;; PI
      1.41421356237309504880 ;; Sqrt of 2
      1.61803398874989484820 ;; Golden Ratio
    )
  )

  (data (offset (i32.const 0x100))
    (i8 253 190 -111 -6)
    (i32 0x89ABCDEF)
    "WXYZ"
  )
  
  (func (export "loadDouble") (param $n i32) (result f64)
    i32.const 8
    local.get $n
    i32.mul
    f64.load offset=0
  )
 
  (func (export "loadByteSigned") (param $n i32) (result i32)
    local.get $n
    i32.load8_s offset=0x100
  )
  
  (func (export "loadByteUnsigned") (param $n i32) (result i32)
    local.get $n
    i32.load8_u offset=0x100
  )
)
`,
    js:
`const wasmInstance = new WebAssembly.Instance(wasmModule, {});
const { loadDouble, loadByteSigned, loadByteUnsigned } = wasmInstance.exports;

console.log("Floats");
console.log(loadDouble(0));
console.log(loadDouble(1));
console.log(loadDouble(2));

console.log("\\nBytes from i8");
console.log(loadByteUnsigned(0));
console.log(loadByteUnsigned(1));
console.log(loadByteSigned(2));
console.log(loadByteSigned(3));

console.log("\\nBytes from i32");
console.log(loadByteUnsigned(4).toString(16));
console.log(loadByteUnsigned(5).toString(16));
console.log(loadByteUnsigned(6).toString(16));
console.log(loadByteUnsigned(7).toString(16));

console.log("\\nBytes from strings");
console.log(String.fromCharCode(loadByteUnsigned(8)));
console.log(String.fromCharCode(loadByteUnsigned(9)));
console.log(String.fromCharCode(loadByteUnsigned(10)));
console.log(String.fromCharCode(loadByteUnsigned(11)));
`,
  },

  {
    name: 'inline',
    contents:
`(module
  (memory (export "mem") 
    (data 
      (i32 -1_000_000 -99 0 99 1_000_000)
      (f32 -0.75 -0.5 0 0.5 0.75)
  	)
  )
)
`,
    js:
`const wasmInstance = new WebAssembly.Instance(wasmModule, {});
const { mem } = wasmInstance.exports;

console.log(new Int32Array(mem.buffer, 0, 5));
console.log(new Float32Array(mem.buffer, 5 * 4, 5));      
`
  }
];
