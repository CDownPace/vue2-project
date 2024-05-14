import _ from 'lodash'

function Constance (constance) {
  this.const = constance
}

Constance.prototype.getLabel = function (value) {
  let obj = _.find(this.const, { value: value })
  return obj ? obj.label : null
}

export const FREQUENCY = new Constance({
  normal: {
    value: 1,
    label: '常规'
  },
  weekly: {
    value: 2,
    label: '一周一次'
  },
  fortnightly: {
    value: 3,
    label: '两周一次'
  },
  monthly: {
    value: 4,
    label: '一月一次'
  },
  quarterly: {
    value: 5,
    label: '一季度一次'
  },
  yearly: {
    value: 6,
    label: '一年一次'
  }
})


export const TASK_STATUS = new Constance({
  pending: {
    value: 1,
    label: '未开始'
  },
  overtime: {
    value: 2,
    label: '超时'
  },
  done: {
    value: 3,
    label: '合格'
  },
  failed: {
    value: 4,
    label: '整改中'
  },
  rectify_pending: {
    value: 5,
    label: '待检查'
  },
  rectify_overtime: {
    value: 6,
    label: '检查超时'
  },
  rectify_failed: {
    value: 7,
    label: '整改中'
  },
  rectify_done: {
    value: 8,
    label: '已整改'
  },
  invalid: {
    value: 9,
    label: '已失效'
  }
})

export const PLATFORM = new Constance({
  sap:{
    value:1,
    label:'安全巡检平台'
  },
  patrol:{
    value:2,
    label:'S-Check 平台'
  }
})



export const APP_NAME = 'SecurityAssessment'
export const BO_NAME = 'Security & EHS Management'
