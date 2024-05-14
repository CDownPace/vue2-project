<template>
    <div :class="[prefixCls]">
      <div
          :class="classes"
          @click="handleClick"
          @drop.prevent="onDrop"
          @paste="handlePaste"
          @dragover.prevent="dragOver = true"
          @dragleave.prevent="dragOver = false">
        <input
            ref="input"
            type="file"
            :class="[prefixCls + '-input']"
            @change="handleChange"
            :multiple="multiple"
            :accept="accept">
        <slot></slot>
      </div>
      <slot name="tip"></slot>
    </div>
  </template>
  <script>
    function broadcast (componentName, eventName, params) {
      this.$children.forEach(child => {
        const name = child.$options.name
  
        if (name === componentName) {
          child.$emit.apply(child, [eventName].concat(params))
        } else {
          broadcast.apply(child, [componentName, eventName].concat([params]))
        }
      })
    }
  
    function getError (action, option, xhr) {
      const msg = `fail to post ${action} ${xhr.status}'`
      const err = new Error(msg)
      err.status = xhr.status
      err.method = 'post'
      err.url = action
      return err
    }
  
    function getBody (xhr) {
      const text = xhr.responseText || xhr.response
      if (!text) {
        return text
      }
  
      try {
        return JSON.parse(text)
      } catch (e) {
        return text
      }
    }
  
    function ajax (option) {
      if (typeof XMLHttpRequest === 'undefined') {
        return
      }
  
      const xhr = new XMLHttpRequest()
      const action = option.action
  
      if (xhr.upload) {
        xhr.upload.onprogress = function progress (e) {
          if (e.total > 0) {
            e.percent = e.loaded / e.total * 100
          }
          option.onProgress(e)
        }
      }
  
      const formData = new FormData()
  
      if (option.data) {
        Object.keys(option.data).map(key => {
          formData.append(key, option.data[key])
        })
      }
      formData.append(option.name, option.file, option.filename)
  
      xhr.onerror = function error (e) {
        option.onError(e)
      }
  
      xhr.onload = function onload () {
        if (xhr.status < 200 || xhr.status >= 300) {
          return option.onError(getError(action, option, xhr), getBody(xhr))
        }
  
        option.onSuccess(getBody(xhr))
      }
  
      xhr.open('post', action, true)
  
      if (option.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true
      }
  
      const headers = option.headers || {}
  
      for (let item in headers) {
        if (headers.hasOwnProperty(item) && headers[item] !== null) {
          xhr.setRequestHeader(item, headers[item])
        }
      }
      xhr.send(formData)
    }
  
  
    function oneOf (value, validList) {
      for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
          return true
        }
      }
      return false
    }
  
    const prefixCls = 'ivu-upload'
  
    export default {
      name: 'Upload',
      props: {
        action: {
          type: String,
          required: true
        },
        headers: {
          type: Object,
          default () {
            return {}
          }
        },
        multiple: {
          type: Boolean,
          default: true
        },
        data: {
          type: Object
        },
        name: {
          type: String,
          default: 'file'
        },
        withCredentials: {
          type: Boolean,
          default: false
        },
        showUploadList: {
          type: Boolean,
          default: true
        },
        type: {
          type: String,
          validator (value) {
            return oneOf(value, ['select', 'drag'])
          },
          default: 'select'
        },
        format: {
          type: Array,
          default () {
            return []
          }
        },
        accept: {
          type: String
        },
        maxSize: {
          type: Number
        },
        beforeUpload: Function,
        onProgress: {
          type: Function,
          default () {
            return {}
          }
        },
        onSuccess: {
          type: Function,
          default () {
            return {}
          }
        },
        onError: {
          type: Function,
          default () {
            return {}
          }
        },
        onRemove: {
          type: Function,
          default () {
            return {}
          }
        },
        onPreview: {
          type: Function,
          default () {
            return {}
          }
        },
        onExceededSize: {
          type: Function,
          default () {
            return {}
          }
        },
        onFormatError: {
          type: Function,
          default () {
            return {}
          }
        },
        defaultFileList: {
          type: Array,
          default () {
            return []
          }
        },
        paste: {
          type: Boolean,
          default: false
        },
        disabled: {
          type: Boolean,
          default: false
        }
      },
      data () {
        return {
          prefixCls: prefixCls,
          dragOver: false,
          fileList: [],
          tempIndex: 1,
          newFileList:[]
        }
      },
      computed: {
        classes () {
          return [
            `${prefixCls}`,
            {
              [`${prefixCls}-select`]: this.type === 'select',
              [`${prefixCls}-drag`]: this.type === 'drag',
              [`${prefixCls}-dragOver`]: this.type === 'drag' && this.dragOver
            }
          ]
        },
  
      },
      methods: {
  
        dispatch (componentName, eventName, params) {
          let parent = this.$parent || this.$root
          let name = parent.$options.name
  
          while (parent && (!name || name !== componentName)) {
            parent = parent.$parent
  
            if (parent) {
              name = parent.$options.name
            }
          }
          if (parent) {
            parent.$emit.apply(parent, [eventName].concat(params))
          }
        },
        broadcast (componentName, eventName, params) {
          broadcast.call(this, componentName, eventName, params)
        },
        handleClick () {
          if (this.disabled) return
          this.$refs.input.click()
        },
        handleChange (e) {
          const files = e.target.files
  
          if (!files) {
            return
          }
          this.uploadFiles(files)
          this.$refs.input.value = null
        },
        onDrop (e) {
          this.dragOver = false
          if (this.disabled) return
          this.uploadFiles(e.dataTransfer.files)
        },
        handlePaste (e) {
          if (this.disabled) return
          if (this.paste) {
            this.uploadFiles(e.clipboardData.files)
          }
        },
        uploadFiles (files) {
          let postFiles = Array.prototype.slice.call(files)
          if (!this.multiple) postFiles = postFiles.slice(0, 1)
  
          if (postFiles.length === 0) return
  
          postFiles.forEach(file => {
            this.upload(file)
          })
        },
        upload (file) {
          if (!this.beforeUpload) {
            return this.post(file)
          }
  
          const before = this.beforeUpload(file)
          if (before && before.then) {
            before.then(processedFile => {
              if (Object.prototype.toString.call(processedFile) === '[object File]' || Object.prototype.toString.call(processedFile) === '[object Blob]') {
                this.post(processedFile)
              } else {
                this.post(file)
              }
            }, () => {
              // this.$emit('cancel', file);
            })
          } else if (before !== false) {
            this.post(file)
          } else {
            // this.$emit('cancel', file);
          }
        },
        post (file) {
            console.log('file---',file)
          // check format
          if (this.format.length) {
            const _file_format = file.name.split('.').pop().toLocaleLowerCase()
            const checked = this.format.some(item => item.toLocaleLowerCase() === _file_format)
            if (!checked) {
              this.onFormatError(file, this.fileList)
              return false
            }
          }
  
          // check maxSize
          if (this.maxSize) {
            if (file.size > this.maxSize * 1024) {
              this.onExceededSize(file, this.fileList)
              return false
            }
          }
  
          // this.handleStart(file)
          let formData = new FormData()
          formData.append(this.name, file)
  
        //   ajax({
        //     headers: this.headers,
        //     withCredentials: this.withCredentials,
        //     file: file,
        //     data: this.data,
        //     name: this.name,
        //     filename: file.name,
        //     action: this.action,
        //     onProgress: e => {
        //       this.handleProgress(e, file)
        //     },
        //     onSuccess: res => {
        //       this.handleSuccess(res, file)
        //     },
        //     onError: (err, response) => {
        //       this.handleError(err, response, file)
        //     }
        //   })

          let res = [{
    "media": {
        "filename": "6e1bf8c5c261474685d0c698524ff66e.jpeg",
        "id": 1,
        "index": [],
        "url": "https://t9.baidu.com/it/u=2108656807,558689175&fm=217&app=126&size=f242,150&n=0&f=JPEG&fmt=auto?s=E6F417C287B08C724841C10F000030C3&sec=1715792400&t=b1769c70594973ab7b4ea10f0c0f8abb"
    },
    "success": true
},{
    "media": {
        "filename": "6e1bf8c5c261474685d0c698524ff66e.jpeg",
        "id": 2,
        "index": [],
        "url": "https://t8.baidu.com/it/u=2353568560,3414575950&fm=217&app=126&size=f242,150&n=0&f=JPEG&fmt=auto?s=6FA7376259E56615CE8F8044030070EB&sec=1715792400&t=2dfd686bfa1cdf5e2cc91f06ed20724b"
    },
    "success": true
},{
    "media": {
        "filename": "6e1bf8c5c261474685d0c698524ff66e.jpeg",
        "id": 3,
        "index": [],
        "url": "https://t9.baidu.com/it/u=2108656807,558689175&fm=217&app=126&size=f242,150&n=0&f=JPEG&fmt=auto?s=E6F417C287B08C724841C10F000030C3&sec=1715792400&t=b1769c70594973ab7b4ea10f0c0f8abb"
    },
    "success": true
},{
    "media": {
        "filename": "6e1bf8c5c261474685d0c698524ff66e.jpeg",
        "id": 4,
        "index": [],
        "url": "https://gimg3.baidu.com/search/src=http%3A%2F%2Fgips2.baidu.com%2Fit%2Fu%3D1114040277%2C3818304222%26fm%3D3030%26app%3D3030%26f%3DJPEG%3Fw%3D200%26h%3D133%26s%3D7097C63A84B17F8847EC4DC60300C0B2&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f242,150&n=0&g=0n&q=100&fmt=auto?sec=1715792400&t=c5010e62eb7b6af34d31a3067d669ee9"
    },
    "success": true
},{
    "media": {
        "filename": "6e1bf8c5c261474685d0c698524ff66e.jpeg",
        "id": 5,
        "index": [],
        "url": "https://t7.baidu.com/it/u=289561454,1721674856&fm=217&app=126&size=f242,150&n=0&f=JPEG&fmt=auto?s=88215D300B0B4049447024D90300C0B2&sec=1715792400&t=d71f30df7be65ea0588b01acbe1a3369"
    },
    "success": true
}]
    let fileDate =[{
    "uid": 1715670587571,
    lastModified: 1715670587249,
    name:'下载 (1).jpeg',
    size: 15660
},{
    "uid": 1715670587572,
    lastModified: 1715670587249,
    name:'下载 (2).jpeg',
    size: 15660
},{
    "uid": 1715670587573,
    lastModified: 1715670587249,
    name:'下载 (3).jpeg',
    size: 15660
},{
    "uid": 1715670587574,
    lastModified: 1715670587249,
    name:'下载 (4).jpeg',
    size: 15660
},{
    "uid": 1715670587575,
    lastModified: 1715670587249,
    name:'下载 (5).jpeg',
    size: 15660
}]
let i = Math.floor(Math.random() * 5) + 1;
this.handleSuccess(res[i], fileDate[i])
        },
        handleStart (file) {
          file.uid = Date.now() + this.tempIndex++
          const _file = {
            status: 'uploading',
            name: file.name,
            size: file.size,
            percentage: 0,
            uid: file.uid,
            showProgress: true
          }
          this.fileList.push(_file)
          this.newFileList=JSON.parse(JSON.stringify(this.fileList))
        },
      getFile(file) {
          this.handleStart(file)
          const fileList = this.newFileList;
          let target;
          fileList.forEach((item) => {
            if (file.uid === item.uid) {
              target = item;
            }
          });
          return target;
      },
        handleProgress (e, file) {
          const _file = this.getFile(file)
          if(_file==undefined){
            return
          }
          this.onProgress(e, _file, this.fileList)
          _file.percentage?_file.percentage = (e.percent || 0):0
        },
        handleSuccess (res, file) {
          const _file = this.getFile(file)
  
          if (_file) {
            _file.status = 'finished'
            _file.response = res
  
            this.onSuccess(res, _file, this.fileList)
            this.dispatch('FormItem', 'on-form-change', _file)
  
            setTimeout(() => {
              _file.showProgress = false
            }, 1000)
          }
        },
        handleError (err, response, file) {
          const _file = this.getFile(file)
          const fileList = this.fileList
  
          _file.status = 'fail'
  
          fileList.splice(fileList.indexOf(_file), 1)
  
          this.onError(err, response, file)
        },
        handleRemove (file) {
          const fileList = this.fileList
          fileList.splice(fileList.indexOf(file), 1)
          this.onRemove(file, fileList)
        },
        handlePreview (file) {
          if (file.status === 'finished') {
            this.onPreview(file)
          }
        },
        clearFiles () {
          this.fileList = []
        }
      },
      watch: {
        defaultFileList: {
          immediate: true,
          handler (fileList) {
            this.fileList = fileList.map(item => {
              item.status = 'finished'
              item.percentage = 100
              item.uid = Date.now() + this.tempIndex++
              return item
            })
            return this.fileList
          }
        }
      },
    }
  </script>
  