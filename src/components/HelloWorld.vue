<template>
  <div class="upload-block" @dragover="dragover($event)">
    <div class="upload-list" v-for="(img, index) in uploadList" :key="index" :draggable="true"
                @dragstart="dragstart(img)"
                @dragenter="dragenter(img,$event)"
                @dragend="dragend(img,$event)"
                @dragover="dragover($event)">
        <template v-if="img.status === 'finished'">
            <img :src="img.url" class="image" ref="img">
            <div class="upload-list-cover">
              <div class="upload-action-icons">
                <img src="../../assets/images/delete-icon.png" @click="() => handleRemove(img)" v-if="!disableEdit" class="action-icon delete-icon"/>
                <img src="../../assets/images/pic-view-icon.png" @click="() => handleView(img)" class="action-icon pic-view-icon"/>
              </div>
            </div>
        </template>
        <template v-else>
            <Progress v-if="img.showProgress" :percent="img.percentage" hide-info></Progress>
        </template>
    </div>
    <upload-image
      v-show="showUploadButton"
      ref="upload"
      class="upload-view"
      :show-upload-list="false"
      :default-file-list="owner[imageKey]"
      :on-success="handleSuccess"
      :before-upload="handleBeforeUpload"
      :headers='extraHeaders'
      name="image"
      type="drag"
      multiple
      :action="mediaURL">
        <div class="upload-btn">
            <Icon type="ios-camera" size="20"></Icon>
        </div>
    </upload-image>
    <!-- <picture-preview v-model="visible" :image-list="owner[imageKey]" :image="currentImage"></picture-preview> -->
    <!-- <view-picture></view-picture> -->
  </div>
