var Module=typeof Module!="undefined"?Module:{};var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var ENVIRONMENT_IS_PTHREAD=Module["ENVIRONMENT_IS_PTHREAD"]||false;var _scriptDir=typeof document!="undefined"&&document.currentScript?document.currentScript.src:undefined;if(ENVIRONMENT_IS_WORKER){_scriptDir=self.location.href}else if(ENVIRONMENT_IS_NODE){_scriptDir=__filename}var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",((err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)}))};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}process.on("uncaughtException",(ex=>{if(ex!=="unwind"&&!(ex instanceof ExitStatus)&&!(ex.context instanceof ExitStatus)){throw ex}}));quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow};Module["inspect"]=()=>"[Emscripten Module object]";let nodeWorkerThreads;try{nodeWorkerThreads=require("worker_threads")}catch(e){console.error('The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?');throw e}global.Worker=nodeWorkerThreads.Worker}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}if(!ENVIRONMENT_IS_NODE){read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}if(ENVIRONMENT_IS_NODE){if(typeof performance=="undefined"){global.performance=require("perf_hooks").performance}}var defaultPrint=console.log.bind(console);var defaultPrintErr=console.error.bind(console);if(ENVIRONMENT_IS_NODE){defaultPrint=(...args)=>fs.writeSync(1,args.join(" ")+"\n");defaultPrintErr=(...args)=>fs.writeSync(2,args.join(" ")+"\n")}var out=Module["print"]||defaultPrint;var err=Module["printErr"]||defaultPrintErr;Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var wasmModule;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort(text)}}var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;assert(INITIAL_MEMORY>=65536,"INITIAL_MEMORY should be larger than STACK_SIZE, was "+INITIAL_MEMORY+"! (STACK_SIZE="+65536+")");if(ENVIRONMENT_IS_PTHREAD){wasmMemory=Module["wasmMemory"]}else{if(Module["wasmMemory"]){wasmMemory=Module["wasmMemory"]}else{wasmMemory=new WebAssembly.Memory({"initial":INITIAL_MEMORY/65536,"maximum":INITIAL_MEMORY/65536,"shared":true});if(!(wasmMemory.buffer instanceof SharedArrayBuffer)){err("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag");if(ENVIRONMENT_IS_NODE){err("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)")}throw Error("bad memory")}}}updateMemoryViews();INITIAL_MEMORY=wasmMemory.buffer.byteLength;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;if(ENVIRONMENT_IS_PTHREAD)return;callRuntimeCallbacks(__ATINIT__)}function preMain(){if(ENVIRONMENT_IS_PTHREAD)return;callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(ENVIRONMENT_IS_PTHREAD)return;if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="chess.wasm";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(binaryFile)){return fetch(binaryFile,{credentials:"same-origin"}).then((response=>{if(!response["ok"]){throw"failed to load wasm binary file at '"+binaryFile+"'"}return response["arrayBuffer"]()})).catch((()=>getBinarySync(binaryFile)))}else if(readAsync){return new Promise(((resolve,reject)=>{readAsync(binaryFile,(response=>resolve(new Uint8Array(response))),reject)}))}}return Promise.resolve().then((()=>getBinarySync(binaryFile)))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then((binary=>WebAssembly.instantiate(binary,imports))).then((instance=>instance)).then(receiver,(reason=>{err("failed to asynchronously prepare wasm: "+reason);abort(reason)}))}function instantiateAsync(binary,binaryFile,imports,callback){if(!binary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(binaryFile)&&!isFileURI(binaryFile)&&!ENVIRONMENT_IS_NODE&&typeof fetch=="function"){return fetch(binaryFile,{credentials:"same-origin"}).then((response=>{var result=WebAssembly.instantiateStreaming(response,imports);return result.then(callback,(function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(binaryFile,imports,callback)}))}))}return instantiateArrayBuffer(binaryFile,imports,callback)}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;registerTLSInit(Module["asm"]["y"]);wasmTable=Module["asm"]["x"];addOnInit(Module["asm"]["s"]);wasmModule=module;removeRunDependency("wasm-instantiate");return exports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"],result["module"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var terminateWorker=function(worker){worker.terminate();worker.onmessage=e=>{}};function killThread(pthread_ptr){var worker=PThread.pthreads[pthread_ptr];delete PThread.pthreads[pthread_ptr];terminateWorker(worker);__emscripten_thread_free_data(pthread_ptr);PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(worker),1);worker.pthread_ptr=0}function cancelThread(pthread_ptr){var worker=PThread.pthreads[pthread_ptr];worker.postMessage({"cmd":"cancel"})}function cleanupThread(pthread_ptr){var worker=PThread.pthreads[pthread_ptr];assert(worker);PThread.returnWorkerToPool(worker)}function spawnThread(threadParams){var worker=PThread.getNewWorker();if(!worker){return 6}PThread.runningWorkers.push(worker);PThread.pthreads[threadParams.pthread_ptr]=worker;worker.pthread_ptr=threadParams.pthread_ptr;var msg={"cmd":"run","start_routine":threadParams.startRoutine,"arg":threadParams.arg,"pthread_ptr":threadParams.pthread_ptr};if(ENVIRONMENT_IS_NODE){worker.unref()}worker.postMessage(msg,threadParams.transferList);return 0}var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.buffer instanceof SharedArrayBuffer?heapOrArray.slice(idx,endPtr):heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var SYSCALLS={varargs:undefined,get(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr(ptr){var ret=UTF8ToString(ptr);return ret}};function _proc_exit(code){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(1,1,code);EXITSTATUS=code;if(!keepRuntimeAlive()){PThread.terminateAllThreads();if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}var exitJS=(status,implicit)=>{EXITSTATUS=status;if(ENVIRONMENT_IS_PTHREAD){exitOnMainThread(status);throw"unwind"}_proc_exit(status)};var _exit=exitJS;var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var PThread={unusedWorkers:[],runningWorkers:[],tlsInitFunctions:[],pthreads:{},init:function(){if(ENVIRONMENT_IS_PTHREAD){PThread.initWorker()}else{PThread.initMainThread()}},initMainThread:function(){var pthreadPoolSize=8;while(pthreadPoolSize--){PThread.allocateUnusedWorker()}addOnPreRun((()=>{addRunDependency("loading-workers");PThread.loadWasmModuleToAllWorkers((()=>removeRunDependency("loading-workers")))}))},initWorker:function(){noExitRuntime=false},setExitStatus:function(status){EXITSTATUS=status},terminateAllThreads__deps:["$terminateWorker"],terminateAllThreads:function(){for(var worker of PThread.runningWorkers){terminateWorker(worker)}for(var worker of PThread.unusedWorkers){terminateWorker(worker)}PThread.unusedWorkers=[];PThread.runningWorkers=[];PThread.pthreads=[]},returnWorkerToPool:function(worker){var pthread_ptr=worker.pthread_ptr;delete PThread.pthreads[pthread_ptr];PThread.unusedWorkers.push(worker);PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(worker),1);worker.pthread_ptr=0;__emscripten_thread_free_data(pthread_ptr)},receiveObjectTransfer:function(data){},threadInitTLS:function(){PThread.tlsInitFunctions.forEach((f=>f()))},loadWasmModuleToWorker:worker=>new Promise((onFinishedLoading=>{worker.onmessage=e=>{var d=e["data"];var cmd=d["cmd"];if(d["targetThread"]&&d["targetThread"]!=_pthread_self()){var targetWorker=PThread.pthreads[d.targetThread];if(targetWorker){targetWorker.postMessage(d,d["transferList"])}else{err('Internal error! Worker sent a message "'+cmd+'" to target pthread '+d["targetThread"]+", but that thread no longer exists!")}return}if(cmd==="checkMailbox"){checkMailbox()}else if(cmd==="spawnThread"){spawnThread(d)}else if(cmd==="cleanupThread"){cleanupThread(d["thread"])}else if(cmd==="killThread"){killThread(d["thread"])}else if(cmd==="cancelThread"){cancelThread(d["thread"])}else if(cmd==="loaded"){worker.loaded=true;if(ENVIRONMENT_IS_NODE&&!worker.pthread_ptr){worker.unref()}onFinishedLoading(worker)}else if(cmd==="alert"){alert("Thread "+d["threadId"]+": "+d["text"])}else if(d.target==="setimmediate"){worker.postMessage(d)}else if(cmd==="callHandler"){Module[d["handler"]](...d["args"])}else if(cmd){err("worker sent an unknown command "+cmd)}};worker.onerror=e=>{var message="worker sent an error!";err(message+" "+e.filename+":"+e.lineno+": "+e.message);throw e};if(ENVIRONMENT_IS_NODE){worker.on("message",(function(data){worker.onmessage({data:data})}));worker.on("error",(function(e){worker.onerror(e)}))}var handlers=[];var knownHandlers=["onExit","onAbort","print","printErr"];for(var handler of knownHandlers){if(Module.hasOwnProperty(handler)){handlers.push(handler)}}worker.postMessage({"cmd":"load","handlers":handlers,"urlOrBlob":Module["mainScriptUrlOrBlob"]||_scriptDir,"wasmMemory":wasmMemory,"wasmModule":wasmModule})})),loadWasmModuleToAllWorkers:function(onMaybeReady){if(ENVIRONMENT_IS_PTHREAD){return onMaybeReady()}let pthreadPoolReady=Promise.all(PThread.unusedWorkers.map(PThread.loadWasmModuleToWorker));pthreadPoolReady.then(onMaybeReady)},allocateUnusedWorker:function(){var worker;var pthreadMainJs=locateFile("chess.worker.js");worker=new Worker(pthreadMainJs);PThread.unusedWorkers.push(worker)},getNewWorker:function(){if(PThread.unusedWorkers.length==0){PThread.allocateUnusedWorker();PThread.loadWasmModuleToWorker(PThread.unusedWorkers[0])}return PThread.unusedWorkers.pop()}};Module["PThread"]=PThread;var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};function establishStackSpace(){var pthread_ptr=_pthread_self();var stackHigh=HEAP32[pthread_ptr+52>>2];var stackSize=HEAP32[pthread_ptr+56>>2];var stackLow=stackHigh-stackSize;_emscripten_stack_set_limits(stackHigh,stackLow);stackRestore(stackHigh)}Module["establishStackSpace"]=establishStackSpace;function exitOnMainThread(returnCode){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(2,0,returnCode);_exit(returnCode)}var wasmTableMirror=[];var getWasmTableEntry=funcPtr=>{var func=wasmTableMirror[funcPtr];if(!func){if(funcPtr>=wasmTableMirror.length)wasmTableMirror.length=funcPtr+1;wasmTableMirror[funcPtr]=func=wasmTable.get(funcPtr)}return func};function invokeEntryPoint(ptr,arg){var result=getWasmTableEntry(ptr)(arg);function finish(result){if(keepRuntimeAlive()){PThread.setExitStatus(result)}else{__emscripten_thread_exit(result)}}finish(result)}Module["invokeEntryPoint"]=invokeEntryPoint;function registerTLSInit(tlsInitFunc){PThread.tlsInitFunctions.push(tlsInitFunc)}function ___emscripten_init_main_thread_js(tb){__emscripten_thread_init(tb,!ENVIRONMENT_IS_WORKER,1,!ENVIRONMENT_IS_WEB,65536);PThread.threadInitTLS()}function ___emscripten_thread_cleanup(thread){if(!ENVIRONMENT_IS_PTHREAD)cleanupThread(thread);else postMessage({"cmd":"cleanupThread","thread":thread})}function pthreadCreateProxied(pthread_ptr,attr,startRoutine,arg){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(3,1,pthread_ptr,attr,startRoutine,arg);return ___pthread_create_js(pthread_ptr,attr,startRoutine,arg)}function ___pthread_create_js(pthread_ptr,attr,startRoutine,arg){if(typeof SharedArrayBuffer=="undefined"){err("Current environment does not support SharedArrayBuffer, pthreads are not available!");return 6}var transferList=[];var error=0;if(ENVIRONMENT_IS_PTHREAD&&(transferList.length===0||error)){return pthreadCreateProxied(pthread_ptr,attr,startRoutine,arg)}if(error)return error;var threadParams={startRoutine:startRoutine,pthread_ptr:pthread_ptr,arg:arg,transferList:transferList};if(ENVIRONMENT_IS_PTHREAD){threadParams.cmd="spawnThread";postMessage(threadParams,transferList);return 0}return spawnThread(threadParams)}var maybeExit=()=>{if(!keepRuntimeAlive()){try{if(ENVIRONMENT_IS_PTHREAD)__emscripten_thread_exit(EXITSTATUS);else _exit(EXITSTATUS)}catch(e){handleException(e)}}};var callUserCallback=func=>{if(ABORT){return}try{func();maybeExit()}catch(e){handleException(e)}};function __emscripten_thread_mailbox_await(pthread_ptr){if(typeof Atomics.waitAsync==="function"){var wait=Atomics.waitAsync(HEAP32,pthread_ptr>>2,pthread_ptr);wait.value.then(checkMailbox);var waitingAsync=pthread_ptr+128;Atomics.store(HEAP32,waitingAsync>>2,1)}}Module["__emscripten_thread_mailbox_await"]=__emscripten_thread_mailbox_await;var checkMailbox=function(){var pthread_ptr=_pthread_self();if(pthread_ptr){__emscripten_thread_mailbox_await(pthread_ptr);callUserCallback((()=>__emscripten_check_mailbox()))}};Module["checkMailbox"]=checkMailbox;var __emscripten_notify_mailbox_postmessage=function(targetThreadId,currThreadId,mainThreadId){if(targetThreadId==currThreadId){setTimeout((()=>checkMailbox()))}else if(ENVIRONMENT_IS_PTHREAD){postMessage({"targetThread":targetThreadId,"cmd":"checkMailbox"})}else{var worker=PThread.pthreads[targetThreadId];if(!worker){return}worker.postMessage({"cmd":"checkMailbox"})}};function __emscripten_set_offscreencanvas_size(target,width,height){return-1}function __emscripten_thread_set_strongref(thread){if(ENVIRONMENT_IS_NODE){PThread.pthreads[thread].ref()}}var warnOnce=text=>{if(!warnOnce.shown)warnOnce.shown={};if(!warnOnce.shown[text]){warnOnce.shown[text]=1;if(ENVIRONMENT_IS_NODE)text="warning: "+text;err(text)}};function _emscripten_check_blocking_allowed(){}function _emscripten_date_now(){return Date.now()}var runtimeKeepalivePush=()=>{runtimeKeepaliveCounter+=1};var _emscripten_exit_with_live_runtime=()=>{runtimeKeepalivePush();throw"unwind"};var _emscripten_get_now;_emscripten_get_now=()=>performance.timeOrigin+performance.now();var withStackSave=f=>{var stack=stackSave();var ret=f();stackRestore(stack);return ret};var proxyToMainThread=function(index,sync){var numCallArgs=arguments.length-2;var outerArgs=arguments;return withStackSave((()=>{var serializedNumCallArgs=numCallArgs;var args=stackAlloc(serializedNumCallArgs*8);var b=args>>3;for(var i=0;i<numCallArgs;i++){var arg=outerArgs[2+i];HEAPF64[b+i]=arg}return __emscripten_run_in_main_runtime_thread_js(index,serializedNumCallArgs,args,sync)}))};var emscripten_receive_on_main_thread_js_callArgs=[];function _emscripten_receive_on_main_thread_js(index,callingThread,numCallArgs,args){PThread.currentProxiedOperationCallerThread=callingThread;emscripten_receive_on_main_thread_js_callArgs.length=numCallArgs;var b=args>>3;for(var i=0;i<numCallArgs;i++){emscripten_receive_on_main_thread_js_callArgs[i]=HEAPF64[b+i]}var func=proxiedFunctionTable[index];return func.apply(null,emscripten_receive_on_main_thread_js_callArgs)}var abortOnCannotGrowMemory=requestedSize=>{abort("OOM")};var _emscripten_resize_heap=requestedSize=>{var oldSize=HEAPU8.length;requestedSize>>>=0;abortOnCannotGrowMemory(requestedSize)};function _emscripten_unwind_to_js_event_loop(){throw"unwind"}var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};function _fd_write(fd,iov,iovcnt,pnum){if(ENVIRONMENT_IS_PTHREAD)return proxyToMainThread(4,1,fd,iov,iovcnt,pnum);var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0}var setErrNo=value=>{HEAP32[___errno_location()>>2]=value;return value};var _system=command=>{if(ENVIRONMENT_IS_NODE){if(!command)return 1;var cmdstr=UTF8ToString(command);if(!cmdstr.length)return 0;var cp=require("child_process");var ret=cp.spawnSync(cmdstr,[],{shell:true,stdio:"inherit"});var _W_EXITCODE=(ret,sig)=>ret<<8|sig;if(ret.status===null){var signalToNumber=sig=>{switch(sig){case"SIGHUP":return 1;case"SIGINT":return 2;case"SIGQUIT":return 3;case"SIGFPE":return 8;case"SIGKILL":return 9;case"SIGALRM":return 14;case"SIGTERM":return 15}return 2};return _W_EXITCODE(0,signalToNumber(ret.signal))}return _W_EXITCODE(ret.status,0)}if(!command)return 0;setErrNo(52);return-1};function getCFunc(ident){var func=Module["_"+ident];return func}var writeArrayToMemory=(array,buffer)=>{HEAP8.set(array,buffer)};var lengthBytesUTF8=str=>{var len=0;for(var i=0;i<str.length;++i){var c=str.charCodeAt(i);if(c<=127){len++}else if(c<=2047){len+=2}else if(c>=55296&&c<=57343){len+=4;++i}else{len+=3}}return len};var stringToUTF8Array=(str,heap,outIdx,maxBytesToWrite)=>{if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}}heap[outIdx]=0;return outIdx-startIdx};var stringToUTF8=(str,outPtr,maxBytesToWrite)=>stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite);var stringToUTF8OnStack=str=>{var size=lengthBytesUTF8(str)+1;var ret=stackAlloc(size);stringToUTF8(str,ret,size);return ret};var ccall=function(ident,returnType,argTypes,args,opts){var toC={"string":str=>{var ret=0;if(str!==null&&str!==undefined&&str!==0){ret=stringToUTF8OnStack(str)}return ret},"array":arr=>{var ret=stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}};function convertReturnValue(ret){if(returnType==="string"){return UTF8ToString(ret)}if(returnType==="boolean")return Boolean(ret);return ret}var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);function onDone(ret){if(stack!==0)stackRestore(stack);return convertReturnValue(ret)}ret=onDone(ret);return ret};Module["ccall"]=ccall;PThread.init();var proxiedFunctionTable=[null,_proc_exit,exitOnMainThread,pthreadCreateProxied,_fd_write];var wasmImports={h:___emscripten_init_main_thread_js,e:___emscripten_thread_cleanup,p:___pthread_create_js,n:__emscripten_notify_mailbox_postmessage,j:__emscripten_set_offscreencanvas_size,g:__emscripten_thread_mailbox_await,l:__emscripten_thread_set_strongref,q:_emscripten_check_blocking_allowed,c:_emscripten_date_now,k:_emscripten_exit_with_live_runtime,b:_emscripten_get_now,i:_emscripten_receive_on_main_thread_js,m:_emscripten_resize_heap,o:_emscripten_unwind_to_js_event_loop,f:_exit,d:_fd_write,a:wasmMemory,r:_system};var asm=createWasm();var ___wasm_call_ctors=function(){return(___wasm_call_ctors=Module["asm"]["s"]).apply(null,arguments)};var _malloc=Module["_malloc"]=function(){return(_malloc=Module["_malloc"]=Module["asm"]["t"]).apply(null,arguments)};var _free=Module["_free"]=function(){return(_free=Module["_free"]=Module["asm"]["u"]).apply(null,arguments)};var _input=Module["_input"]=function(){return(_input=Module["_input"]=Module["asm"]["v"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["w"]).apply(null,arguments)};var __emscripten_tls_init=Module["__emscripten_tls_init"]=function(){return(__emscripten_tls_init=Module["__emscripten_tls_init"]=Module["asm"]["y"]).apply(null,arguments)};var _pthread_self=Module["_pthread_self"]=function(){return(_pthread_self=Module["_pthread_self"]=Module["asm"]["z"]).apply(null,arguments)};var ___errno_location=function(){return(___errno_location=Module["asm"]["A"]).apply(null,arguments)};var __emscripten_thread_init=Module["__emscripten_thread_init"]=function(){return(__emscripten_thread_init=Module["__emscripten_thread_init"]=Module["asm"]["B"]).apply(null,arguments)};var __emscripten_thread_crashed=Module["__emscripten_thread_crashed"]=function(){return(__emscripten_thread_crashed=Module["__emscripten_thread_crashed"]=Module["asm"]["C"]).apply(null,arguments)};var _emscripten_main_thread_process_queued_calls=function(){return(_emscripten_main_thread_process_queued_calls=Module["asm"]["emscripten_main_thread_process_queued_calls"]).apply(null,arguments)};var _emscripten_main_runtime_thread_id=function(){return(_emscripten_main_runtime_thread_id=Module["asm"]["emscripten_main_runtime_thread_id"]).apply(null,arguments)};var __emscripten_run_in_main_runtime_thread_js=function(){return(__emscripten_run_in_main_runtime_thread_js=Module["asm"]["D"]).apply(null,arguments)};var _emscripten_dispatch_to_thread_=function(){return(_emscripten_dispatch_to_thread_=Module["asm"]["emscripten_dispatch_to_thread_"]).apply(null,arguments)};var __emscripten_thread_free_data=function(){return(__emscripten_thread_free_data=Module["asm"]["E"]).apply(null,arguments)};var __emscripten_thread_exit=Module["__emscripten_thread_exit"]=function(){return(__emscripten_thread_exit=Module["__emscripten_thread_exit"]=Module["asm"]["F"]).apply(null,arguments)};var __emscripten_check_mailbox=Module["__emscripten_check_mailbox"]=function(){return(__emscripten_check_mailbox=Module["__emscripten_check_mailbox"]=Module["asm"]["G"]).apply(null,arguments)};var _emscripten_stack_set_limits=function(){return(_emscripten_stack_set_limits=Module["asm"]["H"]).apply(null,arguments)};var stackSave=function(){return(stackSave=Module["asm"]["I"]).apply(null,arguments)};var stackRestore=function(){return(stackRestore=Module["asm"]["J"]).apply(null,arguments)};var stackAlloc=function(){return(stackAlloc=Module["asm"]["K"]).apply(null,arguments)};Module["keepRuntimeAlive"]=keepRuntimeAlive;Module["wasmMemory"]=wasmMemory;Module["ccall"]=ccall;Module["ExitStatus"]=ExitStatus;var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}if(ENVIRONMENT_IS_PTHREAD){initRuntime();startWorker(Module);return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout((function(){setTimeout((function(){Module["setStatus"]("")}),1);doRun()}),1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
