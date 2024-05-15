<template>
    <div>
        <button @click="getData"> 点击拿到数据</button>
    </div>
</template>
  
<script>
export default {
    name: 'CityList',
    props: {
        cityList: {
            type: Array,
            default: () => [],
        },

    },
    data() {
        return {
        }
    },
    computed: {
    },
    created() {
    },
    methods: {
        getData() {
            let cities = this.cityList
            //   cities.sort((c1, c2) => c1.nameEn.localeCompare(c2.nameEn))

            // 添加首字母
            const map = new Map()
            for (const city of cities) {
                const alpha = city.nameEn[0].charAt(0).toUpperCase()
                if (!map.has(alpha)) map.set(alpha, [])
                map.get(alpha).push({
                    name: city.name,
                    data: city,
                })
            }
            console.log('map', map)
            const keys = []
            for (const key of map.keys()) {
                keys.push(key)
            }
            keys.sort()

            const list = []
            for (const key of keys) {
                list.push({
                    alpha: key,
                    subItems: map.get(key),
                })
            }
            console.log('kkkk', list)
        }
    },


}
</script>
  
<style scoped lang="less"></style>
  