</template>
<script>
  import { findIndex } from 'lodash'
  import { getCSRFToken, getBaseURL, getImageList } from '../libs/util'
  import Compressor from 'compressorjs'
  import UploadImage from './upload.vue'
  import PicturePreview from './PicturePreview.vue'
  import ViewPicture from './ViewPicture'
  import { getStorage } from '../libs/storage'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        currentImage: null,
        visible: false,
        loaded: false,
        imageUploaded: 0,
        maxSize: 10240,
        format: ['jpg', 'jpeg', 'png'],
        oldData:null,
        newData:null
      }
    },
    components: { PicturePreview, UploadImage,ViewPicture },

    props: {
      owner: {
        type: Object,
      },

      picCount: {
        type: Number,
        default: 1
      },
      disableEdit: {
        type: Boolean,
        default: false
      },
      imageKey: {
        type: String,
        default: 'images',
      },
    },

    computed: {
      extraHeaders () {
        let headers = {
          'from-bo': true,
          'X-CSRF-TOKEN': getCSRFToken()
        }
        const token = getStorage('access_token')
        if (token) {
          headers['Authorization'] = `Bearer ${token}`
        }
        return headers
      },

      uploadList () {
        if (this.loaded) {
          if (
          this.$refs.upload.fileList &&
          this.owner[this.imageKey]&&
          this.$refs.upload.fileList.length&&
          this.$refs.upload.fileList.length !==
            this.owner[this.imageKey].length 
            
        ){
        this.$emit('on-change', this.owner[this.imageKey])
        }
        return  this.$refs.upload.fileList
        } else {
          return []
        }
      },

      showUploadButton () {
        // if (this.disableEdit) {
        //   return false
        // }
        // if (this.loaded) {
        //   return this.$refs.upload.fileList.length < this.picCount
        // }
        return true
      },

      mediaURL () {
        let base = getBaseURL()
        return `${base}/media`
      },
    },
    methods: {
      reset () {
        this.imageUploaded = 0
      },

      handleView (img) {
        this.currentImage = img
        this.visible = true
      },
      handleRemove (file) {
        this.imageUploaded -= 1
        if (!this.owner.image_id_list) {
          this.owner.image_id_list = this.loadOwnerImgID()
        }
        const fileList = this.$refs.upload.fileList
        const imgIdList = this.owner.image_id_list
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
        this.owner.image_id_list.splice(imgIdList.indexOf(file.id), 1)
        let idx = findIndex(this.owner[this.imageKey], (image) => image.id === file.id)
        if (idx !== -1) {
          this.owner[this.imageKey].splice(idx, 1)
        }
        this.$emit('on-change', this.owner[this.imageKey])
      },
      handleSuccess (res, file) {
        if (!this.owner.image_id_list) {
          this.owner.image_id_list = this.loadOwnerImgID()
        }
        file.url = res.media.url
        file.name = res.media.filename
        file.id = res.media.id
        this.owner.image_id_list.push(res.media.id)
        this.owner[this.imageKey].push({
          id: res.media.id,
          url: res.media.url,
          filename: res.media.filename,
        })
        this.$emit('on-change', this.owner[this.imageKey])
      },
      handleBeforeUpload (file) {
        if(!this.imageUploaded){
          this.imageUploaded=this.$refs.upload.fileList.length
        }
        const count_check = this.imageUploaded < this.picCount
        const size_check = file.size <= this.maxSize * 1024
        const file_format = file.name.split('.').pop().toLocaleLowerCase()
        const format_check = this.format.some(item => item.toLocaleLowerCase() === file_format)
        if (!count_check) {
          this.$Notice.warning({
            title: 'Up to ' + this.picCount + ' pictures can be uploaded.'
          })
          return false
        } else if (!size_check) {
          this.$Notice.warning({
            title: 'File is too big',
            desc: 'File ' + file.name + ' is too big, max size is ' + this.maxSize / 1024 + 'M'
          })
          return false
        } else if (!format_check) {
          this.$Notice.warning({
            title: 'Image type not correct',
            desc: `Type of file ${file.name} is not correct, please select jpg or png`,
            duration: 0,
          })
          return false
        } else {
          this.imageUploaded += 1
        }


        var File = window.File
        try {
          new File([], '') // eslint-disable-line
        } catch (e) {
          File = class File extends Blob {
            constructor (chunks, filename, opts = {}) {
              super(chunks, opts)
              this.lastModifiedDate = new Date()
              this.lastModified = +this.lastModifiedDate
              this.name = filename
            }
          }
        }
        // compress image

        return new Promise(resolve => {
          new Compressor(file, {
            quality: 0.5,
            maxWidth: 1000,
            maxHeight: 1000,
            convertSize: 1000000,
            checkOrientation: true,
            success (result) {
              let ret = new File([result], result.name)
              resolve(ret)
            },
            error () {
              resolve(file)
            }
          })
        })
      },
      loadOwnerImgID () {
        return getImageList(this.owner, this.imageKey)
      },
      dragstart(value) {
            this.oldData = value
        },
        dragenter(value, e) {
            this.newData = value
            e.preventDefault()
        },
        dragend() {
          if(!this.disableEdit){
            if (this.oldData !== this.newData) {
                let oldIndex = this.uploadList.indexOf(this.oldData)
                let newIndex = this.uploadList.indexOf(this.newData)
                let newItems = [...this.uploadList]
                let ownerObj = [...this.owner[this.imageKey]]
                // // 删除老的节点
                newItems.splice(oldIndex, 1)
                ownerObj.splice(oldIndex, 1)
                // // 在列表中目标位置增加新的节点
                let addData=this.owner[this.imageKey][oldIndex]
                newItems.splice(newIndex, 0, this.oldData)
                ownerObj.splice(newIndex, 0,addData)

                this.$refs.upload.fileList = [...newItems]
                this.owner[this.imageKey]=[...ownerObj]
                this.loaded = true
            }
            this.$emit('on-change', this.owner[this.imageKey])
          }
            
        },
        dragover(e) {
          if(!this.disableEdit){
            e.preventDefault()
          }
        }

    },

    mounted () {
      this.owner.image_id_list = this.loadOwnerImgID()
      this.loaded = true
    },

    watch: {
      owner () {
        this.owner.image_id_list = this.loadOwnerImgID()
        this.imageUploaded = this.owner.image_id_list.length || 0
      },
    }
  }
</script>

<style scoped lang="less">
  .upload-block {
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
  }

  .upload-btn {
    width: 90px;
    height:90px;
    max-width: 90px;
    max-height: 90px;
    min-width: 90px;
    min-height: 90px;
    line-height: 90px;
  }

  .upload-list {
    display: inline-block;
    width: 90px;
    height: 90px;
    text-align: center;
    line-height: 90px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    margin-right: 24px;
  }
  .upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.5);
  }
  .upload-list:hover .upload-list-cover{
    display: block;
  }
  .upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  .upload-view {
    /deep/ .ivu-upload-drag {
      background: #f9f9f9;
      border: none;
    }
    /deep/ .ivu-upload-drag:hover {
      border: none;
    }
  }
  .image {
    width: 100%;
    height: 100%;
  }
  .upload-action-icons {
    line-height: 45px;
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    .action-icon {
      cursor: pointer;
    }
    .action-icon + .action-icon {
      margin-left: 15px;
    }
    .delete-icon {
      width: 22px;
      height: 20px;
    }
    .pic-view-icon {
      width: 19px;
      height: 19px;
    }
  }
</style>

