<template>
    <Modal 
    footer-hide
    :closable="false"
    v-model="visible"
    :mask-closable="true"
    transfer>
      <div class="pic-wrapper"  >
        <div class="current-image" >
          <div class="img-box">
            <img :src="getUrlRes(currentImage.url)" @click.stop :style="{transform:'rotateZ('+resultDeg+'deg)'}" ref="img">
          </div>
          <p class="des" v-if="description">{{ $t('situation_description') }}: {{ description }}</p>
        </div>
        <div class="wrap">
          <img src="../../assets/images/pic-left.png"
              v-if="previousPicture !== null" class="pic-left"
              @click.stop="() => toPreviousPicture()"/>
          <div class="action-pic-placeholder left" v-else></div>
          <div class="rotate"  @click.stop="() =>rotate()">
            <img src="../../assets/images/rotate.png" alt="">
          </div>
          <img src="../../assets/images/pic-right.png" class="pic-right"
              v-if="nextPicture !== null" @click.stop="() => toNextPicture()"/>
          <div class="action-pic-placeholder right" v-else></div>
        </div>
  
      </div>
    </Modal>
  </template>
  
  <script>
  import { ImageAddTokenMixin } from "../mixins/imgAddTokenMixin";
  import { Modal } from 'view-design'
  export default {
    name: 'PicturePreview',
    mixins: [ImageAddTokenMixin],
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      imageList: {
        type: Array,
        default: () => [],
      },
      image: {
        type: Object,
        default: () => {
        },
      },
      description: {
        type: String,
        default: '',
      }
    },
    data () {
      return {
        currentImage: null,
        visible: this.value,
        resultDeg:0,
        fileInfo: {
          fileUrl: '',
          deg: 0
        },
        currentPage: 0
      }
    },
    computed: {
      previousPicture () {
        let currentImage = null
        for (let image of this.imageList) {
          if (image.id === this.currentImage.id) {
            break
          }
          currentImage = image
        }
        return currentImage
      },
  
      nextPicture () {
        let currentImage = null
        let start = false
        for (let image of this.imageList) {
          if (image.id === this.currentImage.id) {
            start = true
            continue
          }
          if (start) {
            currentImage = image
            break
          }
        }
        return currentImage
      },
    },
    created(){
      this.imageList.forEach(item => {
        item.deg = 0
      })
      this.fileInfo = this.imageList[this.currentPage]
    },
    methods: {
      toPreviousPicture () {
        this.resultDeg = 0
        this.currentImage = this.previousPicture
      },
  
      toNextPicture () {
        this.resultDeg = 0
        this.currentImage = this.nextPicture
      },
      // 旋转图片
      rotate () {
        this.fileInfo = this.imageList[this.currentPage]
        if(!this.resultDeg){
          this.fileInfo.deg=0
        }
        this.fileInfo.deg += 90
        if (this.fileInfo.deg >= 360) {
          this.fileInfo.deg = 0
        }
        this.resultDeg = this.fileInfo.deg
        //  this.deg += 90;
        //           if(this.deg >= 360){
        //               this.deg = 0
        //           }
  
      }
    },
  
    watch: {
      value (val) {
        this.visible = val
        this.resultDeg = 0
      },
  
      visible (val) {
        this.$emit('input', val)
        this.$emit('on-visible-change', val)
      },
  
      image (val) {
        if (val) {
          this.currentImage = val
        }
      },
    },
  }
  </script>
  
  <style scoped lang="less">
  /deep/ .ivu-modal-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
  
    .ivu-modal {
      width: auto !important;
      top: 0;
      margin: 0;
      .ivu-modal-content {
        border-radius: 0;
        box-shadow: none;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal-body {
          padding: 0;
          line-height: 0;
          max-height: 80vh;
        }
      }
    }
  }
  
  /deep/ .dtool-modal .ivu-modal-wrap .ivu-modal {
    overflow-y: visible;
  }
  .img-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .wrap{
    display: flex;
    position: fixed;
    bottom: 0%;
    left: 50%;
    transform: translate(-50%,-50%);
    .rotate {
      width: 60px;
      height: 60px;
      border-radius: 90%;
      background-color: #D1D5D7;
      color:white;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 60px;
        height: 60px;
        cursor: pointer;
      }
    }
  }
  .pic-wrapper {
    // display: flex;
    // flex-direction: row;
    // align-items: center;
  
    .pic-left {
      cursor: pointer;
      margin-right: 60px;
    }
  
    .pic-right {
      cursor: pointer;
      margin-left: 60px;
    }
  
    .action-pic-placeholder {
      width: 60px;
      height: 60px;
    }
  
    .action-pic-placeholder.left {
      margin-right: 60px;
    }
  
    .action-pic-placeholder.right {
      margin-left: 60px;
    }
  
    .current-image {
      // overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        display: block;
        max-width: 70vw;
        max-height: 64vh;
      }
    }
  }
  .des{
    font-size: 14px;
    margin-top: 12px;
    line-height: 1.4;
    padding: 6px 12px;
    border-radius: 4px;
    color: #fff;
    background-color: rgba(70,76,91,.9);
  }
  </style>
  