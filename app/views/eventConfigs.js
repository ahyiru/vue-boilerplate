const searchData={
  samplingFactor: 64,
  approx: false,
  rangeText: '近7日',
  fromDate: '2021-07-27',
  toDate: '2021-08-02',
  unit: 'DAY',
  filter:{
    relation: 'AND',
    conditions: [
      {
        attr: 'event.$Anything.$city',
        function: 'IS_SET',
        params: [],
      },
      {
        attr: 'event.$Anything.$is_first_time',
        function: 'IS_TRUE',
        params: [],
      },
    ],
  },
  measures: [
    {
      eventName: '$pageview',
      attr: 'event.$pageview.$province',
      aggregator: 'UNIQUE_COUNT',
      filter:{
        relation: 'AND',
        conditions: [
          {
            attr: 'event.$pageview.$city',
            function: 'IS_SET',
            params: [],
          },
        ],
      },
    },
    {
      eventName: '$Anything',
      attr: '',
      aggregator: 'GENERAL',
      filter:{
        relation: 'AND',
        conditions: [
          {
            attr: 'event.$Anything.$province',
            function: 'EQUAL',
            params: ['湖北省', '四川省'],
          },
        ],
      },
    },
  ],
  byAttrs: ['event.$Anything.$province', 'event.$Anything.$lib'],
  userGroup: ['total'],
  bucketParams:{},
  virtualEvents:{},
  analysisType: 'event',
};

const data=[
  {
    label:'分析对象',
    value:'measures',
  },
  {
    label:'公共筛选条件',
    value:'filter',
  },
  {
    label:'分析维度',
    value:'byAttrs',
  },
  {
    label:'用户分群',
    value:'userGroup',
  },
];



export const title='事件分析';

export const analysisList=[
  {
    label:'分析对象',
    value:'measures',
  },
  {
    label:'公共筛选条件',
    value:'filter',
  },
  {
    label:'分析维度',
    value:'byAttrs',
  },
  {
    label:'用户分群',
    value:'userGroup',
  },
];

export const analysisType=[
  {
    label:'事件分析',
    value:'event',
  },
  {
    label:' session',
    value:'session',
  },
];

export const eventList=[
  {
    label:'任意事件',
    value:'any',
  },
];

export const eventStatistics=[
  {
    label:'总次数',
    value:'total',
  },
  {
    label:'用户数',
    value:'users',
  },
  {
    label:'人均次数',
    value:'average',
  },
];

export const userAttrs=[
  {
    label:'为真',
    value:'true',
  },
  {
    label:'为假',
    value:'false',
  },
  {
    label:'有值',
    value:'hasValue',
  },
  {
    label:'无值',
    value:'noValue',
  },
];

export const stringAttrs=[
  {
    label:'等于',
    value:'=',
  },
  {
    label:'不等于',
    value:'!=',
  },
  {
    label:'包含',
    value:'包含',
  },
  {
    label:'不包含',
    value:'不包含',
  },
  {
    label:'有值',
    value:'有值',
  },
  {
    label:'无值',
    value:'无值',
  },
  {
    label:'为空',
    value:'为空',
  },
  {
    label:'不为空',
    value:'不为空',
  },
  {
    label:'正则匹配',
    value:'正则匹配',
  },
  {
    label:'正则不匹配',
    value:'正则不匹配',
  },
];

export const timeAttrs=[
  {
    label:'绝对时间',
    value:'绝对时间',
  },
  {
    label:'相对当前时间点',
    value:'相对当前时间点',
  },
  {
    label:'相对当前时间区域',
    value:'相对当前时间区域',
  },
  {
    label:'相对事件发生时间',
    value:'相对事件发生时间',
  },
  {
    label:'有值',
    value:'有值',
  },
  {
    label:'无值',
    value:'无值',
  },
];

export const booleanAttrs=[
  {
    label:'有值',
    value:'有值',
  },
  {
    label:'无值',
    value:'无值',
  },
];

export const intAttrs=[
  {
    label:'有值',
    value:'有值',
  },
  {
    label:'无值',
    value:'无值',
  },
];

export const arrAttrs=[
  {
    label:'有值',
    value:'有值',
  },
  {
    label:'无值',
    value:'无值',
  },
];