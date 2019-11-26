console.log('Here we are.');

import { saferead } from './util/saferead'

let s = {} as any
let t = saferead(() => s.a.b.c.d)

console.log('read property from s:s.a.b.c.d:', t)










debugger