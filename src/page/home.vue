<template>
    <div id="app">
        KK
        <hello-world :owner="question" :pic-count="10" :disableEdit="false" />
    </div>
</template>
  
<script>
import HelloWorld from '../components/HelloWorld'
export default {
    name: 'App',
    components: {
        HelloWorld
    },
    data() {
        return {
            // question: {
            //     "checked": true,
            //     "comments": "部分货架和保护装置存在变型。",
            //     "description": "货架状况是否良好，且设有保护装置?",
            //     "evaluated_risk": "High",
            //     "id": 37092,
            //     "images": [
            //         {
            //             "filename": "554de50141c54c3088dae70e41086abc.jpg",
            //             "id": 19694,
            //             "index": [
            //                 0
            //             ],
            //             "url": "https://t9.baidu.com/it/u=4102152191,696293074&fm=217&app=126&size=f242,150&n=0&f=JPEG&fmt=auto?s=1D2AC717526BDAEE159FD7E40300F02E&sec=1715706000&t=4c904b3ada015bead3e22fdd29937ade",
            //             "status": "finished",
            //             "percentage": 100,
            //             "uid": 1715572891832
            //         },
            //         {
            //             "filename": "dca4c099550e4549b16fa8064682af47.jpg",
            //             "id": 19695,
            //             "index": [
            //                 1
            //             ],
            //             "url": "https://t7.baidu.com/it/u=2564352718,1243515962&fm=3031&app=3031&size=f242,150&n=0&f=JPEG&fmt=auto?s=5AC5B94402B797DE4EFE7C1B0300D0CA&sec=1715706000&t=f82f854a5b1c74d60ff553bb6f463ec8",
            //             "status": "finished",
            //             "percentage": 100,
            //             "uid": 1715572891833
            //         },
            //         {
            //             "filename": "3b50919eea8140c1a0d20babb2998e74.jpg",
            //             "id": 19696,
            //             "index": [
            //                 2
            //             ],
            //             "url": "https://t9.baidu.com/it/u=2428759228,1380780885&fm=217&app=126&size=f242,150&n=0&f=JPEG&fmt=auto?s=1D98AB5D4D067F5D5079504303008033&sec=1715706000&t=bcecfedcd949de902376d43c33deb2cd",
            //             "status": "finished",
            //             "percentage": 100,
            //             "uid": 1715572891834
            //         },
            //         {
            //             "filename": "d5b6c8ed513b4d3d902d4da61c4cd361.jpg",
            //             "id": 19697,
            //             "index": [
            //                 3
            //             ],
            //             "url": "https://t9.baidu.com/it/u=355374951,4156589792&fm=217&app=126&size=f242,150&n=0&f=JPEG&fmt=auto?s=FF3E04C7CC5297ED0E8EF0200300A019&sec=1715706000&t=ed35b4011fb2f0ab892941bda4e72b05",
            //             "status": "finished",
            //             "percentage": 100,
            //             "uid": 1715572891835
            //         },
            //         {
            //             "filename": "b5f096079e4d483182677120c961879a.jpg",
            //             "id": 19698,
            //             "index": [
            //                 4
            //             ],
            //             "url": "https://t9.baidu.com/it/u=1346095492,3128373352&fm=217&app=126&size=f242,150&n=0&f=JPEG&fmt=auto?s=1CEAE31749417345028B98F503005029&sec=1715706000&t=263a5c45dfea76a0da301965dc532201",
            //             "status": "finished",
            //             "percentage": 100,
            //             "uid": 1715572891836
            //         },
            //         {
            //             "filename": "08708e44aa4f46d396ddff803c66262c.jpg",
            //             "id": 19699,
            //             "index": [
            //                 5
            //             ],
            //             "url": "https://himg.bdimg.com/sys/portraitn/item/public.1.18d81f45.naO5XpnbRn__Ax3Ag234xA",
            //             "status": "finished",
            //             "percentage": 100,
            //             "uid": 1715572891837
            //         },
            //         {
            //             "filename": "8fd66948368e469e9b73e8dc0aacbb66.jpg",
            //             "id": 19700,
            //             "index": [
            //                 6
            //             ],
            //             "url": "https://t9.baidu.com/it/u=3539577385,3653189914&fm=3035&app=3035&size=f242,150&n=0&f=JPEG&fmt=auto?s=5F368E454C432F4D401200030300E0CA&sec=1715706000&t=02238f548eacf2f873cacff7e3d64d97",
            //             "status": "finished",
            //             "percentage": 100,
            //             "uid": 1715572891838
            //         },
            //         {
            //             "filename": "f49477d42aea4ef99208f8cc2e13c85a.jpg",
            //             "id": 19701,
            //             "index": [
            //                 7
            //             ],
            //             "url": "https://t9.baidu.com/it/u=261055651,2732953357&fm=3031&app=3031&size=f242,150&n=0&f=JPEG&fmt=auto?s=3420D615D3A3CB4F08B887D10300F0B7&sec=1715706000&t=3e99d9525fd6e095e056d6006cfa9ec3",
            //             "status": "finished",
            //             "percentage": 100,
            //             "uid": 1715572891839
            //         },
            //         {
            //             "filename": "7ec9b82911d24e69b36a6f409cc04dd1.jpg",
            //             "id": 19702,
            //             "index": [
            //                 8
            //             ],
            //             "url": "https://fc1tn.baidu.com/it/u=71082386,3879241788&fm=202&src=801&mola=new&crop=v1",
            //             "status": "finished",
            //             "percentage": 100,
            //             "uid": 1715572891840
            //         }
            //     ],
            //     "index": 1,
            //     "is_skip_question": false,
            //     "multiple_selection": false,
            //     "need_action_plan": true,
            //     "options": [
            //         {
            //             "checked": false,
            //             "description": "是",
            //             "factor_item": {
            //                 "factor_id": 1789,
            //                 "factor_name": "答案 ",
            //                 "id": 7153,
            //                 "name": "是",
            //                 "need_action_plan": false
            //             },
            //             "id": 292866,
            //             "is_skip": false,
            //             "need_comments": false,
            //             "score": 0,
            //             "skip_questions": []
            //         },
            //         {
            //             "checked": true,
            //             "description": "部分",
            //             "factor_item": {
            //                 "factor_id": 1789,
            //                 "factor_name": "答案 ",
            //                 "id": 7154,
            //                 "name": "部分",
            //                 "need_action_plan": true
            //             },
            //             "id": 292867,
            //             "is_skip": false,
            //             "need_comments": true,
            //             "score": 0,
            //             "skip_questions": []
            //         },
            //         {
            //             "checked": false,
            //             "description": "无/否",
            //             "factor_item": {
            //                 "factor_id": 1789,
            //                 "factor_name": "答案 ",
            //                 "id": 7155,
            //                 "name": "无/否",
            //                 "need_action_plan": true
            //             },
            //             "id": 292868,
            //             "is_skip": false,
            //             "need_comments": true,
            //             "score": 0,
            //             "skip_questions": []
            //         },
            //         {
            //             "checked": false,
            //             "description": "不适用",
            //             "factor_item": {
            //                 "factor_id": 1789,
            //                 "factor_name": "答案 ",
            //                 "id": 7156,
            //                 "name": "不适用",
            //                 "need_action_plan": false
            //             },
            //             "id": 292869,
            //             "is_skip": false,
            //             "need_comments": false,
            //             "score": 0,
            //             "skip_questions": []
            //         },
            //         {
            //             "checked": false,
            //             "description": "不显著",
            //             "factor_item": {
            //                 "factor_id": 1790,
            //                 "factor_name": "风险/影响 ",
            //                 "id": 7157,
            //                 "name": "不显著",
            //                 "need_action_plan": false
            //             },
            //             "id": 292870,
            //             "is_skip": false,
            //             "need_comments": false,
            //             "score": 0,
            //             "skip_questions": []
            //         },
            //         {
            //             "checked": true,
            //             "description": "中等",
            //             "factor_item": {
            //                 "factor_id": 1790,
            //                 "factor_name": "风险/影响 ",
            //                 "id": 7158,
            //                 "name": "中等",
            //                 "need_action_plan": false
            //             },
            //             "id": 292871,
            //             "is_skip": false,
            //             "need_comments": false,
            //             "score": 0,
            //             "skip_questions": []
            //         },
            //         {
            //             "checked": false,
            //             "description": "重大",
            //             "factor_item": {
            //                 "factor_id": 1790,
            //                 "factor_name": "风险/影响 ",
            //                 "id": 7159,
            //                 "name": "重大",
            //                 "need_action_plan": false
            //             },
            //             "id": 292872,
            //             "is_skip": false,
            //             "need_comments": false,
            //             "score": 0,
            //             "skip_questions": []
            //         },
            //         {
            //             "checked": false,
            //             "description": "严重",
            //             "factor_item": {
            //                 "factor_id": 1790,
            //                 "factor_name": "风险/影响 ",
            //                 "id": 7160,
            //                 "name": "严重",
            //                 "need_action_plan": false
            //             },
            //             "id": 292873,
            //             "is_skip": false,
            //             "need_comments": false,
            //             "score": 0,
            //             "skip_questions": []
            //         }
            //     ],
            //     "score": 4,
            //     "skip_option_id": null,
            //     "weight": 0.15,
            //     "factors": [
            //         {
            //             "factor_id": 1789,
            //             "name": "答案 ",
            //             "options": [
            //                 {
            //                     "checked": false,
            //                     "description": "是",
            //                     "factor_item": {
            //                         "factor_id": 1789,
            //                         "factor_name": "答案 ",
            //                         "id": 7153,
            //                         "name": "是",
            //                         "need_action_plan": false
            //                     },
            //                     "id": 292866,
            //                     "is_skip": false,
            //                     "need_comments": false,
            //                     "score": 0,
            //                     "skip_questions": []
            //                 },
            //                 {
            //                     "checked": true,
            //                     "description": "部分",
            //                     "factor_item": {
            //                         "factor_id": 1789,
            //                         "factor_name": "答案 ",
            //                         "id": 7154,
            //                         "name": "部分",
            //                         "need_action_plan": true
            //                     },
            //                     "id": 292867,
            //                     "is_skip": false,
            //                     "need_comments": true,
            //                     "score": 0,
            //                     "skip_questions": []
            //                 },
            //                 {
            //                     "checked": false,
            //                     "description": "无/否",
            //                     "factor_item": {
            //                         "factor_id": 1789,
            //                         "factor_name": "答案 ",
            //                         "id": 7155,
            //                         "name": "无/否",
            //                         "need_action_plan": true
            //                     },
            //                     "id": 292868,
            //                     "is_skip": false,
            //                     "need_comments": true,
            //                     "score": 0,
            //                     "skip_questions": []
            //                 },
            //                 {
            //                     "checked": false,
            //                     "description": "不适用",
            //                     "factor_item": {
            //                         "factor_id": 1789,
            //                         "factor_name": "答案 ",
            //                         "id": 7156,
            //                         "name": "不适用",
            //                         "need_action_plan": false
            //                     },
            //                     "id": 292869,
            //                     "is_skip": false,
            //                     "need_comments": false,
            //                     "score": 0,
            //                     "skip_questions": []
            //                 }
            //             ],
            //             "radio": 292867
            //         },
            //         {
            //             "factor_id": 1790,
            //             "name": "风险/影响 ",
            //             "options": [
            //                 {
            //                     "checked": false,
            //                     "description": "不显著",
            //                     "factor_item": {
            //                         "factor_id": 1790,
            //                         "factor_name": "风险/影响 ",
            //                         "id": 7157,
            //                         "name": "不显著",
            //                         "need_action_plan": false
            //                     },
            //                     "id": 292870,
            //                     "is_skip": false,
            //                     "need_comments": false,
            //                     "score": 0,
            //                     "skip_questions": []
            //                 },
            //                 {
            //                     "checked": true,
            //                     "description": "中等",
            //                     "factor_item": {
            //                         "factor_id": 1790,
            //                         "factor_name": "风险/影响 ",
            //                         "id": 7158,
            //                         "name": "中等",
            //                         "need_action_plan": false
            //                     },
            //                     "id": 292871,
            //                     "is_skip": false,
            //                     "need_comments": false,
            //                     "score": 0,
            //                     "skip_questions": []
            //                 },
            //                 {
            //                     "checked": false,
            //                     "description": "重大",
            //                     "factor_item": {
            //                         "factor_id": 1790,
            //                         "factor_name": "风险/影响 ",
            //                         "id": 7159,
            //                         "name": "重大",
            //                         "need_action_plan": false
            //                     },
            //                     "id": 292872,
            //                     "is_skip": false,
            //                     "need_comments": false,
            //                     "score": 0,
            //                     "skip_questions": []
            //                 },
            //                 {
            //                     "checked": false,
            //                     "description": "严重",
            //                     "factor_item": {
            //                         "factor_id": 1790,
            //                         "factor_name": "风险/影响 ",
            //                         "id": 7160,
            //                         "name": "严重",
            //                         "need_action_plan": false
            //                     },
            //                     "id": 292873,
            //                     "is_skip": false,
            //                     "need_comments": false,
            //                     "score": 0,
            //                     "skip_questions": []
            //                 }
            //             ],
            //             "radio": 292871
            //         }
            //     ],
            //     "disabled": false,
            //     "image_id_list": [
            //         19694,
            //         19695,
            //         19696,
            //         19697,
            //         19698,
            //         19699,
            //         19700,
            //         19701,
            //         19702
            //     ]
            // },
            question:{
    "checked": true,
    "comments": "仓库物料处置的操作均已有操作规程覆盖，但是缺少安全管理的制度对物料搬运的安全控制点和管理要求进行明确。",
    "description": "是否建立物料搬运管理程序文件?(包括存储、运输、装卸等)",
    "evaluated_risk": "High",
    "id": 37100,
    "images": [],
    "index": 0,
    "is_skip_question": false,
    "multiple_selection": false,
    "need_action_plan": true,
    "options": [
        {
            "checked": false,
            "description": "是",
            "factor_item": {
                "factor_id": 1789,
                "factor_name": "答案 ",
                "id": 7153,
                "name": "是",
                "need_action_plan": false
            },
            "id": 292906,
            "is_skip": false,
            "need_comments": false,
            "score": 0,
            "skip_questions": []
        },
        {
            "checked": false,
            "description": "部分",
            "factor_item": {
                "factor_id": 1789,
                "factor_name": "答案 ",
                "id": 7154,
                "name": "部分",
                "need_action_plan": true
            },
            "id": 292907,
            "is_skip": false,
            "need_comments": true,
            "score": 0,
            "skip_questions": []
        },
        {
            "checked": true,
            "description": "无/否",
            "factor_item": {
                "factor_id": 1789,
                "factor_name": "答案 ",
                "id": 7155,
                "name": "无/否",
                "need_action_plan": true
            },
            "id": 292908,
            "is_skip": false,
            "need_comments": true,
            "score": 0,
            "skip_questions": []
        },
        {
            "checked": false,
            "description": "不适用",
            "factor_item": {
                "factor_id": 1789,
                "factor_name": "答案 ",
                "id": 7156,
                "name": "不适用",
                "need_action_plan": false
            },
            "id": 292909,
            "is_skip": false,
            "need_comments": false,
            "score": 0,
            "skip_questions": []
        },
        {
            "checked": true,
            "description": "不显著",
            "factor_item": {
                "factor_id": 1790,
                "factor_name": "风险/影响 ",
                "id": 7157,
                "name": "不显著",
                "need_action_plan": false
            },
            "id": 292910,
            "is_skip": false,
            "need_comments": false,
            "score": 0,
            "skip_questions": []
        },
        {
            "checked": false,
            "description": "中等",
            "factor_item": {
                "factor_id": 1790,
                "factor_name": "风险/影响 ",
                "id": 7158,
                "name": "中等",
                "need_action_plan": false
            },
            "id": 292911,
            "is_skip": false,
            "need_comments": false,
            "score": 0,
            "skip_questions": []
        },
        {
            "checked": false,
            "description": "重大",
            "factor_item": {
                "factor_id": 1790,
                "factor_name": "风险/影响 ",
                "id": 7159,
                "name": "重大",
                "need_action_plan": false
            },
            "id": 292912,
            "is_skip": false,
            "need_comments": false,
            "score": 0,
            "skip_questions": []
        },
        {
            "checked": false,
            "description": "严重",
            "factor_item": {
                "factor_id": 1790,
                "factor_name": "风险/影响 ",
                "id": 7160,
                "name": "严重",
                "need_action_plan": false
            },
            "id": 292913,
            "is_skip": false,
            "need_comments": false,
            "score": 0,
            "skip_questions": []
        }
    ],
    "score": 4,
    "skip_option_id": null,
    "weight": 0.3,
    "factors": [
        {
            "factor_id": 1789,
            "name": "答案 ",
            "options": [
                {
                    "checked": false,
                    "description": "是",
                    "factor_item": {
                        "factor_id": 1789,
                        "factor_name": "答案 ",
                        "id": 7153,
                        "name": "是",
                        "need_action_plan": false
                    },
                    "id": 292906,
                    "is_skip": false,
                    "need_comments": false,
                    "score": 0,
                    "skip_questions": []
                },
                {
                    "checked": false,
                    "description": "部分",
                    "factor_item": {
                        "factor_id": 1789,
                        "factor_name": "答案 ",
                        "id": 7154,
                        "name": "部分",
                        "need_action_plan": true
                    },
                    "id": 292907,
                    "is_skip": false,
                    "need_comments": true,
                    "score": 0,
                    "skip_questions": []
                },
                {
                    "checked": true,
                    "description": "无/否",
                    "factor_item": {
                        "factor_id": 1789,
                        "factor_name": "答案 ",
                        "id": 7155,
                        "name": "无/否",
                        "need_action_plan": true
                    },
                    "id": 292908,
                    "is_skip": false,
                    "need_comments": true,
                    "score": 0,
                    "skip_questions": []
                },
                {
                    "checked": false,
                    "description": "不适用",
                    "factor_item": {
                        "factor_id": 1789,
                        "factor_name": "答案 ",
                        "id": 7156,
                        "name": "不适用",
                        "need_action_plan": false
                    },
                    "id": 292909,
                    "is_skip": false,
                    "need_comments": false,
                    "score": 0,
                    "skip_questions": []
                }
            ],
            "radio": 292908
        },
        {
            "factor_id": 1790,
            "name": "风险/影响 ",
            "options": [
                {
                    "checked": true,
                    "description": "不显著",
                    "factor_item": {
                        "factor_id": 1790,
                        "factor_name": "风险/影响 ",
                        "id": 7157,
                        "name": "不显著",
                        "need_action_plan": false
                    },
                    "id": 292910,
                    "is_skip": false,
                    "need_comments": false,
                    "score": 0,
                    "skip_questions": []
                },
                {
                    "checked": false,
                    "description": "中等",
                    "factor_item": {
                        "factor_id": 1790,
                        "factor_name": "风险/影响 ",
                        "id": 7158,
                        "name": "中等",
                        "need_action_plan": false
                    },
                    "id": 292911,
                    "is_skip": false,
                    "need_comments": false,
                    "score": 0,
                    "skip_questions": []
                },
                {
                    "checked": false,
                    "description": "重大",
                    "factor_item": {
                        "factor_id": 1790,
                        "factor_name": "风险/影响 ",
                        "id": 7159,
                        "name": "重大",
                        "need_action_plan": false
                    },
                    "id": 292912,
                    "is_skip": false,
                    "need_comments": false,
                    "score": 0,
                    "skip_questions": []
                },
                {
                    "checked": false,
                    "description": "严重",
                    "factor_item": {
                        "factor_id": 1790,
                        "factor_name": "风险/影响 ",
                        "id": 7160,
                        "name": "严重",
                        "need_action_plan": false
                    },
                    "id": 292913,
                    "is_skip": false,
                    "need_comments": false,
                    "score": 0,
                    "skip_questions": []
                }
            ],
            "radio": 292910
        }
    ],
    "disabled": false,
    "image_id_list": []
}
        }
    }
}
</script>
  
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
  