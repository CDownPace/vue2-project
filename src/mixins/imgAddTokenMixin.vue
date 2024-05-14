
import { getStorage } from '../libs/storage'
export const ImageAddTokenMixin = {

    data() {
        return {
        }
    },

    methods: {
        async getUrlRes(url, index,refName = 'img',isBackGroundImage = false) {
            //index:for循环的多个相同的ref,不传默认undefined
            //refName 页面中可能有多个不同img需要定义不同的ref
            if (!url) return
            const token = getStorage('access_token')
            try {
                const response = await this.axios({
                    baseURL: 'api',
                    method: "get",
                    url,
                    // url: '/_uploads/media/7e61932ab3b240879b89a971d9ca2480.png?nonce=1705995551913',
                    responseType: 'blob',
                    headers: {
                        Authorization: `Bearer ${token}` // 设置token
                    }
                });
                if (response) {
                    window.console.log(this.$refs)
                    if (index === undefined || index === '') {
                        if(isBackGroundImage){
                            this.$refs[refName].style.backgroundImage = `url(${URL.createObjectURL(response)})` ;
                        }else {
                            this.$refs[refName].src = URL.createObjectURL(response);
                        }
                    } else {
                        if(isBackGroundImage){
                            this.$refs[refName][index].style.backgroundImage = `url(${URL.createObjectURL(response)})` ;
                        }else {
                            this.$refs[refName][index].src = URL.createObjectURL(response);
                        }
                    }
                }
            } catch (error) {
                if (index === undefined || index === '') {
                    if(isBackGroundImage){
                        this.$refs[refName].style.backgroundImage = `url(${require('../assets/icons/errorImage.png')})`
                    }else{
                    this.$refs[refName].src = require('../assets/icons/errorImage.png')
                    }
                } else {
                    if(isBackGroundImage){
                        this.$refs[refName][index].style.backgroundImage = `url(${require('../assets/icons/errorImage.png')})`
                    }else{
                        this.$refs[refName][index].src = require('../assets/icons/errorImage.png')
                    }
                }
            }

        },
    }
}
